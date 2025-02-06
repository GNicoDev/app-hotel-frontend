import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/servauth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userRole: string | null = '';
  isLoggedIn: boolean = false;
  username: string | null = '';

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.userRole = localStorage.getItem('role');
        this.username = localStorage.getItem('username');
        console.log('User role from localStorage:', this.userRole);
      }
    });
  }

  // Method to handle logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
