export interface Automotor {
  dominio: string;
  numero_chasis?: string;
  numero_motor?: string;
  color?: string;
  fecha_fabricacion: number;
  cuit_dueno: string;
  denominacion_dueno: string;
}

export interface CreateAutomotorDto {
  dominio: string;
  numeroChasis?: string;
  numeroMotor?: string;
  color?: string;
  fechaFabricacion: number;
  cuitDuenio: string;
}
