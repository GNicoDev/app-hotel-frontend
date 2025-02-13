import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/servauth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
      this.credentials.password= '';
      this.credentials.username= '';
  }

  login() {
    this.authService.login(this.credentials).subscribe(
      () => {
        // Navegar a la página de inicio
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }
}
