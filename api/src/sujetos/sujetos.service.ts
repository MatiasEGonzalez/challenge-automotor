import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sujeto } from '../entities/sujeto.entity';
import { CreateSujetoDto } from '../dto';
import { isCuitValid } from '../common/validators';

@Injectable()
export class SujetosService {
  constructor(
    @InjectRepository(Sujeto)
    private sujetoRepo: Repository<Sujeto>,
  ) {}

  async create(createSujetoDto: CreateSujetoDto): Promise<Sujeto> {
    // Validar CUIT (replicando PCK_AUTOMOTOR.es_cuit_valido)
    if (!isCuitValid(createSujetoDto.cuit)) {
      throw new UnprocessableEntityException('CUIT inválido');
    }

    // Verificar que no exista
    const existing = await this.sujetoRepo.findOne({ where: { cuit: createSujetoDto.cuit } });
    if (existing) {
      throw new UnprocessableEntityException('Ya existe un sujeto con ese CUIT');
    }

    const sujeto = this.sujetoRepo.create(createSujetoDto);
    return await this.sujetoRepo.save(sujeto);
  }

  async findByCuit(cuit: string): Promise<Sujeto | null> {
    return await this.sujetoRepo.findOne({ where: { cuit } });
  }
}
