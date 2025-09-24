import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutomotorService } from '../../services/automotor.service';
import { Automotor } from '../../models/automotor.model';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  automotores: Automotor[] = [];
  loading = false;
  error: string | null = null;

  constructor(private automotorService: AutomotorService) {}

  ngOnInit(): void {
    this.cargarAutomotores();
  }

  cargarAutomotores(): void {
    this.loading = true;
    this.error = null;

    this.automotorService.getAll().subscribe({
      next: (data) => {
        this.automotores = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar automotores: ' + (err.error?.message || err.message);
        this.loading = false;
      }
    });
  }

  eliminar(dominio: string): void {
    if (confirm(`¿Está seguro de eliminar el automotor ${dominio}?`)) {
      this.automotorService.delete(dominio).subscribe({
        next: () => {
          this.cargarAutomotores(); // Recargar lista
        },
        error: (err) => {
          alert('Error al eliminar: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  formatFecha(fecha: number): string {
    if (!fecha) return '-';
    const str = fecha.toString();
    return `${str.substring(4, 6)}/${str.substring(0, 4)}`;
  }
}
