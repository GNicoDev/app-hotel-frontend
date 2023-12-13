import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ServclienteService } from '../../../services/servcliente/servcliente.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-deletecliente',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputGroupModule, InputGroupAddonModule, ReactiveFormsModule],
  templateUrl: './deletecliente.component.html',
  styleUrl: './deletecliente.component.css'
})
export class DeleteclienteComponent implements OnInit {
  visible: boolean
  visibleByError: boolean
  visibleBySuccess: boolean = false
  id: number = 0

  formDeleteCliente: FormGroup

  constructor(fc:FormBuilder, private servCliente:ServclienteService, private router: Router){
    this.visible=false
    this.visibleByError=false
    this.formDeleteCliente= fc.group({
      id: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.visible = true
  }

  deleteCliente(){
    if(this.formDeleteCliente.valid){
      this.id = this.formDeleteCliente.get('id')?.value
      this.servCliente.deleteCliente(this.id).subscribe(data => {
        if (data) {
          this.formDeleteCliente.reset()
          this.visibleBySuccess=true
        }else{
          this.visibleByError=true
        }
      })
    }
    else{
      this.visibleByError=true
    }
  }

  close(){
    this.router.navigateByUrl('/')
  }
}
