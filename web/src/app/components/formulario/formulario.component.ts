import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutomotorService } from '../../services/automotor.service';
import { SujetoService } from '../../services/sujeto.service';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  automotorForm!: FormGroup;
  isEditMode = false;
  dominioOriginal: string | null = null;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private automotorService: AutomotorService,
    private sujetoService: SujetoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.dominioOriginal = this.route.snapshot.paramMap.get('dominio');
    if (this.dominioOriginal) {
      this.isEditMode = true;
      this.cargarAutomotor(this.dominioOriginal);
    }
  }

  initForm(): void {
    this.automotorForm = this.fb.group({
      dominio: ['', [Validators.required, CustomValidators.dominioValidator()]],
      numeroChasis: [''],
      numeroMotor: [''],
      color: [''],
      fechaFabricacion: ['', [Validators.required, CustomValidators.fechaFabricacionValidator()]],
      cuitDuenio: ['', [Validators.required, CustomValidators.cuitValidator()]]
    });
  }

  cargarAutomotor(dominio: string): void {
    this.loading = true;
    this.automotorService.getByDominio(dominio).subscribe({
      next: (data) => {
        this.automotorForm.patchValue({
          dominio: data.dominio,
          numeroChasis: data.numero_chasis,
          numeroMotor: data.numero_motor,
          color: data.color,
          fechaFabricacion: data.fecha_fabricacion,
          cuitDuenio: data.cuit_dueno
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar automotor: ' + (err.error?.message || err.message);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.automotorForm.valid) {
      this.loading = true;
      this.error = null;
      this.success = null;

      const formData = this.automotorForm.value;
      formData.dominio = formData.dominio.toUpperCase();

      const request = this.isEditMode 
        ? this.automotorService.update(this.dominioOriginal!, formData)
        : this.automotorService.create(formData);

      request.subscribe({
        next: () => {
          this.success = this.isEditMode ? 'Automotor actualizado exitosamente' : 'Automotor creado exitosamente';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/listado']), 2000);
        },
        error: (err) => {
          if (err.status === 422 && err.error?.message?.includes('No existe Sujeto con ese CUIT')) {
            this.manejarCuitInexistente(formData.cuitDuenio);
          } else {
            this.error = 'Error: ' + (err.error?.message || err.message);
          }
          this.loading = false;
        }
      });
    } else {
      this.marcarCamposInvalidos();
    }
  }

  private manejarCuitInexistente(cuit: string): void {
    const denominacion = prompt(`El CUIT ${cuit} no existe. ¿Desea crear el sujeto? Ingrese la denominación:`);
    
    if (denominacion) {
      this.sujetoService.create({ cuit, denominacion }).subscribe({
        next: () => {
          alert('Sujeto creado exitosamente. Reintentando...');
          this.onSubmit(); // Reintentar
        },
        error: (err) => {
          this.error = 'Error al crear sujeto: ' + (err.error?.message || err.message);
        }
      });
    }
  }

  private marcarCamposInvalidos(): void {
    Object.keys(this.automotorForm.controls).forEach(key => {
      this.automotorForm.get(key)?.markAsTouched();
    });
  }

  getErrorMessage(field: string): string {
    const control = this.automotorForm.get(field);
    if (control?.errors && control.touched) {
      const errors = control.errors;
      if (errors['required']) return `${this.getFieldName(field)} es requerido`;
      if (errors['dominioInvalid']) return errors['dominioInvalid'].message;
      if (errors['cuitInvalid']) return errors['cuitInvalid'].message;
      if (errors['fechaInvalid']) return errors['fechaInvalid'].message;
    }
    return '';
  }

  private getFieldName(field: string): string {
    const names: { [key: string]: string } = {
      'dominio': 'Dominio',
      'fechaFabricacion': 'Fecha de fabricación',
      'cuitDuenio': 'CUIT del dueño'
    };
    return names[field] || field;
  }

  volver(): void {
    this.router.navigate(['/listado']);
  }
}
