import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Room } from '../../modells/room';
import { ServRoomService } from '../../services/servroom/servroom.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/servauth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule, 
    FormsModule, 
    MatSnackBarModule, 
    MatTableModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatDividerModule
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  guestCount: number = 0;
  availableRooms: Room[] = [];
  displayedColumns: string[] = ['roomNumber', 'roomType', 'pricePerNight'];
  isLoggedIn: boolean = false;

  constructor(
    private servRoom: ServRoomService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.displayedColumns.push('checkin');
      }
    });
  }

  findRooms(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.servRoom.listAvailableRooms(this.guestCount).subscribe(
      (rooms: Room[]) => {
        if (rooms && rooms.length > 0) {
          this.availableRooms = rooms;
          console.log(this.availableRooms);
        } else {
          this.availableRooms = [];
          this.showSnackbar("There are no rooms available for the provided dates.", 'Close');
        }
      },
      (error) => {
        if (error.status === 204) {
          this.showSnackbar("There are no rooms available for the provided dates.", 'Close');
        }
      }
    );
  }

  gotoCheckin(roomNumber: number): void {
    const queryParams = {
      roomNumber: roomNumber,
      startDate: this.startDate?.toISOString(),
      endDate: this.endDate?.toISOString(),
      guestCount: this.guestCount,
    };
    this.router.navigate(['/checkin'], { queryParams });
  }

  showSnackbar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
    });
  }
}
