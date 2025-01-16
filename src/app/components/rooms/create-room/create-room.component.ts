import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Room } from '../../../modells/room'; 
import { ServRoomService } from '../../../services/servroom/servroom.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  room: Room = new Room();
  createdRoom: Room | null = null; // Store the created room

  constructor(
    private servRoom: ServRoomService,
    private router: Router
  ) {
  }

  createRoom(): void {
    // Parse the data before sending 
    const roomData = { 
      roomNumber: Number(this.room.roomNumber), 
      roomType: this.room.roomType,
      pricePerNight: Number(this.room.pricePerNight)
    };
    console.log(roomData)
    this.servRoom.saveRoom(roomData).subscribe(response => {
      console.log('Room created successfully', response.body);
      this.createdRoom = response.body; // Store the created room 
    },
      error => {
        console.error('Error creating room', error);
      });
  }

  goHome(){
    this.router.navigate(['/'])
  }
}
