import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ServclienteService } from '../../../services/servcliente/servcliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../../modells/cliente';
import cli from '@angular/cli';

@Component({
  selector: 'app-editcliente',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputGroupAddonModule, InputGroupModule,
    ReactiveFormsModule],
  templateUrl: './editcliente.component.html',
  styleUrl: './editcliente.component.css'
})
export class EditclienteComponent implements OnInit {
  id: number = 0
  visibleBuscar: boolean
  visibleEditar: boolean
  visibleByError: boolean
  visibleSuccess: boolean
  formBuscarCliente: FormGroup
  formEditarCliente: FormGroup

  constructor(private fc: FormBuilder, private servCliente: ServclienteService, private router: Router) {
    this.formBuscarCliente = fc.group({
      id: new FormControl('', [Validators.required])
    })
    this.formEditarCliente = fc.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required])
    })

    this.visibleBuscar = false
    this.visibleEditar = false
    this.visibleByError = false
    this.visibleSuccess = false
  }

  ngOnInit(): void {
    this.visibleBuscar = true
  }

  buscarCliente() {
    if (this.formBuscarCliente.valid) {
      let cliente = new Cliente()
      this.id = this.id = this.formBuscarCliente.get('id')?.value
      this.servCliente.findById(this.id).subscribe(data => {
        cliente = data
        this.visibleEditar = true
        this.formEditarCliente.get('nombre')?.patchValue(cliente.name)
        this.formEditarCliente.get('apellido')?.patchValue(cliente.lastName)
        this.formEditarCliente.get('dni')?.patchValue(cliente.passport)
        this.formEditarCliente.get('telefono')?.patchValue(cliente.phone)

      })
    }else {
      this.visibleByError = true
    }
  }

  editarCliente() {
    
    if (this.formEditarCliente.valid) {
      let cliente = new Cliente()
      cliente.name = this.formEditarCliente.get('nombre')?.value
      cliente.lastName = this.formEditarCliente.get('apellido')?.value
      cliente.passport = this.formEditarCliente.get('dni')?.value
      cliente.phone = this.formEditarCliente.get('telefono')?.value
      this.servCliente.editCliente(cliente, this.id).subscribe(data => {
        this.visibleSuccess = true
        this.formEditarCliente.reset()
        this.formBuscarCliente.reset()
      })
    }
    else{
      this.visibleByError=true
    }

  }

  close() {
    this.router.navigateByUrl('/')
  }
}
