import { Injectable } from '@angular/core';
import { Room } from '../../modells/room';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../modells/customer';

@Injectable({
  providedIn: 'root'
})
export class ServhotelService {


  Url='http://localhost:8081/hotel';

  constructor(private http : HttpClient) { }


//RESEVAR HABITACION
  checkIn(room: Room, customerId: number){
    return this.http.post<Room>(this.Url + '/rooms/' + customerId + '/reservation', room, {
      observe: 'response'
    })
  }

  checkOut(roomNumber: number){
    return this.http.post<Room>(this.Url + '/rooms/' + roomNumber + '/checkout', {
      observe: 'response'
    })
  }

  returnClientRoom(roomId: number){
    return this.http.get<Customer>(this.Url + '/rooms/' + roomId + '/customer')
  }

}
