import { Component,  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ServCustomerService } from '../../../../services/servcustomer/servcustomer.service';
import { Customer } from '../../../../modells/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-all-customer',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './find-all-customer.component.html',
  styleUrl: './find-all-customer.component.css'
})
export class FindAllCustomerComponent implements OnInit {
  customersList: Customer[] = [];
  displayedColumns: string[] = [ 'name', 'lastName', 'passport', 'phone', 'actions'];

  constructor(
    private customerService: ServCustomerService, 
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getCustomers().subscribe(
      (customers: Customer[]) => {
        this.customersList = customers;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  editCustomer(customerId: number) {
    this.router.navigate(['/edit-customer', customerId]);
  }

  deleteCustomer(roomId: number) {
    console.log(roomId);
   // this.router.navigate(['/delete-room', roomId]);
  }
}
