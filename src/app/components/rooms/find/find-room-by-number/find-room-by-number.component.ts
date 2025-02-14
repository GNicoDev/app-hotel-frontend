import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServRoomService } from '../../../../services/servroom/servroom.service';
import { Room } from '../../../../modells/room';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageService } from '../../../../services/servmessage/message.service';

@Component({
  selector: 'app-find-room-by-number',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './find-room-by-number.component.html',
  styleUrls: ['./find-room-by-number.component.css']
})
export class FindRoomByNumberComponent {
  roomNumber: number = 0;
  room: Room | null = null;

  constructor(
    private router: Router,
    private servRoom: ServRoomService,
    private messageService: MessageService
  ) { }

  findRoom(): void {
    if (isNaN(this.roomNumber) || this.roomNumber <= 0) {
      this.messageService.showSnackbar('Please enter a valid Room Number', 'Close');
      return;
    }

    this.servRoom.findByNumber(this.roomNumber).subscribe(
      (room) => {
        this.room = room;
      },
      (error) => {
        this.messageService.showSnackbar('Room not found. Please enter a valid Room Number.', 'Close');
      }
    );
  }

}
