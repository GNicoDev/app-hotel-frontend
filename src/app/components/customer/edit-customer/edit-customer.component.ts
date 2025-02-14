import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Customer } from '../../../modells/customer';
import { ServCustomerService } from '../../../services/servcustomer/servcustomer.service';
import { MessageService } from '../../../services/servmessage/message.service';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit{
  customer: Customer = new Customer();
  customerId: number | null = null;
  customerLoaded: boolean = false; // Flag to control form visibility

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private servCustomer: ServCustomerService,
    private messageService: MessageService
  ) { }

 ngOnInit(): void { 
   const id = this.route.snapshot.paramMap.get('id'); 
   if (id) { 
      this.customerId = +id; 
      this.loadRoomDataById(this.customerId); 
   }
  }

  loadRoomDataById(id: number): void { 
    this.servCustomer.findById(id).subscribe(
      (data) => { 
      this.customer = data; 
      this.customerLoaded = true;
     }, 
     (error) => { 
        this.messageService.showSnackbar('Error loading customer: Customer ID does not exist', 'Close'); 
        console.error('Error loading customer:', error); 
      } );
   }

  loadCustomerData(): void {
    this.customerId = Number(this.customer.id);
    if (isNaN(this.customerId) || this.customerId <= 0) {
      this.messageService.showSnackbar('Please enter a valid Customer ID', 'Close');
      return;
    }

    this.customerLoaded = false;

    if (this.customerId) {
      this.servCustomer.findById(this.customerId).subscribe(
        (data) => {
        this.customer = data;
        this.customerLoaded = true;
      },
        (error) => {
          this.messageService.showSnackbar('Error editing customer: Customer ID does not exist', 'Close');
        }
      );
    }
  }

  saveChanges(): void {
    if (this.customerId !== null) {
     
      const customerData = {
        id: this.customerId,
        name: this.customer.name,
        lastName: this.customer.lastName,
        passport: this.customer.passport,
        phone: this.customer.phone
      };
      console.log(customerData)
      this.servCustomer.updateCustomer(customerData, this.customerId).subscribe(
        () => {
        this.messageService.showSnackbar('Customer edited successfully', 'Close'); 
        this.router.navigate(['/']); 
        }, 
        (error) => {
        if (error.status === 404) {
          this.messageService.showSnackbar('Error editing customer: Invalid customer data', 'Close');
        } else {
          this.messageService.showSnackbar('Unexpected error occurred', 'Close');

        } console.error('Error editing customer:', error);
      });
    }
  }

  goHome(){
    this.router.navigate(['/'])
  }

}
