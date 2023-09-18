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
import * as dayjs from 'dayjs';
import { ReservationExtendedDTO } from '../models/reservation-extended-dto';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css']
})
export class AdminReservationComponent {
 
  reservationRegistrationForm!: ReservationRegistrationForm;
  llistaReservas!: ReservationExtendedDTO[];

  countries: Country[] = [];
  cities: City[] = [];
  offices: Office[] = [];
  rooms: Room[] = [];
  userId!: string;
  reservas: (Reservation[]) = []
  reservation: (Reservation) = new Reservation()
  constructor(private requestService: RequestService) { }

  /*CREATE*/
  addReservation() {
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
    this.requestService

      .get(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.getReservationsByUserId}`,
        new HttpParams().append('userId', `${this.userId}`)
      )

      .subscribe({
        next: (fetchedReservations: ReservationExtendedDTO[]) => {
          const currentDate = dayjs(undefined, 'YYYY-MM-DD');

          this.llistaReservas = fetchedReservations
            .filter(
              (reservation) => {
                // alert(`${reservation.date} AND ${dayjs(reservation.date)} AND ${currentDate.toString()}`);
                return dayjs(reservation.date).isSame(currentDate, 'date') ||
                  dayjs(reservation.date).isAfter(currentDate, 'date')
              }
              // reservation.date === currentDate
            );
        },

        error: (err: Error) => {
          alert(err.message);
        },
      });
  }
  getReservationById(id: number) {
    this.requestService

      .get(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.getReservationById}`,
        new HttpParams().append('id', `${id}`)
      )

      .subscribe({
        next: (fetchedReservations: ReservationExtendedDTO[]) => {
          const currentDate = dayjs(undefined, 'YYYY-MM-DD');

          this.llistaReservas = fetchedReservations
            .filter(
              (reservation) => {
                // alert(`${reservation.date} AND ${dayjs(reservation.date)} AND ${currentDate.toString()}`);
                return dayjs(reservation.date).isSame(currentDate, 'date') ||
                  dayjs(reservation.date).isAfter(currentDate, 'date')
              }
              // reservation.date === currentDate
            );
        },

        error: (err: Error) => {
          alert(err.message);
        },
      });
  }
  updateReservation() { }
  deleteReservation() { }
}
