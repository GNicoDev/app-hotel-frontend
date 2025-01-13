import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../modells/customer';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServclienteService {

  Url='http://localhost:8080/hotel/customers';

  constructor(private http : HttpClient) { }

//LISTAR CLIENTES
  getClientes(){
    return this.http.get<Cliente[]>(this.Url);
  }

//BUSCAR CLIENTE POR ID
  findById(id: number){
    return this.http.get<Cliente>(this.Url + '/' + id)
  }

//BUSCAR CLIENTES POR APELLIDO  
  findBySurname( surname : string){
    return this.http.get<Cliente[]>(this.Url + '/lastname/' + surname)
  }

//BUSCAR CLIENTE POR DNI
findByDni(dni: number){
  return this.http.get<Cliente>(this.Url + '/passport/' + dni)
}

//GUARDAR CLIENTES
  saveCliente(cliente: Cliente){
    return this.http.post<Cliente>(this.Url, cliente , {
      observe : 'response'
    })
  }

//ACTUALIZAR CLIENTE
  editCliente(cliente: Cliente, id: number){
    console.log(cliente)
    return this.http.put<Cliente>(this.Url + '/' + id, cliente, {
      observe: 'response'
    })
  }

//BORRAR CLIENTE
  deleteCliente(id : number){
   return this.http.delete<Boolean>(this.Url + '/' + id)
  }
}
