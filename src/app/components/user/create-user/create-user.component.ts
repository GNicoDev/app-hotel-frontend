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
import { MessageService } from '../../../services/servmessage/message.service';

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
    private router: Router,
    private messageService: MessageService
  ) {}

  createUser(): void {
    this.userService.createUser(this.user).subscribe(
      response => {
        this.messageService.showSnackbar('User created successfully', 'Close')
        this.createdUser = response; // Store the created user
      },
      error => {
        if (error.status === 409) {
          this.messageService.showSnackbar('User with this username already exists', 'Close');
        } else {
          this.messageService.showSnackbar('Error creating user.', 'Close');
        }
      }
    );
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
