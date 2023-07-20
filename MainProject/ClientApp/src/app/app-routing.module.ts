import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

// Importa los componentes que deseas enlazar a las rutas
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HelloUserComponent } from 'src/app/hello-user/hello-user.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminCountryComponent } from './admin-country/admin-country.component';
import { AdminCityComponent } from './admin-city/admin-city.component';
import { RoomsComponent } from './rooms/rooms.component';

// Define las rutas
const routes: Routes = [
  { path: 'hello-user', component: HelloUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MainpageComponent},
  { path: 'reservas', component: ReservasComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'adminProfile', component: AdminCountryComponent },
  { path: 'adminProfile/cities', component: AdminCityComponent },
  { path: 'all-rooms', component: RoomsComponent },
  { path: '**', component: HomeComponent },
  { path:'', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true } as ExtraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
