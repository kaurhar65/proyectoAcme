import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importa los componentes que deseas enlazar a las rutas
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
<<<<<<< HEAD
import { ReservationComponent } from './reservation/reservation.component';
=======
import { MainpageComponent } from './mainpage/mainpage.component';
>>>>>>> main
//import { RegistroComponent } from './registro.component';

// Define las rutas
const routes: Routes = [
  { path: 'register', component: HomeComponent },
  { path: 'login', component: LoginComponent },
<<<<<<< HEAD
  { path: 'reservation', component: ReservationComponent },
  { path: '**', component: HomeComponent },
  { path: '', redirectTo: '/reservation', pathMatch: 'full' }
=======
  { path: 'home', component: MainpageComponent},
  { path:'**', component: HomeComponent },
  { path:'', redirectTo: '/register', pathMatch: 'full' }
>>>>>>> main
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
