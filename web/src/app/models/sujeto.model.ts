export interface Sujeto {
  id: string;
  cuit: string;
  denominacion: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSujetoDto {
  cuit: string;
  denominacion: string;
}
