import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropiedadesService } from '../services/propiedades.service';

interface Usuario {
  id: number;
  name: string;
  email: string;
  role: string;
  apartment: string;
  phone: string;
  active: boolean;
}

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuarioComponent {
  usuarios: Usuario[] = [];
  propiedades: string[] = [];
  usuarioForm: FormGroup;
  editMode = false;
  usuarioSeleccionado: Usuario | null = null;
  mostrarModal = false;

  constructor(private fb: FormBuilder, private propiedadesService: PropiedadesService) {
    this.usuarioForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      apartment: ['', Validators.required],
      phone: ['', Validators.required],
      active: [false]
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
    this.propiedades = this.propiedadesService.obtenerPropiedades(); // Cargar propiedades
  }

  cargarUsuarios() {
    const datosGuardados = localStorage.getItem('usuarios');
    if (datosGuardados) {
      this.usuarios = JSON.parse(datosGuardados);
    }
  }

  guardarEnLocalStorage() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  agregarUsuario() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario: Usuario = {
        id: this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1,
        ...this.usuarioForm.value
      };
      this.usuarios.push(nuevoUsuario);
      this.guardarEnLocalStorage();
      this.cerrarModal();
    }
  }

  editarUsuario(usuario: Usuario) {
    this.editMode = true;
    this.mostrarModal = true;
    this.usuarioSeleccionado = usuario;
    this.usuarioForm.patchValue(usuario);
  }

  actualizarUsuario() {
    if (this.usuarioForm.valid && this.usuarioSeleccionado) {
      const index = this.usuarios.findIndex(u => u.id === this.usuarioSeleccionado!.id);
      if (index !== -1) {
        this.usuarios[index] = { id: this.usuarioSeleccionado.id, ...this.usuarioForm.value };
        this.guardarEnLocalStorage();
      }
      this.cerrarModal();
    }
  }

  eliminarUsuario(id: number) {
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    this.guardarEnLocalStorage();
  }

  cerrarModal() {
    this.editMode = false;
    this.mostrarModal = false;
    this.usuarioSeleccionado = null;
    this.usuarioForm.reset({ active: false });
  }

  trackById(index: number, usuario: Usuario) {
    return usuario.id;
  }
}