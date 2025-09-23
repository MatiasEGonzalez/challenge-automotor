import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Sujeto } from './sujeto.entity';
import { ObjetoDeValor } from './objeto-de-valor.entity';

@Entity({ name: 'Vinculo_Sujeto_Objeto' })
export class VinculoSujetoObjeto {
  @PrimaryGeneratedColumn({ name: 'vso_id', type: 'bigint' })
  id: string;

  @ManyToOne(() => ObjetoDeValor, objeto => objeto.vinculos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vso_ovp_id' })
  objeto: ObjetoDeValor;

  @ManyToOne(() => Sujeto, sujeto => sujeto.vinculos, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'vso_spo_id' })
  sujeto: Sujeto;

  @Column({ name: 'vso_tipo_vinculo', type: 'varchar', length: 30, default: 'DUENO' })
  tipoVinculo: string;

  @Column({ name: 'vso_porcentaje', type: 'numeric', precision: 5, scale: 2, default: 100 })
  porcentaje: number;

  @Column({ name: 'vso_responsable', type: 'char', length: 1, default: 'S' })
  responsable: string;

  @Column({ name: 'vso_fecha_inicio', type: 'date' })
  fechaInicio: string;

  @Column({ name: 'vso_fecha_fin', type: 'date', nullable: true })
  fechaFin?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
