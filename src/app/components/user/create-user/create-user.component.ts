import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { User, Role } from '../../../modells/user'; 
import { UserService } from '../../../services/servuser/user.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  user: User = { userName: '', email: '', password: '', locked: false, disabled: false, role: Role.USER };
  createdUser: User | null = null; // Store the created user
  roles = Object.values(Role);

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  createUser(): void {
    this.userService.createUser(this.user).subscribe(
      response => {
        console.log('User created successfully', response);
        this.createdUser = response; // Store the created user
      },
      error => {
        console.error('Error creating user', error);
      }
    );
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
