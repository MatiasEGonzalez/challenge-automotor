import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSujetoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  cuit: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(160)
  denominacion: string;
}
