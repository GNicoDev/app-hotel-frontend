import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { ServRoomService } from '../../../../services/servroom/servroom.service'; 
import { Room } from '../../../../modells/room'; 
import { Router } from '@angular/router';
import { ServhotelService } from '../../../../services/servhotel/servhotel.service';
import { Customer } from '../../../../modells/customer';
import { AuthService } from '../../../../services/servauth/auth.service';
import { MessageService } from '../../../../services/servmessage/message.service';

@Component({
  selector: 'app-find-all-rooms',
  standalone: true,
  templateUrl: './find-all-rooms.component.html',
  styleUrls: ['./find-all-rooms.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule // Asegúrate de importar MatSnackBarModule
  ]
})
export class FindAllRoomsComponent implements OnInit {
  availableRooms: Room[] = [];
  filteredRooms: Room[] = [];
  isLoggedIn: boolean = false;
  userRole: string | null = '';
  searchTerm: string = '';
  displayedColumns: string[] = ['roomNumber', 'roomType', 'pricePerNight', 'guestCount', 'check-in', 'check-out', 'actions'];

  constructor(
    private roomService: ServRoomService,
    private authService : AuthService,
    private router: Router,
    private servHotel: ServhotelService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.userRole = localStorage.getItem('role');
      }
    });
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.getRooms().subscribe(
      (rooms: Room[]) => {
        this.availableRooms = rooms;
        this.applyFilter(); // Aplicar el filtro después de obtener los datos
      },
      (error) => {
        console.error('Error fetching rooms:', error);
      }
    );
  }

  applyFilter() {
    this.filteredRooms = this.availableRooms.filter(room =>
      room.roomNumber.toString().includes(this.searchTerm)
    );
  }

  editRoom(roomId: number) {
    this.router.navigate(['/edit-room', roomId]);
  }

  deleteRoom(roomId: number) {
    this.router.navigate(['/delete-room', roomId]);
  }

  checkInRoom(roomNumber: number) { 
    this.router.navigate(['/checkin'], { queryParams: { roomNumber } });
  } 
  
  confirmCheckOut(roomNumber: number) {
    if (confirm('Are you sure you want to check out?')) {
      console.log(roomNumber);
      this.servHotel.checkOut(roomNumber).subscribe(
        (response) => {
          console.log('Check-out successful:', response);
          this.messageService.showSnackbar('Check-out successful', 'Close');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error during check-out:', error);
          this.messageService.showSnackbar('Error during check-out. Please try again.', 'Close');
        }
      );
    }
  }

  viewCustomerDetail(roomId: number) { 
    this.router.navigate(['/customer-by-passport'], { queryParams: { roomId } });
  }
  
}
