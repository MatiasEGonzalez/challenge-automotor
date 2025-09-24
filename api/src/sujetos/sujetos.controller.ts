import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { SujetosService } from './sujetos.service';
import { CreateSujetoDto } from '../dto';

@Controller('api/sujetos')
export class SujetosController {
  constructor(private readonly sujetosService: SujetosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSujetoDto: CreateSujetoDto) {
    return await this.sujetosService.create(createSujetoDto);
  }

  @Get('by-cuit/:cuit')
  async findByCuit(@Param('cuit') cuit: string) {
    const sujeto = await this.sujetosService.findByCuit(cuit);
    if (!sujeto) {
      return { message: 'Sujeto no encontrado' };
    }
    return sujeto;
  }
}
