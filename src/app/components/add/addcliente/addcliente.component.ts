import { Component, OnInit } from '@angular/core';
import { ServclienteService } from '../../../services/servcliente/servcliente.service';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../../modells/cliente';


@Component({
  selector: 'app-addcliente',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputGroupModule, InputGroupAddonModule,
    ReactiveFormsModule, ToastModule],
  templateUrl: './addcliente.component.html',
  styleUrl: './addcliente.component.css'
})
export class AddclienteComponent implements OnInit {

  visible: boolean
  visibleByError: boolean
  visibleBySuccess: boolean
  formularioCliente: FormGroup

  constructor(fc: FormBuilder, private servCliente: ServclienteService,
    private router: Router) {
    this.visible=false
    this.visibleByError=false
    this.visibleBySuccess=false
    this.formularioCliente = fc.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.visible = true
  }

  crearCliente() {
      if (this.formularioCliente.valid) {
        let cliente = new Cliente()
        cliente.name = this.formularioCliente.get('nombre')?.value
        cliente.lastName = this.formularioCliente.get('apellido')?.value
        cliente.passport = this.formularioCliente.get('dni')?.value
        cliente.phone = this.formularioCliente.get('telefono')?.value
        this.servCliente.saveCliente(cliente).subscribe(data => {
          this.visibleBySuccess=true
        })
        this.formularioCliente.reset()
      }
      else{
        this.visibleByError=true
      }
  }

  close(){
      this.router.navigateByUrl('/')
    }
}
