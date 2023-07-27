import { Component, ElementRef, ViewChild } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment, apiControllers, apiUrls } from '../../environments/environment';
import { Reservation } from 'src/app/models/reservation';
import { ReservationExtendedDTO } from '../models/reservation-extended-dto';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
 

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  llistaReservas!: ReservationExtendedDTO[];
  currentUserId: string = "";

 

  constructor(private authenticationService: AuthenticationService, private requestService: RequestService) {
    this.idUsuario();
    this.getReservas();
  }

 

  ngOnInit() {
    this.getReservas();
  }

 

  idUsuario() {
    this.currentUserId = localStorage.getItem('userId')!;
  }//idUsuario

 

  getReservas() {
    this.requestService
      .get(`${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.getReservationsByUserId}`,
      new HttpParams().append('userId', `${this.currentUserId}`))
      .subscribe({
        next: (fetchedReservations: ReservationExtendedDTO[]) => {
          this.llistaReservas = fetchedReservations
        },
        error: (err: Error) => {
          alert(err.message)
        }
      });
  }
}