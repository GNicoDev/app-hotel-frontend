import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServCustomerService } from '../../../../services/servcustomer/servcustomer.service';
import { Customer } from '../../../../modells/customer';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/servauth/auth.service';

@Component({
  selector: 'app-find-all-customer',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './find-all-customer.component.html',
  styleUrls: ['./find-all-customer.component.css']
})
export class FindAllCustomerComponent implements OnInit {
  customersList: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm: string = '';
  displayedColumns: string[] = ['lastName', 'name', 'passport', 'phone', 'actions'];
  userRole: string | null = '';

  constructor(
    private customerService: ServCustomerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      if (status) {
        this.userRole = localStorage.getItem('role');
      }
    });
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getCustomers().subscribe(
      (customers: Customer[]) => {
        this.customersList = customers;
        this.applyFilter(); // Filtrar clientes inicialmente
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  applyFilter() {
    this.filteredCustomers = this.customersList.filter(customer =>
      customer.lastName ? customer.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) : false
    );
  }

  editCustomer(customerId: number) {
    this.router.navigate(['/edit-customer', customerId]);
  }

  deleteCustomer(customerId: number) {
    this.router.navigate(['/delete-customer', customerId]);
  }
}
