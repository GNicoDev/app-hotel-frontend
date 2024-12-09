import { Injectable } from '@angular/core';
import { Habitacion } from '../../modells/habitacion';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../modells/cliente';

@Injectable({
  providedIn: 'root'
})
export class ServhotelService {


  Url='http://localhost:8080/hotel';

  constructor(private http : HttpClient) { }


//RESEVAR HABITACION
  reservar(habitacion: Habitacion, id: number){
    return this.http.post<Habitacion>(this.Url + '/rooms/' + id + '/reservation', habitacion, {
      observe: 'response'
    })
  }

  checkOut(numero: number){
    return this.http.post<Habitacion>(this.Url + '/rooms/' + numero + '/checkout', {
      observe: 'response'
    })
  }

  returnClientRoom(idHabitacion: number){
    return this.http.get<Cliente>(this.Url + '/rooms/' + idHabitacion + '/customer')
  }

}
