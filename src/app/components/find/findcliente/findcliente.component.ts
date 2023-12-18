import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';


import { ServclienteService } from '../../../services/servcliente/servcliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../../modells/cliente';
import { Habitacion } from '../../../modells/habitacion';
import { ServhotelService } from '../../../services/servhotel/servhotel.service';
@Component({
  selector: 'app-findcliente',
  standalone: true,
  imports: [ButtonModule, CalendarModule, DialogModule, FormsModule, InputGroupModule, InputGroupAddonModule, ReactiveFormsModule, TableModule],
  templateUrl: './findcliente.component.html',
  styleUrl: './findcliente.component.css'
})
export class FindclienteComponent {
  apellido: string = ''
  idCliente: number = 0
  clientes: Cliente[] = []
  visibleBuscar: boolean
  visibleListar: boolean
  visibleByError: boolean
  visibleCheckIn: boolean
  formBuscarCliente: FormGroup
  formCheckIn: FormGroup
  dateIngreso: Date = new Date()
  dateEgreso: Date = new Date()



  constructor(private fc: FormBuilder, private fcheck: FormBuilder, private servCliente: ServclienteService, 
    private servhotel: ServhotelService, private router: Router) {

    this.formBuscarCliente = new FormGroup({
      apellidoForm: new FormControl('', [Validators.required]) 
    })

    this.formCheckIn = fcheck.group({
      numHabit: new FormControl('', [Validators.required]),
      cantHuespedes: new FormControl('', [Validators.required]),
    })

    this.visibleBuscar = false
    this.visibleListar = false
    this.visibleByError = false
    this.visibleCheckIn = false
  }

  ngOnInit(): void {
    this.visibleBuscar = true
  }

  buscarCliente() {
    if (this.formBuscarCliente.valid) {
      this.apellido = this.formBuscarCliente.get('apellido')?.value
      this.servCliente.findBySurname(this.apellido).subscribe(data => {
        this.clientes = data
        this.visibleListar = true
        this.visibleBuscar = false

      })
    } else {
      this.visibleByError = true
    }
  }

  checkIn(id: number) {
    this.visibleCheckIn = true
    this.visibleListar = false
    this.idCliente = id
  }

  Terminar() {
    if (this.formCheckIn.valid) {
      let habitacion = new Habitacion()
      habitacion.nroHabitacion = this.formCheckIn.get('numHabit')?.value
      habitacion.cantHuespedes = this.formCheckIn.get('cantHuespedes')?.value
      habitacion.fechaDeIngreso = this.dateIngreso
      habitacion.fechaDeEgreso = this.dateEgreso
      this.servhotel.reservar(habitacion, this.idCliente).subscribe(data => {
        if (data == null)
          this.visibleByError = true
        else {
          this.formCheckIn.reset()
          this.formBuscarCliente.reset()
          this.router.navigateByUrl('listarHabitaciones')
        }
        //this.returnMain()
      })
    } else
      this.visibleByError = true
  }


  returnMain() {
    this.router.navigateByUrl('/')
  }
}
