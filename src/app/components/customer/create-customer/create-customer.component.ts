import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Customer } from '../../../modells/customer'; 
import { ServCustomerService } from '../../../services/servcustomer/servcustomer.service'; 
import { Router } from '@angular/router';
import { MessageService } from '../../../services/servmessage/message.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {
  customer: Customer = new Customer();
  createdCustomer: Customer | null = null; 

  constructor(
    private servCustomer: ServCustomerService,
    private router: Router,
    private messageService: MessageService
    
  ) {
  }

  createCustomer(): void {
    const customerData = { 
      name: this.customer.name, 
      lastName: this.customer.lastName,
      passport: this.customer.passport,
      phone: this.customer.phone
    };

    this.servCustomer.saveCustomer(customerData).subscribe( 
      (response) => {
      this.messageService.showSnackbar('Customer created successfully', 'Close');
      this.createdCustomer = response.body; // Store the created room 
    },
      error => {
        this.messageService.showSnackbar('Error creating customer. ' + error.body, 'Close')
      });
  }

  goHome(){
    this.router.navigate(['/'])
  }
}
