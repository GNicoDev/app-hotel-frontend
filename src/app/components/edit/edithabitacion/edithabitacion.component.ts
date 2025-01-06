import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ServhabitacionService } from '../../../services/servhabitacion/servhabitacion.service';
import { Router } from '@angular/router';
import { Room } from '../../../modells/room';

@Component({
  selector: 'app-edithabitacion',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputGroupModule, InputGroupAddonModule, ReactiveFormsModule],
  templateUrl: './edithabitacion.component.html',
  styleUrl: './edithabitacion.component.css'
})
export class EdithabitacionComponent {
  id: number = 0
  visibleBuscar: boolean
  visibleEditar: boolean
  visibleByError: boolean
  visibleSuccess: boolean
  formBuscarHabit: FormGroup
  formEditarHabit: FormGroup

  constructor(private fc: FormBuilder, private servHabit: ServhabitacionService, private router: Router) {
    this.formBuscarHabit = fc.group({
      id: new FormControl('', [Validators.required])
    })
    this.formEditarHabit = fc.group({
      numero: new FormControl('', [Validators.required]),
      tipoHab: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    })

    this.visibleBuscar = false
    this.visibleEditar = false
    this.visibleByError = false
    this.visibleSuccess = false
  }

  ngOnInit(): void {
    this.visibleBuscar = true
  }

  buscarHabitacion() {
    if (this.formBuscarHabit.valid) {
      let room = new Room()
      this.id = this.formBuscarHabit.get('id')?.value
      this.servHabit.findById(this.id).subscribe(data => {
        if (data != null) {
          room = data
          this.visibleEditar = true
          this.formEditarHabit.get('numero')?.patchValue(room.roomNumber)
          this.formEditarHabit.get('tipoHab')?.patchValue(room.roomType)
          this.formEditarHabit.get('precio')?.patchValue(room.pricePerNight)
        }else
          this.visibleByError=true
      })
    } else {
      this.visibleByError = true
    }
  }

  editarHabitacion() {

    if (this.formEditarHabit.valid) {
      let room = new Room()
      room.roomNumber = this.formEditarHabit.get('numero')?.value
      room.roomType = this.formEditarHabit.get('tipoHab')?.value
      room.pricePerNight = this.formEditarHabit.get('precio')?.value

      this.servHabit.editHabitacion(room, this.id).subscribe(data => {
        this.visibleSuccess = true
        this.formEditarHabit.reset()
        this.formBuscarHabit.reset()
        this.visibleSuccess = true
      })
    }
    else {
      this.visibleByError = true
    }

  }

  close() {
    this.router.navigateByUrl('/')
  }
}
