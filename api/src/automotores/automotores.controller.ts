import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { AutomotoresService } from './automotores.service';
import { CreateAutomotorDto } from '../dto';

@Controller('api/automotores')
export class AutomotoresController {
  constructor(private readonly automotoresService: AutomotoresService) {}

  @Get()
  async findAll() {
    return await this.automotoresService.findAll();
  }

  @Get(':dominio')
  async findOne(@Param('dominio') dominio: string) {
    return await this.automotoresService.findByDominio(dominio);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAutomotorDto: CreateAutomotorDto) {
    return await this.automotoresService.create(createAutomotorDto);
  }

  @Put(':dominio')
  async update(@Param('dominio') dominio: string, @Body() updateAutomotorDto: CreateAutomotorDto) {
    // Forzar el dominio del parámetro
    updateAutomotorDto.dominio = dominio;
    return await this.automotoresService.create(updateAutomotorDto); // Reutiliza la lógica
  }

  @Delete(':dominio')
  async remove(@Param('dominio') dominio: string) {
    return await this.automotoresService.deleteByDominio(dominio);
  }
}
