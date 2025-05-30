import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../../services/service.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  form!: FormGroup;
  usuarioOriginal: any;
  errorMensaje: string | null = null; // Error message for file upload
  imagenPreview: string | ArrayBuffer | null = null; // Variable to hold the image preview

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      telefono: [null],
      ci: [null],
      fecha_nacimiento: [null],
      password: [null],
      imagen_url: [null], // Set to null initially
      estado: [true],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getUsuarioID(id).subscribe((data) => {
      this.usuarioOriginal = data;
      this.form.patchValue(data);
      this.imagenPreview = data.imagen_url; // Set the initial image preview
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.usuarioService.updateUsuario(this.form.value).subscribe(() => {
        this.router.navigate(['app-panel-control/listar-usuario']);
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-usuario']);
  }

  restablecerFormulario(): void {
    if (this.usuarioOriginal) {
      this.form.patchValue(this.usuarioOriginal);
      this.imagenPreview = this.usuarioOriginal.imagen_url; // Reset the image preview
    }
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
