import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
//import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HelloUserComponent } from './hello-user/hello-user.component';
import { AppRoutingModule } from './app-routing.module';
import { ReservasComponent } from './reservas/reservas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RoomdetailsComponent } from './roomdetails/roomdetails.component';
import { ReserveListComponent } from './reserve-list/reserve-list.component';
import { PopupComponent } from './pop-up/pop-up.component';
import { AdminCountryComponent } from './admin-country/admin-country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RequestService } from './services/request.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationInterceptorService } from './services/authentication-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    HomeComponent,
    NavbarComponent,
    ReservationComponent,
    LoginComponent,
    RoomdetailsComponent,
    HelloUserComponent,
    ReservasComponent,
    ReserveListComponent,
    PopupComponent,
    AdminCountryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
