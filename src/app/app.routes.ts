import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateRoomComponent } from './components/rooms/create-room/create-room.component'; 
import { EditRoomComponent } from './components/rooms/edit-room/edit-room.component'; 

export const routes: Routes = [
    { path : '', component: HomeComponent},
    { path: 'create-room', component: CreateRoomComponent },
    { path: 'edit-room', component: EditRoomComponent },
];
