import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../modells/user';
import { UserService } from '../../../services/servuser/user.service';
import { MessageService } from '../../../services/servmessage/message.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User = new User();
  userLoaded: boolean = false; // Flag to control form visibility
  roles = ['USER', 'ADMIN'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    console.log(' en edit-user ' + username)

    if (username){
      this.userLoaded=true
      this.loadUserDataByUsername(username)
    }
  }

  loadUserDataByUsername(username: string): void {
    this.userService.getUserById(username).subscribe(response => {
      this.user = response
    },
    error=>{
      this.messageService.showSnackbar('Error loading user: Username does not exist', 'Close'); 
    }
  )
  }

  loadUserData(): void {

    const userName = this.user.userName;
    if (!userName) {
      this.messageService.showSnackbar('Please enter a valid User ID', 'Close');
      return;
    }

    this.userLoaded = false;

    this.userService.getUserById(userName).subscribe(
      (data) => {
        this.user = data;
        this.userLoaded = true;
      },
      (error) => {
        this.messageService.showSnackbar('Error editing user: User ID does not exist', 'Close');
      }
    );
  }

  saveChanges(): void {
    if (this.user.userName) {
      this.userService.updateUser(this.user.userName, this.user).subscribe(
        () => {
          this.messageService.showSnackbar('User edited successfully', 'Close');
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 404) {
            this.messageService.showSnackbar('Error editing user: Invalid user data', 'Close');
          } else {
            this.messageService.showSnackbar('Unexpected error occurred', 'Close');
          }
          console.error('Error editing user:', error);
        }
      );
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
