import { Component } from '@angular/core';
import { UserService } from '../../../services/servuser/user.service';
import { MessageService } from '../../../services/servmessage/message.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  userId: string = '';

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  deleteUser(): void {
    this.userService.deleteUser(this.userId).subscribe(
      response => {
        this.messageService.showSnackbar('User deleted successfully', 'Close');
        this.router.navigate(['/users']);
      },
      error => {
        console.error('Error deleting user:', error);
        this.messageService.showSnackbar('Error deleting user.', 'Close');
      }
    );
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}

