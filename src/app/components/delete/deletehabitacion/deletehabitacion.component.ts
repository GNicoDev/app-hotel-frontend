import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServhabitacionService } from '../../../services/servhabitacion/servhabitacion.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-deletehabitacion',
  standalone: true,
  imports: [ButtonModule, DialogModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './deletehabitacion.component.html',
  styleUrl: './deletehabitacion.component.css'
})
export class DeletehabitacionComponent {
  visible: boolean
  visibleByError: boolean
  visibleBySuccess: boolean = false
  id: number = 0

  formDeleteHabit: FormGroup

  constructor(fh: FormBuilder, private servHabit: ServhabitacionService, private router: Router) {
    this.visible = false
    this.visibleByError = false
    this.formDeleteHabit = fh.group({
      id: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.visible = true
  }

  deleteHabitacion() {
    if (this.formDeleteHabit.valid) {
      this.id = this.formDeleteHabit.get('id')?.value
      this.servHabit.deleteHabitacion(this.id).subscribe(data => {
        if (data) {
          this.formDeleteHabit.reset()
          this.visibleBySuccess = true
        }else{
          this.visibleByError=true
        }
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
