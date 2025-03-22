import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {
  private propiedades: string[] = ['101', '102', '103', '201', '202', '203']; // Simulación de datos

  obtenerPropiedades(): string[] {
    return this.propiedades;
  }
}
