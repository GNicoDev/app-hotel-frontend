import { Routes } from '@angular/router';
import { ListarclienteComponent } from './components/listar/listarcliente/listarcliente.component';
import { ListarhabitacionComponent } from './components/listar/listarhabitacion/listarhabitacion.component';
import { AddclienteComponent } from './components/add/addcliente/addcliente.component';
import { AddhabitacionComponent } from './components/add/addhabitacion/addhabitacion.component';
import { EditclienteComponent } from './components/edit/editcliente/editcliente.component';
import { EdithabitacionComponent } from './components/edit/edithabitacion/edithabitacion.component';
import { DeleteclienteComponent } from './components/delete/deletecliente/deletecliente.component';
import { DeletehabitacionComponent } from './components/delete/deletehabitacion/deletehabitacion.component';
import { MainComponent } from './components/main/main.component';
import { AppComponent } from './app.component';
import { FindclienteComponent } from './components/find/findcliente/findcliente.component';
import { FindhabitacionComponent } from './components/find/findhabitacion/findhabitacion.component';
import { CheckinComponent } from './components/checkin/checkin.component';

export const routes: Routes = [
    {path : '', component: AppComponent},
    {path : 'listarClientes', component: ListarclienteComponent},
    {path : 'listarHabitaciones', component: ListarhabitacionComponent},
    {path : 'addCliente', component: AddclienteComponent},
    {path : 'addHabitacion', component: AddhabitacionComponent},
    {path : 'editCliente', component: EditclienteComponent},
    {path : 'editHabitacion', component: EdithabitacionComponent},
    {path : 'deleteCliente', component: DeleteclienteComponent},
    {path : 'deleteHabitacion', component: DeletehabitacionComponent},
    {path : 'findCliente', component: FindclienteComponent},
    {path : 'findHabitacion', component: FindhabitacionComponent},
    {path : 'checkin', component: CheckinComponent}
];
