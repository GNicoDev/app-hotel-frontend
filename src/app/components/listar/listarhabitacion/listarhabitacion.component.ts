import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { ServhabitacionService } from '../../../services/servhabitacion/servhabitacion.service';
import { Room } from '../../../modells/room';
import { Router } from '@angular/router';
import { Cliente } from '../../../modells/cliente';
import { ServhotelService } from '../../../services/servhotel/servhotel.service';

@Component({
  selector: 'app-listarhabitacion',
  standalone: true,
  imports: [ButtonModule, DialogModule,TableModule],
  templateUrl: './listarhabitacion.component.html',
  styleUrl: './listarhabitacion.component.css'
})
export class ListarhabitacionComponent {
  visible: boolean = false;
  visibleCliente: boolean = false
  id: number = 0
  cliente: Cliente = new Cliente()
  rooms: Room[]=[]

  constructor (private servHabitacion: ServhabitacionService, private servhotel: ServhotelService, private router: Router){ }
 
  ngOnInit(): void {
    this.visible=true
    this.servHabitacion.getHabitaciones().subscribe(data=>{
      this.rooms=data
    })
  }

  mostrarClienteV(){
    this.visibleCliente = true
  }

  mostrarCliente(idHabitacion: number){
   
    this.servhotel.returnClientRoom(idHabitacion).subscribe(data=>{
      this.visibleCliente=true
      this.cliente = data
    })
    
  }

  close(){
    this.router.navigateByUrl('/')
  }
}
