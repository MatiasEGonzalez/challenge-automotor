import { IsNotEmpty, IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateAutomotorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  dominio: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  numeroChasis?: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  numeroMotor?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  color?: string;

  @IsNotEmpty()
  @IsNumber()
  fechaFabricacion: number; // YYYYMM

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  cuitDuenio: string;
}
