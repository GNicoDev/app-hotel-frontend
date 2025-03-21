import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServRoomService } from '../../../services/servroom/servroom.service';
import { Room } from '../../../modells/room';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageService } from '../../../services/servmessage/message.service';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit{
  room: Room = new Room();
  roomId: number | null = null;
  roomLoaded: boolean = false; // Flag to control form visibility

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private servRoom: ServRoomService,
    private messageService: MessageService
  ) { }

 ngOnInit(): void { 
   const id = this.route.snapshot.paramMap.get('id'); 
   if (id) { 
      this.roomId = +id; 
      this.loadRoomDataById(this.roomId); 
   }
  }

  loadRoomDataById(id: number): void { 
    this.servRoom.findById(id).subscribe((room) => { 
      this.room = room; 
      this.roomLoaded = true;
     }, 
     (error) => { 
        this.messageService.showSnackbar('Error loading room: Room ID does not exist', 'Close'); 
        console.error('Error loading room:', error); 
      } );
   }

  loadRoomData(): void {
    this.roomId = Number(this.room.id);
    if (isNaN(this.roomId) || this.roomId <= 0) {
      this.messageService.showSnackbar('Please enter a valid Room ID', 'Close');
      return;
    }

    this.roomLoaded = false;
    console.log('En load room' + this.room.id)
    if (this.roomId) {
      this.servRoom.findById(this.roomId).subscribe((room) => {
        this.room = room;
        this.roomLoaded = true;
        console.log('Room data loaded:', room)
      },
        (error) => {
          this.messageService.showSnackbar('Error editing room: Room ID does not exist', 'Close');
          console.error('Error deleting room:', error);
        }
      );
    }
  }

  saveChanges(): void {
    if (this.roomId !== null) {
      if (isNaN(this.room.roomNumber) || !Number.isInteger(this.room.roomNumber) || this.room.roomNumber <= 0) {
        this.messageService.showSnackbar('Please enter a valid Room Number', 'Close'); return;
      }
      const roomData = {
        id: this.roomId,
        roomNumber: Number(this.room.roomNumber),
        guestCount: Number(this.room.guestCount),
        roomType: this.room.roomType,
        checkInDate: this.room.checkInDate,
        checkOutDate: this.room.checkOutDate,
        pricePerNight: Number(this.room.pricePerNight)
      };
      console.log(roomData)
      this.servRoom.updateRoom(roomData, this.roomId).subscribe(() => {
        this.messageService.showSnackbar('Room edited successfully', 'Close'); this.router.navigate(['/']); 
      }, (error) => {
        if (error.status === 409) {
          this.messageService.showSnackbar('Error editing room: Room number already exists', 'Close');
        } else if (error.status === 400) {
          this.messageService.showSnackbar('Error editing room: Invalid room data', 'Close');
        } else {
          this.messageService.showSnackbar('Unexpected error occurred', 'Close');

        } console.error('Error editing room:', error);
      });
    }
  }


  goHome(){
    this.router.navigate(['/'])
  }
}

