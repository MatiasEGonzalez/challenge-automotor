import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { VinculoSujetoObjeto } from './vinculo-sujeto-objeto.entity';

@Entity({ name: 'Sujeto' })
export class Sujeto {
  @PrimaryGeneratedColumn({ name: 'spo_id', type: 'bigint' })
  id: string;

  @Column({ name: 'spo_cuit', type: 'varchar', length: 11, unique: true })
  cuit: string;

  @Column({ name: 'spo_denominacion', type: 'varchar', length: 160 })
  denominacion: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => VinculoSujetoObjeto, vinculo => vinculo.sujeto)
  vinculos: VinculoSujetoObjeto[];
}
