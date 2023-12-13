import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { MenuItem } from 'primeng/api';
import { ServclienteService } from '../../services/servcliente/servcliente.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServhotelService } from '../../services/servhotel/servhotel.service';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ButtonModule, DialogModule, PanelMenuModule, InputGroupModule, InputGroupAddonModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  items: MenuItem[];
  visible: boolean
  formCheckout: FormGroup
  nroHabit: number=0

  constructor(private fc: FormBuilder, private servhotel: ServhotelService, private router: Router){
    this.items=[];
    this.visible=false
    this.formCheckout = fc.group({
        numHabitacion: new FormControl('', [Validators.required])
    })
  }

  OpenWindow(){
    this.visible=true
  }
  CheckIn(){
    this.router.navigateByUrl('checkin')
  }

  CheckOut(){
    
    if(this.formCheckout.valid){
        this.nroHabit=this.formCheckout.get('numHabitacion')?.value
        this.servhotel.checkOut(this.nroHabit).subscribe(data=>{
            this.formCheckout.reset()
            this.router.navigateByUrl('listarHabitaciones')
        })
    }
  }

  ngOnInit() {
      this.items = [
          {
              label: 'Archivo',
              icon: 'pi pi-fw pi-file',
              items: [
                  {
                      label: 'Nuevo',
                      icon: 'pi pi-fw pi-plus',
                      items: [
                          {
                              label: 'Cliente',
                              icon: 'pi pi-user',
                              routerLink: 'addCliente'
                          },
                          {
                              label: 'Habitacion',
                              icon: 'pi pi-inbox',
                              routerLink: 'addHabitacion' 
                          }
                      ]
                  },
                  {
                      label: 'Borrar',
                      icon: 'pi pi-fw pi-trash',
                      items: [
                        {
                            label: 'Cliente',
                            icon: 'pi pi-user',
                            routerLink: 'deleteCliente'
                        },
                        {
                            label: 'Habitacion',
                            icon: 'pi pi-inbox',
                            routerLink: 'deleteHabitacion'
                        }
                    ]
                  },
                  { 
                      separator: true 
                  }
              ]
          },
          {
              label: 'Editar',
              icon: 'pi pi-fw pi-pencil',
              items: [
                  {
                      label: 'Cliente',
                      icon: 'pi pi-user',
                      routerLink: 'editCliente'
                  },
                  {
                      label: 'Habitacion',
                      icon: 'pi pi-inbox',
                      routerLink: 'editHabitacion'
                  },
              ]
          },
          {
              label: 'Eventos',
              icon: 'pi pi-fw pi-calendar',
              items: [
                  {
                      label: 'Listar',
                      icon: 'pi pi-align-justify',
                      items: [
                          {
                              label: 'Clientes',
                              icon: 'pi pi-user',
                              routerLink: 'listarClientes'
                          },
                          {
                              label: 'Habitaciones',
                              icon: 'pi pi-inbox',
                              routerLink: 'listarHabitaciones'
                          }
                      ]
                  },
                  {
                      label: 'Buscar',
                      icon: 'pi pi-search',
                      items: [
                          {
                              label: 'Cliente por apellido',
                              icon: 'pi pi-user',
                              routerLink: 'findCliente'
                          },
                          {
                            label: 'Habitacion por numero',
                            icon: 'pi pi-inbox',
                            routerLink: 'findHabitacion'
                        }
                      ]
                  }
              ]
          }
      ];
  }


}
