import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Customer } from '../../modells/customer';
import { Room } from '../../modells/room';
import { ServCustomerService } from '../../services/servcustomer/servcustomer.service';
import { ServRoomService } from '../../services/servroom/servroom.service';
import { ServhotelService } from '../../services/servhotel/servhotel.service';

@Component({
  selector: 'app-checkin',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  room: Room = new Room();
  roomData: Room = new Room();
  customer: Customer = new Customer();
  startDate: Date | undefined = undefined;
  endDate: Date | undefined = undefined;
  guestCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servCustomer: ServCustomerService,
    private servRoom: ServRoomService,
    private servHotel: ServhotelService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['roomNumber']) {
        this.room.roomNumber = +params['roomNumber'];
      }
      if (params['startDate']) {
        this.startDate = new Date(params['startDate']);
      }
      if (params['endDate']) {
        this.endDate = new Date(params['endDate']);
      }
      if (params['guestCount']) {
        this.guestCount = +params['guestCount'];
      }
    });
  }

  submitCheckin(): void {
    if (!this.room.roomNumber || !this.customer.passport) {
      this.showSnackbar('Please enter valid room number and client passport.', 'Close');
      return;
    }
    if (!this.startDate || !this.endDate){
      this.showSnackbar('Please enter the dates of check-in and check-out.', 'Close'); 
      console.log(this.startDate + '    ---' + this.endDate)
      return;
    }
  
    if (!this.guestCount || this.guestCount <=0){
      this.showSnackbar('Please enter valid guest count', 'Close');
      return;
    }
  
    this.servCustomer.findByPassport(this.customer.passport).subscribe(
      (data) => {
        this.customer = data
        this.servRoom.findByNumber(this.room.roomNumber).subscribe(
          (room) => {
            this.roomData = room;
            this.performCheckin();
          },
          (error) => {
            this.showSnackbar('Room not found. Please enter a valid room number.', 'Close');
            console.error('Room not found:', error);
          });
      },
      (error) => {
        this.showSnackbar('Customer not found. Please enter a valid client passport.', 'Close');
        console.error('Customer not found:', error);
      });
  }
  
  performCheckin(): void {
    this.roomData.customer = this.customer;
    this.roomData.guestCount = +this.guestCount;
    this.roomData.checkInDate = this.startDate;
    this.roomData.checkOutDate = this.endDate;

    console.log(this.roomData)
  
    this.servHotel.checkIn(this.roomData, this.customer.id).subscribe(
      () => {
        this.showSnackbar('Check-in successful', 'Close');
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status === 404) {
          this.showSnackbar('Room or customer not found', 'Close');
        } else if (error.status === 409) {
          this.showSnackbar('The room is already occupied', 'Close');
        } else if (error.status === 400) {
          this.showSnackbar('Room capacity exceeded', 'Close');
        } else {
          this.showSnackbar('Error during check-in', 'Close');
        }
        console.error('Error during check-in:', error);
      });
  }
  
  showSnackbar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
    });
  }
}

