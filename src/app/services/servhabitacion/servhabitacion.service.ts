import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion } from '../../modells/habitacion';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServhabitacionService {

  Url='http://localhost:8080/hotel/rooms';

  constructor(private http : HttpClient ) { }

//LISTAR Habitaciones
 getHabitaciones(){
    return this.http.get<Habitacion[]>(this.Url);
  } 
  
  /*getHabitaciones(): Observable<Habitacion[]> {
    let habitaciones: Habitacion[] = [{
      id: 1,
      nroHabitacion: 304,
      cantHuespedes: 3,
      tipoHabitacion: "Triple",
      fechaDeIngreso: new Date('2023-12-01'),
      fechaDeEgreso: new Date('2023-12-06'),
      precio: 8500.50
  }]
    return from([habitaciones])
  }*/

//BUSCAR HABITACION POR ID
  findById(id: number){
    return this.http.get<Habitacion>(this.Url + '/' + id)
  }

//BUSCAR HABITACION POR NUMERO
  findByNumber( numero : number){
    return this.http.get<Habitacion>(this.Url + '/number/' + numero)
  }

//BUSCAR HABITACIONES DISPONIBLES SEGUN CANTIDAD DE HUESPEDES
  listAvailableRooms(cantHuespedes: number){
    return this.http.get<Habitacion[]>(this.Url + '/available/' + cantHuespedes)
  }  

//GUARDAR HABITACION
  saveHabitacion(habitacion: Habitacion){
    return this.http.post<Habitacion>(this.Url, habitacion , {
      observe : 'response'
    })
  }

//ACTUALIZAR HABITACION
  editHabitacion(habitacion: Habitacion, id: number){
    return this.http.put<Habitacion>(this.Url + '/' + id, habitacion, {
      observe: 'response'
    })
  }

//BORRAR HABITACION
  deleteHabitacion(id : number){
    return this.http.delete<Boolean>(this.Url + '/' + id)
  }

}
