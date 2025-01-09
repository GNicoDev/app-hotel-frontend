import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateRoomComponent } from './rooms/create-room/create-room.component';

export const routes: Routes = [
    { path : '', component: HomeComponent},
    { path: 'create-room', component: CreateRoomComponent },
];
