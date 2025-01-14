import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 // title = 'appHotel';
  hasContent = false;
  isHomeRoute = false;

  constructor(private router: Router) {}

  onActivate(event: any): void {
    this.hasContent = !!event; // Actualiza hasContent según si hay un componente activo
    this.isHomeRoute = this.router.url === '/'; // Check if we are on the home route

  }
}
