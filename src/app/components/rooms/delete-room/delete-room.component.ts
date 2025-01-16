import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Room } from '../../../modells/room';
import { ActivatedRoute, Router } from '@angular/router';
import { ServRoomService } from '../../../services/servroom/servroom.service';

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
export class DeleteRoomComponent implements OnInit {
  room: Room = new Room();
  roomId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servRoom: ServRoomService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { 
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.roomId = +id;
      this.confirmDeletion(this.roomId);
    }
  }

  confirmDeletion(id: number) {
    if (confirm(`Are you sure you want to delete room with ID ${id}?`)) {
      this.delete(id);
    } else {
      this.router.navigate(['/rooms']);
    }
  }

  deleteRoom() {
    this.roomId = Number(this.room.id);
    if (isNaN(this.roomId) || this.roomId <= 0) {
      this.showSnackbar('Please enter a valid Room ID', 'Close');
      return;
    }
    this.delete(this.roomId);
  }
  delete(id: number) {
    this.servRoom.deleteRoom(id).subscribe(
      () => {
        this.showSnackbar('Room deleted successfully', 'Close');
        this.router.navigate(['/rooms']);
      },
      (error) => { 
        if (error.status === 404) { 
          this.showSnackbar('Room not found. Please enter a valid Room ID.', 'Close'); 
        } else { 
          this.showSnackbar('Error deleting room', 'Close'); 
        } console.error('Error deleting room:', error);
       }
    );
  }

  showSnackbar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top'
    });
  }

  goHome(){
    this.router.navigate(['/'])
  }
}
