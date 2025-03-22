import { Injectable } from '@angular/core';

interface Usuario {
  id: number;
  name: string;
  email: string;
  role: string;
  apartment: string;
  phone: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor() {}

  obtenerUsuarios(): Usuario[] {
    const datosGuardados = localStorage.getItem('usuarios');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  }
}
