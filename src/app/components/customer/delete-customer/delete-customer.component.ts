
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Customer } from '../../../modells/customer';
import { ServCustomerService } from '../../../services/servcustomer/servcustomer.service';
import { MessageService } from '../../../services/servmessage/message.service';

@Component({
  selector: 'app-delete-customer',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule],
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {
  customer: Customer = new Customer();
  customerId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servCustomer: ServCustomerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerId = +id;
      this.confirmDeletion(this.customerId);
    }
  }

  confirmDeletion(id: number): void {
    if (confirm(`Are you sure you want to delete customer with ID ${id}?`)) { // Corrected message
      this.delete(id);
    } else {
      this.router.navigate(['/customers']);
    }
  }

  deleteCustomer(): void {
    this.customerId = Number(this.customer.id!); // Ensure this is always valid
    if (isNaN(this.customerId) || this.customerId <= 0) {
      this.messageService.showSnackbar('Please enter a valid Customer ID', 'Close');
      return;
    }
    this.delete(this.customerId);
  }

  delete(id: number): void {
    this.servCustomer.deleteCustomer(id).subscribe(
      () => {
        this.messageService.showSnackbar('Customer deleted successfully', 'Close');
        this.router.navigate(['/customers']);
      },
      (error) => {
        if (error.status === 404) {
          this.messageService.showSnackbar('Customer not found. Please enter a valid Customer ID.', 'Close');
        } else {
          this.messageService.showSnackbar('Error deleting customer', 'Close');
        }
        console.error('Error deleting customer:', error);
      }
    );
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
