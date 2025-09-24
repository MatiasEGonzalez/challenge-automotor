import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Automotor } from '../entities/automotor.entity';
import { ObjetoDeValor } from '../entities/objeto-de-valor.entity';
import { VinculoSujetoObjeto } from '../entities/vinculo-sujeto-objeto.entity';
import { Sujeto } from '../entities/sujeto.entity';
import { AutomotoresService } from './automotores.service';
import { AutomotoresController } from './automotores.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Automotor, ObjetoDeValor, VinculoSujetoObjeto, Sujeto])
  ],
  controllers: [AutomotoresController],
  providers: [AutomotoresService],
  exports: [AutomotoresService],
})
export class AutomotoresModule {}
