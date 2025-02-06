import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateRoomComponent } from './components/rooms/create-room/create-room.component'; 
import { EditRoomComponent } from './components/rooms/edit-room/edit-room.component'; 
import { DeleteRoomComponent } from './components/rooms/delete-room/delete-room.component';
import { FindAllRoomsComponent } from './components/rooms/find/find-all-rooms/find-all-rooms.component';
import { FindRoomByNumberComponent } from './components/rooms/find/find-room-by-number/find-room-by-number.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';
import { FindAllCustomerComponent } from './components/customer/find/find-all-customer/find-all-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { DeleteCustomerComponent } from './components/customer/delete-customer/delete-customer.component';
import { FindCustomerBypassportComponent } from './components/customer/find/find-customer-bypassport/find-customer-bypassport.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'create-room', component: CreateRoomComponent },
    { path: 'edit-room', component: EditRoomComponent },
    { path: 'edit-room/:id', component: EditRoomComponent },
    { path: 'delete-room', component: DeleteRoomComponent },
    { path: 'delete-room/:id', component: DeleteRoomComponent },
    { path: 'rooms', component: FindAllRoomsComponent },
    { path: 'room-by-number', component: FindRoomByNumberComponent },

    { path: 'customers', component: FindAllCustomerComponent },
    { path: 'create-customer', component: CreateCustomerComponent },
    { path: 'edit-customer', component: EditCustomerComponent },
    { path: 'edit-customer/:id', component: EditCustomerComponent },
    { path: 'delete-customer', component: DeleteCustomerComponent },
    { path: 'delete-customer/:id', component: DeleteCustomerComponent },
    { path: 'customer-by-passport', component: FindCustomerBypassportComponent },

    { path: 'checkin', component: CheckinComponent }, 
    { path: 'checkin/:roomId', component: CheckinComponent }, 

    { path: 'login', component: LoginComponent },
   // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a la página de login por defecto
];
