import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';

interface Propiedad {
  id: number;
  address: string;
  block?: string;
  area: number;
  type: string;
  status: string;
  owner?: string;
  numResidents?: number;
  usage?: string;
}

interface Usuario {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-propiedades',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './propiedades.component.html',
  styleUrl: './propiedades.component.css'
})

export class PropiedadesComponent {
  propiedades: Propiedad[] = [];
  propiedadForm: FormGroup;
  editMode = false;
  propiedadSeleccionada: Propiedad | null = null;
  mostrarModal = false;
  propietarios: Usuario[] = [];

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {
    this.propiedadForm = this.fb.group({
      address: ['', Validators.required],
      block: [''],
      area: [null, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      status: ['', Validators.required],
      owner: [''],
      numResidents: [null],
      usage: ['']
    });
  }

  ngOnInit() {
    this.cargarPropiedades();
    this.cargarPropietarios(); // <-- Carga propietarios al iniciar
  }

  cargarPropiedades() {
    const datosGuardados = localStorage.getItem('propiedades');
    if (datosGuardados) {
      this.propiedades = JSON.parse(datosGuardados);
    }
  }

  cargarPropietarios() {
    const usuarios = this.usuariosService.obtenerUsuarios();
    this.propietarios = usuarios.filter(usuario => usuario.role === 'Propietario'); // <-- Filtra solo propietarios
  }

  guardarEnLocalStorage() {
    localStorage.setItem('propiedades', JSON.stringify(this.propiedades));
  }

  agregarPropiedad() {
    if (this.propiedadForm.valid) {
      const nuevaPropiedad: Propiedad = {
        id: this.propiedades.length > 0 ? Math.max(...this.propiedades.map(p => p.id)) + 1 : 1,
        ...this.propiedadForm.value
      };
      this.propiedades.push(nuevaPropiedad);
      this.guardarEnLocalStorage();
      this.cerrarModal();
    }
  }

  editarPropiedad(propiedad: Propiedad) {
    this.editMode = true;
    this.mostrarModal = true;
    this.propiedadSeleccionada = propiedad;
    this.propiedadForm.patchValue(propiedad);
  }

  actualizarPropiedad() {
    if (this.propiedadForm.valid && this.propiedadSeleccionada) {
      const index = this.propiedades.findIndex(p => p.id === this.propiedadSeleccionada!.id);
      if (index !== -1) {
        this.propiedades[index] = { id: this.propiedadSeleccionada.id, ...this.propiedadForm.value };
      }
      this.guardarEnLocalStorage();
      this.cerrarModal();
    }
  }

  eliminarPropiedad(id: number) {
    this.propiedades = this.propiedades.filter(propiedad => propiedad.id !== id);
    this.guardarEnLocalStorage();
  }

  cerrarModal() {
    this.editMode = false;
    this.mostrarModal = false;
    this.propiedadSeleccionada = null;
    this.propiedadForm.reset();
  }
}
