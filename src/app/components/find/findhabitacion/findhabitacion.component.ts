import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { ServhabitacionService } from '../../../services/servhabitacion/servhabitacion.service';
import { Habitacion } from '../../../modells/habitacion';
@Component({
  selector: 'app-findhabitacion',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputGroupModule, InputGroupAddonModule, ReactiveFormsModule],
  templateUrl: './findhabitacion.component.html',
  styleUrl: './findhabitacion.component.css'
})
export class FindhabitacionComponent {
  visibleBuscar: boolean
  visibleMostrar : boolean
  visibleByError: boolean
  formBuscarHabitacion: FormGroup
  numHabitacion: number = 0
  habitacion: Habitacion = new Habitacion()


  constructor(private fh: FormBuilder, private servHabit: ServhabitacionService ){
    this.visibleBuscar = true
    this.visibleMostrar= false
    this.visibleByError= false
    this.formBuscarHabitacion = fh.group({
      numHabit: new FormControl('', [Validators.required])
    })
  }

  buscarHabitacion() {
    if (this.formBuscarHabitacion.valid) {
      this.numHabitacion = this.formBuscarHabitacion.get('numHabit')?.value
      this.servHabit.findByNumber(this.numHabitacion).subscribe(data => {
      this.habitacion = data
        this.visibleMostrar = true
        this.visibleBuscar=false
      })
    }else {
      this.visibleByError = true
    }
  }
}
