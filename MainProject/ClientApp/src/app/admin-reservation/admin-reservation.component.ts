import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';
import { Reservation } from 'src/app/models/reservation';
import { HttpParams } from '@angular/common/http';
import { ReservationRegistrationForm } from '../models/reservation-registration-form';
import { Country } from '../models/country';
import { City } from '../models/city';
import { Office } from '../models/office';
import { Room } from '../models/room';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css']
})
export class AdminReservationComponent {
  
  /*reservationId = 2
  reservationRoomId = 0
  reservationUserId = ""
  reservationDate = "2023-11-24"
  reservationStartTime = "10:30"
  reservationEndTime = "12:00"*/

  
/*    {
    "id": reservationId,
    "date": this.reservationDate,
    "startTime": this.reservationStartTime,
    "endTime": this.reservationEndTime,
    "roomId": this.reservationRoomId,
    "userId": this.reservationUserId
  }*/
  
  /*
  reservas: (Reservation[]) = []
  reserva: (Reservation) = new Reservation() */

  reservationRegistrationForm!: ReservationRegistrationForm;
  /*selection: {
    country: 'any' | number;
    office: 'any' | number;
    room: 'any' | number;
  } = {
      country: 'any',
      office: 'any',
      room: 'any',
    };*/
  countries: Country[] = [];
  cities: City[] = [];
  offices: Office[] = [];
  rooms: Room[] = [];
  userId!: number;
  reservas: (Reservation[]) = []
  reservation: (Reservation) = new Reservation()
  constructor(private requestService: RequestService) { }

  /*CREATE*/
  addReservation() {
    alert(JSON.stringify(this.reservation))
    this.requestService
      .post(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.createReservation}`,
        {
          "date": this.reservation.date,
          "startTime": this.reservation.startTime,
          "endTime": this.reservation.endTime,
          "roomId": this.reservation.roomId,
          "userId": this.reservation.userId
        }
      )
      .subscribe({
        next: (response: object) => {
          alert(JSON.stringify(response));
        },
        error: (err: Error) => {
          alert(err.message);
        },
      });
  }

  getAllReservations() {
    alert(JSON.stringify(this.reservas));
    this.requestService.get(`${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.getAllReservations}`)
      .subscribe({
        next: (fetchedReservations: Reservation[]) => {
          alert(JSON.stringify(fetchedReservations));
          this.reservas = fetchedReservations
        },
      });    
  }
  getReservationById(id: number) {
    this.requestService
      .get(`${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.getReservationById}`,
        new HttpParams().append('id', id))
      .subscribe({
        next: (fetchedReservations: any) => {
          alert(JSON.stringify(fetchedReservations))
          this.reservas = fetchedReservations
        },
        error: (err: Error) => {
          alert(err.message)
        }
      });
  }
  updateReservation() { }
  deleteReservation() { }
}
