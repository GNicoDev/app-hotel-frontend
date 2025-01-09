import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hasContent = false;
  isHomeRoute = false;

  constructor(private router: Router) {}

  onActivate(event: any): void {
    this.hasContent = !!event; // Actualiza hasContent según si hay un componente activo
    this.isHomeRoute = this.router.url === '/'; // Verifica si estamos en la ruta de inicio
  }
}
