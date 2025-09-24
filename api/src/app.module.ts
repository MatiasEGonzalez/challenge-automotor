import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SujetosModule } from './sujetos/sujetos.module';
import { AutomotoresModule } from './automotores/automotores.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres', 
      password: process.env.DB_PASSWORD || 'password', 
      database: process.env.DB_DATABASE || 'automotor_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
    SujetosModule,
    AutomotoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
