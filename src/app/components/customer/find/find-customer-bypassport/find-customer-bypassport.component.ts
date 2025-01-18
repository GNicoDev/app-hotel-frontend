import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServCustomerService } from '../../../../services/servcustomer/servcustomer.service';
import { Customer } from '../../../../modells/customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ServhotelService } from '../../../../services/servhotel/servhotel.service';

@Component({
  selector: 'app-find-customer-bypassport',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,],
  templateUrl: './find-customer-bypassport.component.html',
  styleUrl: './find-customer-bypassport.component.css'
})
export class FindCustomerBypassportComponent implements OnInit {
  passport: string = '';
  customer: Customer | null = null;
  byparams: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serCustomer: ServCustomerService,
    private servHotel: ServhotelService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { 
      if (params['roomId']) { 
        this.servHotel.returnClientRoom(params['roomId']).subscribe( 
          (data) => { 
            if (data && data.passport) { 
              this.byparams= true
              this.passport = data.passport; 
              console.log(this.passport)
              this.findCustomer(); 
            } else { 
              this.showSnackbar('Customer passport not found.', 'Close'); 
            } 
          }, 
          (error) => { 
            console.error('Error fetching customer by ID:', error); 
            this.showSnackbar('Error fetching customer details. Please try again.', 'Close'); 
          } 
        ); 
      } 
    });
  }

  findCustomer(): void {
    if (this.passport !== '')

      this.serCustomer.findByPassport(this.passport).subscribe(
        (data) => {
          this.customer = data;
        },
        (error) => {
          this.showSnackbar('Customer not found. Please enter a valid Customer Passport.', 'Close');
          console.error('Error finding customer:', error);
        }
      );
  }

  showSnackbar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
    });
  }
}
