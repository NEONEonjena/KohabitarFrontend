import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  summaryCards = [
    { title: 'Residentes', value: 9, icon: 'bi bi-people-fill', bg: 'bg-primary' },
    { title: 'Citas de Hoy', value: 10, icon: 'bi bi-calendar-check-fill', bg: 'bg-success' },
    { title: 'Espacios Ocupados', value: 20, icon: 'bi bi-building', bg: 'bg-warning' },
    { title: 'Paquetes Entregados', value: 30, icon: 'bi bi-box-seam', bg: 'bg-danger' }
  ];
}
