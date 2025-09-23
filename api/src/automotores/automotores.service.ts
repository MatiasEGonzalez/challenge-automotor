import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Automotor } from '../entities/automotor.entity';
import { ObjetoDeValor } from '../entities/objeto-de-valor.entity';
import { VinculoSujetoObjeto } from '../entities/vinculo-sujeto-objeto.entity';
import { Sujeto } from '../entities/sujeto.entity';
import { CreateAutomotorDto } from '../dto';
import { isCuitValid, isDominioValid, isYYYYMMValid } from '../common/validators';

@Injectable()
export class AutomotoresService {
  constructor(
    @InjectRepository(Automotor) private automotorRepo: Repository<Automotor>,
    @InjectRepository(ObjetoDeValor) private ovpRepo: Repository<ObjetoDeValor>,
    @InjectRepository(VinculoSujetoObjeto) private vincRepo: Repository<VinculoSujetoObjeto>,
    @InjectRepository(Sujeto) private sujetoRepo: Repository<Sujeto>,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    // Usar la vista vw_automotores_con_dueno
    return await this.dataSource.query(`
      SELECT 
        dominio, numero_chasis, numero_motor, color, fecha_fabricacion,
        cuit_dueno, denominacion_dueno
      FROM vw_automotores_con_dueno
    `);
  }

  async findByDominio(dominio: string) {
    const result = await this.dataSource.query(`
      SELECT 
        dominio, numero_chasis, numero_motor, color, fecha_fabricacion,
        cuit_dueno, denominacion_dueno
      FROM vw_automotores_con_dueno
      WHERE dominio = $1
    `, [dominio.toUpperCase()]);

    if (result.length === 0) {
      throw new NotFoundException('Dominio no encontrado');
    }

    return result[0];
  }

  // Replica PCK_AUTOMOTOR.registrar_alta
  async create(dto: CreateAutomotorDto): Promise<any> {
    return await this.dataSource.transaction(async manager => {
      // Validaciones (replicando triggers del XML)
      if (!isDominioValid(dto.dominio)) {
        throw new UnprocessableEntityException('Dominio inválido');
      }
      
      if (!isYYYYMMValid(dto.fechaFabricacion)) {
        throw new UnprocessableEntityException('Fecha fabricación inválida');
      }
      
      if (!isCuitValid(dto.cuitDuenio)) {
        throw new UnprocessableEntityException('CUIT inválido');
      }

      // Verificar que existe el sujeto
      const sujeto = await manager.findOne(Sujeto, { where: { cuit: dto.cuitDuenio } });
      if (!sujeto) {
        throw new UnprocessableEntityException('No existe Sujeto con ese CUIT');
      }

      const dominioUpper = dto.dominio.toUpperCase();

      // Obtener o crear ObjetoDeValor
      let ovp = await manager.findOne(ObjetoDeValor, { 
        where: { tipo: 'AUTOMOTOR', codigo: dominioUpper } 
      });
      
      if (!ovp) {
        ovp = manager.create(ObjetoDeValor, {
          tipo: 'AUTOMOTOR',
          codigo: dominioUpper,
          descripcion: `Automotor ${dominioUpper}`,
        });
        await manager.save(ovp);
      }

      // Insertar o actualizar Automotor
      let automotor = await manager.findOne(Automotor, { 
        where: { dominio: dominioUpper } 
      });

      if (automotor) {
        // UPDATE (como en el XML)
        automotor.numeroChasis = dto.numeroChasis;
        automotor.numeroMotor = dto.numeroMotor;
        automotor.color = dto.color;
        automotor.fechaFabricacion = dto.fechaFabricacion;
        await manager.save(automotor);
      } else {
        // INSERT
        automotor = manager.create(Automotor, {
          objeto: ovp,
          dominio: dominioUpper,
          numeroChasis: dto.numeroChasis,
          numeroMotor: dto.numeroMotor,
          color: dto.color,
          fechaFabricacion: dto.fechaFabricacion,
        });
        await manager.save(automotor);
      }

      // CERRAR vínculos anteriores (replicando el UPDATE del XML)
      await manager.createQueryBuilder()
        .update(VinculoSujetoObjeto)
        .set({ fechaFin: () => 'CURRENT_DATE' })
        .where('vso_ovp_id = :ovpId AND vso_responsable = :resp AND vso_fecha_fin IS NULL', 
               { ovpId: ovp.id, resp: 'S' })
        .execute();

      // CREAR nuevo vínculo responsable
      const vinculo = manager.create(VinculoSujetoObjeto, {
        objeto: ovp,
        sujeto: sujeto,
        tipoVinculo: 'DUENO',
        porcentaje: 100,
        responsable: 'S',
        fechaInicio: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        fechaFin: undefined,
      });
      await manager.save(vinculo);

      return automotor;
    });
  }

  // Replica PCK_AUTOMOTOR.eliminar
  async deleteByDominio(dominio: string): Promise<{ message: string }> {
    return await this.dataSource.transaction(async manager => {
      const dominioUpper = dominio.toUpperCase();
      
      // Buscar automotor y objeto
      const automotor = await manager.findOne(Automotor, { 
        where: { dominio: dominioUpper },
        relations: ['objeto']
      });
      
      if (!automotor) {
        throw new NotFoundException('Dominio no encontrado');
      }

      const ovpId = automotor.objeto.id;

      // Eliminar en orden (como en el XML)
      await manager.delete(VinculoSujetoObjeto, { objeto: { id: ovpId } });
      await manager.delete(Automotor, { id: automotor.id });
      await manager.delete(ObjetoDeValor, { id: ovpId });

      return { message: 'Automotor eliminado' };
    });
  }
}
