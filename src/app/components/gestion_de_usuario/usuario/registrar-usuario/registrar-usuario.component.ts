import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from '../../../../services/service.service';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit {
  form!: FormGroup;

  errorMensaje: string | null = null; // Mensaje de error
  imagenPreview: string | ArrayBuffer | null = null; // Variable to hold the image preview

  constructor(
    private fb: FormBuilder,
    private usuarioService: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      telefono: [null],
      ci: [null],
      fecha_nacimiento: [null],
      password: [null, Validators.required],
      imagen_url: [null], // Set to null initially
      estado: [true],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.usuarioService.createUsuario(this.form.value).subscribe(() => {
        this.router.navigate(['app-panel-control/listar-usuario']);
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-usuario']);
  }

  limpiarFormulario(): void {
    this.form.reset({
      estado: true,
      imagen_url: null, // Reset to null
    });
    this.imagenPreview = null; // Clear the image preview
  }

  onFileChange(event: any): void {
    const inputElement = event.target as HTMLInputElement;

    // Check if files are not null and has at least one file
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      // Validate the file type
      const validExtensions = ['image/png', 'image/jpeg'];
      if (!validExtensions.includes(file.type)) {
        this.errorMensaje =
          'Formato de archivo incorrecto. Solo se permiten PNG y JPG.'; // Error message
        this.imagenPreview = null; // Clear the preview
        return;
      }

      // If valid, update the form and show the preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result; // Set the image preview
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      this.errorMensaje = 'Por favor, selecciona un archivo.'; // Error message if no file
      this.imagenPreview = null; // Clear the preview
    }
  }
}
