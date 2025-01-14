import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../../modells/room';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServRoomService {

  Url='http://localhost:8080/hotel/rooms';

  constructor(private http : HttpClient ) { }

//LISTAR Habitaciones
 getHabitaciones(){
    return this.http.get<Room[]>(this.Url);
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
    return this.http.get<Room>(this.Url + '/' + id)
  }

//BUSCAR HABITACION POR NUMERO
  findByNumber( numero : number){
    return this.http.get<Room>(this.Url + '/number/' + numero)
  }

//BUSCAR HABITACIONES DISPONIBLES SEGUN CANTIDAD DE HUESPEDES
  listAvailableRooms(guestCount: number){
    console.log(guestCount)
    return this.http.get<Room[]>(this.Url + '/available/' + guestCount)
  }  

//GUARDAR HABITACION
  saveRoom(room: Room){
    console.log(room)
    return this.http.post<Room>(this.Url, room , {
      observe : 'response'
    })
    
  }

//ACTUALIZAR HABITACION
  updateRoom(room: Room, id: number){
    return this.http.put<Room>(this.Url + '/' + id, room, {
      observe: 'response'
    })
  }

//BORRAR HABITACION
  deleteRoom(id : number){
    return this.http.delete<Boolean>(this.Url + '/' + id)
  }

}
