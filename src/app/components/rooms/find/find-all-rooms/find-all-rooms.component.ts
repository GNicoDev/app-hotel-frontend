import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ServRoomService } from '../../../../services/servroom/servroom.service'; 
import { Room } from '../../../../modells/room'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-all-rooms',
  standalone: true,
  templateUrl: './find-all-rooms.component.html',
  styleUrls: ['./find-all-rooms.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class FindAllRoomsComponent implements OnInit {
  availableRooms: Room[] = [];
  displayedColumns: string[] = ['roomNumber', 'roomType', 'pricePerNight', 'guestCount', 'check-in', 'check-out', 'actions'];

  constructor(private roomService: ServRoomService, private router : Router) {
  }

  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.getRooms().subscribe(
      (rooms: Room[]) => {
        this.availableRooms = rooms;
      },
      (error) => {
        console.error('Error fetching rooms:', error);
      }
    );
  }

  editRoom(roomId: number) { 
    this.router.navigate(['/edit-room', roomId]); 
    }

    deleteRoom(roomId: number) { 
      console.log(roomId);
      this.router.navigate(['/delete-room', roomId]); 
      }
}
