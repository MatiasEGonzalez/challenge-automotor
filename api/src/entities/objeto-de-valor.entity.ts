import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Automotor } from './automotor.entity';
import { VinculoSujetoObjeto } from './vinculo-sujeto-objeto.entity';

@Entity({ name: 'Objeto_De_Valor' })
export class ObjetoDeValor {
  @PrimaryGeneratedColumn({ name: 'ovp_id', type: 'bigint' })
  id: string;

  @Column({ name: 'ovp_tipo', type: 'varchar', length: 30, default: 'AUTOMOTOR' })
  tipo: string;

  @Column({ name: 'ovp_codigo', type: 'varchar', length: 64, unique: true })
  codigo: string;

  @Column({ name: 'ovp_descripcion', type: 'varchar', length: 240, nullable: true })
  descripcion?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Automotor, automotor => automotor.objeto)
  automotores: Automotor[];

  @OneToMany(() => VinculoSujetoObjeto, vinculo => vinculo.objeto)
  vinculos: VinculoSujetoObjeto[];
}
