import { Injectable } from '@angular/core';
import { Room } from '../../modells/room';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../modells/customer';

@Injectable({
  providedIn: 'root'
})
export class ServhotelService {


  Url='http://localhost:8080/hotel';

  constructor(private http : HttpClient) { }


//RESEVAR HABITACION
  reservar(room: Room, id: number){
    return this.http.post<Room>(this.Url + '/rooms/' + id + '/reservation', room, {
      observe: 'response'
    })
  }

  checkOut(numero: number){
    return this.http.post<Room>(this.Url + '/rooms/' + numero + '/checkout', {
      observe: 'response'
    })
  }

  returnClientRoom(idHabitacion: number){
    return this.http.get<Cliente>(this.Url + '/rooms/' + idHabitacion + '/customer')
  }

}
