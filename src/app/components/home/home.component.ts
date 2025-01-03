import {ChangeDetectionStrategy, Component } from '@angular/core';

import {provideNativeDateAdapter} from '@angular/material/core';


import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuModule } from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-main',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, 
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
}
