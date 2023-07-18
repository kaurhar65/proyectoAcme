import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importa los componentes que deseas enlazar a las rutas
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RoomdetailsComponent } from './roomdetails/roomdetails.component';
import { HelloUserComponent } from 'src/app/hello-user/hello-user.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminCountryComponent } from './admin-country/admin-country.component';

// Define las rutas
const routes: Routes = [
  { path: 'hello-user', component: HelloUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MainpageComponent},
  { path: 'room-detail/:id', component: RoomdetailsComponent, title: 'Detalles sala'},
  { path: 'reservas', component: ReservasComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'adminProfile', component: AdminCountryComponent },
  { path: '**', component: HomeComponent },
  { path:'', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
