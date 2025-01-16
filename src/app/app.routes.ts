import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateRoomComponent } from './components/rooms/create-room/create-room.component'; 
import { EditRoomComponent } from './components/rooms/edit-room/edit-room.component'; 
import { DeleteRoomComponent } from './components/rooms/delete-room/delete-room.component';
import { FindAllRoomsComponent } from './components/rooms/find/find-all-rooms/find-all-rooms.component';
import { FindRoomByNumberComponent } from './components/rooms/find/find-room-by-number/find-room-by-number.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';

export const routes: Routes = [
    { path : '', component: HomeComponent},
    { path: 'create-room', component: CreateRoomComponent },
    { path: 'edit-room', component: EditRoomComponent },
    { path: 'edit-room/:id', component: EditRoomComponent },
    { path: 'delete-room', component: DeleteRoomComponent },
    { path: 'delete-room/:id', component: DeleteRoomComponent },
    { path: 'rooms', component: FindAllRoomsComponent },
    { path: 'room-by-number', component: FindRoomByNumberComponent },

    { path: 'create-customer', component: CreateCustomerComponent },

    { path: 'checkin', component: CheckinComponent }, 
    { path: 'checkin/:roomId', component: CheckinComponent }, 
    
];
