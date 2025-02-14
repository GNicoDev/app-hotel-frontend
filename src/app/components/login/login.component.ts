import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/servauth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../services/servmessage/message.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  credentials = { username: '', password: '' };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
      this.credentials.password= '';
      this.credentials.username= '';
  }

  login() {
    this.authService.login(this.credentials).subscribe(
      () => {
        this.router.navigate(['/home']);
        this.messageService.showSnackbar('Login successful', 'Close');
      },
      (error) => {
        let errorMessage = 'Login failed';
        if (error.status === 401) {
          errorMessage = error.error === 'User not found' ? 'User not found' : 'Invalid credentials';
        } else if (error.status === 423) {
          errorMessage = 'User account is locked';
        } else {
          errorMessage = error.error || 'An unexpected error occurred';
        }
        this.messageService.showSnackbar(errorMessage, 'Close');   

      }
    );
  }
}
