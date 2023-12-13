import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { ServclienteService } from '../../../services/servcliente/servcliente.service';
import { Cliente } from '../../../modells/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listarcliente',
  standalone: true,
  imports: [ButtonModule, DialogModule, TableModule],
  templateUrl: './listarcliente.component.html',
  styleUrl: './listarcliente.component.css'
})
export class ListarclienteComponent implements OnInit{
  visible: boolean = false;
  clientes: Cliente[] = [];

  constructor (private servCliente: ServclienteService, private router: Router){ }
  ngOnInit(): void {
    this.visible=true
    this.servCliente.getClientes().subscribe((data: Cliente[])=>{
      this.clientes=data
      this.returnMain()
    })
  }

  returnMain(){
    if(!this.visible){
      this.router.navigateByUrl('/')
    }
    else{
      this.ngOnInit()
    }

  }
}
