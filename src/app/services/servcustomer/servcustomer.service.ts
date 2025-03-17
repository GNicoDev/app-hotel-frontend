import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../../modells/customer';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServCustomerService {

  Url='http://localhost:8081/hotel/customers';

  constructor(private http : HttpClient) { }

//LISTAR CLIENTES
  getCustomers(){
    return this.http.get<Customer[]>(this.Url);
  }

//BUSCAR CLIENTE POR ID
  findById(id: number){
    return this.http.get<Customer>(this.Url + '/' + id)
  }

//BUSCAR CLIENTES POR APELLIDO  
  findBySurname( surname : string){
    return this.http.get<Customer[]>(this.Url + '/lastname/' + surname)
  }

//BUSCAR CLIENTE POR DNI
findByPassport(passport: string){
  return this.http.get<Customer>(this.Url + '/passport/' + passport)
}

//GUARDAR CLIENTES
  saveCustomer(customer: Customer){
    return this.http.post<Customer>(this.Url, customer , {
      observe : 'response'
    })
  }

//ACTUALIZAR CLIENTE
  updateCustomer(customer: Customer, id: number){
    console.log(customer)
    return this.http.put<Customer>(this.Url + '/' + id, customer, {
      observe: 'response'
    })
  }

//BORRAR CLIENTE
  deleteCustomer(id : number){
   return this.http.delete<Boolean>(this.Url + '/' + id)
  }
}
