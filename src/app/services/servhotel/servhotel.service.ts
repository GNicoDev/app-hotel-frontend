import { Injectable } from '@angular/core';
import { Habitacion } from '../../modells/habitacion';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../modells/cliente';

@Injectable({
  providedIn: 'root'
})
export class ServhotelService {


  Url='http://localhost:8080/hotel/';

  constructor(private http : HttpClient) { }


//RESEVAR HABITACION
  reservar(habitacion: Habitacion, id: number){
    return this.http.post<Habitacion>(this.Url + 'reservar/' + id, habitacion, {
      observe: 'response'
    })
  }

  checkOut(numero: number){
    return this.http.post<Habitacion>(this.Url + 'checkout/' + numero, {
      observe: 'response'
    })
  }

  returnClientRoom(idHabitacion: number){
    return this.http.post<Cliente>(this.Url + 'mostrarcliente/' + idHabitacion, {
      observe: 'response'
    })
  }

}
