import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

import { UserService } from '../../../../services/servuser/user.service';
import { AuthService } from '../../../../services/servauth/auth.service';
import { User } from '../../../../modells/user';

import { MessageService } from '../../../../services/servmessage/message.service';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[
    CommonModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatIconModule,
        RouterModule
  ],
  templateUrl: './find-user-by-username.component.html',
  styleUrls: ['./find-user-by-username.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})

export class FindUserByUsernameComponent implements OnInit {
  user: User | null = null;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    const username = this.authService.getUsername();
    if (username) {
      this.userService.getUserByUsername(username).subscribe(
        (data) => {
          console.log(data)
          this.user = data;
          console.log(this.user.userName)
          console.log(this.user.email)          
        },
        (error) => {
          this.messageService.showSnackbar('Error fetching user details', 'Close');
        }
      );
    }
  }

  editProfile(){
    if(this.user)
    this.router.navigate(['/users/edit/', this.user?.userName]);
    
  }
}
