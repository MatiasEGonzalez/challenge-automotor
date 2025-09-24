import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ObjetoDeValor } from './objeto-de-valor.entity';

@Entity({ name: 'Automotores' })
export class Automotor {
  @PrimaryGeneratedColumn({ name: 'atr_id', type: 'bigint' })
  id: string;

  @ManyToOne(() => ObjetoDeValor, objeto => objeto.automotores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'atr_ovp_id' })
  objeto: ObjetoDeValor;

  @Column({ name: 'atr_dominio', type: 'varchar', length: 8, unique: true })
  dominio: string;

  @Column({ name: 'atr_numero_chasis', type: 'varchar', length: 25, nullable: true })
  numeroChasis?: string;

  @Column({ name: 'atr_numero_motor', type: 'varchar', length: 25, nullable: true })
  numeroMotor?: string;

  @Column({ name: 'atr_color', type: 'varchar', length: 40, nullable: true })
  color?: string;

  @Column({ name: 'atr_fecha_fabricacion', type: 'integer' })
  fechaFabricacion: number;

  @CreateDateColumn({ name: 'atr_fecha_alta_registro' })
  fechaAltaRegistro: Date;
}
