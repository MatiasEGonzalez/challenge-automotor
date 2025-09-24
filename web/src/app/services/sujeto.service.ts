import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sujeto, CreateSujetoDto } from '../models/sujeto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SujetoService {
  private apiUrl = `${environment.apiUrl}/sujetos`;

  constructor(private http: HttpClient) {}

  create(sujeto: CreateSujetoDto): Observable<Sujeto> {
    return this.http.post<Sujeto>(this.apiUrl, sujeto);
  }

  findByCuit(cuit: string): Observable<Sujeto> {
    return this.http.get<Sujeto>(`${this.apiUrl}/by-cuit/${cuit}`);
  }
}
