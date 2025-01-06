import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

import { Room } from '../../modells/room';
import { ServhabitacionService } from '../../services/servhabitacion/servhabitacion.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServclienteService } from '../../services/servcliente/servcliente.service';
import { Cliente } from '../../modells/cliente';
import { ServhotelService } from '../../services/servhotel/servhotel.service';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [ButtonModule, CalendarModule, CardModule, DialogModule, FormsModule, ImageModule, InputGroupModule, InputGroupAddonModule,
    TooltipModule, TableModule, ReactiveFormsModule],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css'
})
export class CheckinComponent {

  rooms: Room[] = []
  formDni: FormGroup
  cliente: Cliente
  dni: number = 0
  value: number | undefined
  room: Room = new Room()
  idCliente: number | undefined
  visible: boolean = false
  dateIngreso: Date = new Date()
  dateEgreso: Date = new Date()

  constructor(private fd: FormBuilder, private servhabit: ServhabitacionService,
    private servcliente: ServclienteService, private router: Router, private servhotel: ServhotelService) {
    this.cliente = new Cliente()
    this.formDni = fd.group({
      dni: new FormControl('', [Validators.required])
    })
  }

  mostrarCliente() {
    if (this.formDni.valid) {
      this.dni = this.formDni.get('dni')?.value
      this.servcliente.findByDni(this.dni).subscribe(data => {
        this.cliente = data
        this.idCliente = this.cliente.id
        console.log(this.idCliente)
      })
    }
  }

  mostrarHabitaciones() {
    if ((this.value != null) && (this.formDni.valid)) {
      this.servhabit.listAvailableRooms(this.value).subscribe(data => {
        this.rooms = data
      })
    }
  }

  checkIn(nroHabitacion: number) {
    this.visible = true
    console.log(nroHabitacion)
    this.servhabit.findByNumber(nroHabitacion).subscribe(data => {
      this.room = data
      this.room.guestCount = this.value
    })
  }

  Terminar(idCliente: number) {
    if ((this.dateIngreso != null) && (this.dateEgreso != null)) {
      this.room.checkInDate = this.dateIngreso
      this.room.checkOutDate = this.dateEgreso
      this.servhotel.reservar(this.room, idCliente).subscribe(Data => {
        this.formDni.reset()
        this.value = undefined
        this.router.navigateByUrl('/')
      })
    }
  }
}
