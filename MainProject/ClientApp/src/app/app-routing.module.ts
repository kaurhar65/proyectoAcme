import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importa los componentes que deseas enlazar a las rutas
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from './login/login.component';
import { HelloUserComponent } from 'src/app/hello-user/hello-user.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservationComponent } from './reservation/reservation.component';
//import { RegistroComponent } from './registro.component';

// Define las rutas
const routes: Routes = [
  { path: 'hello-user', component: HelloUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'reservation', component: ReservationComponent},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
