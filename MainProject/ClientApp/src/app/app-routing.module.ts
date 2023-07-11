import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importa los componentes que deseas enlazar a las rutas
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
//import { RegistroComponent } from './registro.component';

// Define las rutas
const routes: Routes = [
  { path: 'register', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path:'**', component: HomeComponent },
  { path:'', redirectTo: '/register', pathMatch: 'full' }
  //{ path: 'registro', component: RegistroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
