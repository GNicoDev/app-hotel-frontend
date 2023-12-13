import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../modells/cliente';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServclienteService {

  Url='http://localhost:8080/hotel/clientes/';

  constructor(private http : HttpClient) { }

//LISTAR CLIENTES
  getClientes(){
    return this.http.get<Cliente[]>(this.Url + 'listar');
  }

//BUSCAR CLIENTE POR ID
  findById(id: number){
    return this.http.get<Cliente>(this.Url + 'buscar/' + id)
  }

//BUSCAR CLIENTES POR APELLIDO  
  findBySurname( surname : string){
    return this.http.get<Cliente[]>(this.Url + 'listarporapellido/' + surname)
  }

//BUSCAR CLIENTE POR DNI
findByDni(dni: number){
  return this.http.get<Cliente>(this.Url + 'buscarpordni/' + dni)
}

//GUARDAR CLIENTES
  saveCliente(cliente: Cliente){
    return this.http.post<Cliente>(this.Url + 'guardar', cliente , {
      observe : 'response'
    })
  }

//ACTUALIZAR CLIENTE
  editCliente(cliente: Cliente, id: number){
    return this.http.post<Cliente>(this.Url + 'actualizar/' + id, cliente, {
      observe: 'response'
    })
  }

//BORRAR CLIENTE
  deleteCliente(id : number){
   return this.http.post<Boolean>(this.Url + 'borrar/' + id, {
      observe: 'response'
    })
  }
}
