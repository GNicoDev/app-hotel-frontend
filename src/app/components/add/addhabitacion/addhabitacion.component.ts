import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ServhabitacionService } from '../../../services/servhabitacion/servhabitacion.service';
import { Router } from '@angular/router';
import { Habitacion } from '../../../modells/habitacion';

@Component({
  selector: 'app-addhabitacion',
  standalone: true,
  imports: [ButtonModule, DialogModule, DropdownModule, FormsModule, InputGroupModule, InputGroupAddonModule, ReactiveFormsModule],
  templateUrl: './addhabitacion.component.html',
  styleUrl: './addhabitacion.component.css'
})
export class AddhabitacionComponent {
  visible: boolean
  visibleByError: boolean
  visibleBySuccess: boolean
  formularioHabit: FormGroup
  tipoHabitaciones: string[] = ['Simple', 'Doble', 'Triple', 'Cuadruple', 'Quintuple']
  selectHabit : string = ""

  constructor(fh: FormBuilder, private servHabit: ServhabitacionService,
    private router: Router) {
    this.visible=false
    this.visibleByError=false
    this.visibleBySuccess=false
    this.formularioHabit = fh.group({
      numero: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.visible = true
  }

  crearHabitacion() {
      if (this.formularioHabit.valid) {
        let habitacion = new Habitacion()
        habitacion.nroHabitacion = this.formularioHabit.get('numero')?.value
        habitacion.tipoHabitacion = this.selectHabit
        habitacion.precio = this.formularioHabit.get('precio')?.value
        this.servHabit.saveHabitacion(habitacion).subscribe(data => {
          this.visibleBySuccess=true
          //this.router.navigateByUrl('/')
        })
        this.formularioHabit.reset()
      }
      else{
        this.visibleByError=true
      }
  }

  close(){
      this.router.navigateByUrl('/')
    }
}
