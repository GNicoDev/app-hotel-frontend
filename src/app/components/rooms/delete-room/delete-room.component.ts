import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 
import { Room } from '../../../modells/room'; 
import { Router } from '@angular/router';
import { ServRoomService } from '../../../services/servroom/servroom.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-delete-room',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.css'] // Corrige el nombre de la propiedad a "style**s**Urls"
})
export class DeleteRoomComponent {
  room: Room = new Room();
  roomId: number | null = null;

  constructor(
    private router: Router,
    private servRoom: ServRoomService,
    private snackBar: MatSnackBar
  ) {}

  deleteRoom() {
    this.roomId = Number(this.room.id);
    if (isNaN(this.roomId) || this.roomId <= 0) {
      this.showSnackbar('Please enter a valid Room ID', 'Close');
      return;
    }

    this.servRoom.deleteRoom(this.roomId).subscribe(
      () => {
        this.showSnackbar('Room deleted successfully', 'Close');
        this.router.navigate(['/']); 
      },
      (error) => {
        this.showSnackbar('Error deleting room', 'Close');
        console.error('Error deleting room:', error);
      }
    );
  }

  showSnackbar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top'
    });
  }
}
