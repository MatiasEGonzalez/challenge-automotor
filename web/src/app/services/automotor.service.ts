import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Automotor, CreateAutomotorDto } from '../models/automotor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutomotorService {
  private apiUrl = `${environment.apiUrl}/automotores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Automotor[]> {
    return this.http.get<Automotor[]>(this.apiUrl);
  }

  getByDominio(dominio: string): Observable<Automotor> {
    return this.http.get<Automotor>(`${this.apiUrl}/${dominio}`);
  }

  create(automotor: CreateAutomotorDto): Observable<any> {
    return this.http.post(this.apiUrl, automotor);
  }

  update(dominio: string, automotor: CreateAutomotorDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${dominio}`, automotor);
  }

  delete(dominio: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${dominio}`);
  }
}
