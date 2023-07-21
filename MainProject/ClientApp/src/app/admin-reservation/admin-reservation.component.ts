import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css']
})
export class AdminReservationComponent {
  reservationId = 2
  roomId = 0
  userId = 1
  date = 'YYYY/MM/DD'
  startTime = '22: 22'
  endTime = '00:00'

  constructor(private requestService: RequestService) { }

  /*CREATE*/
  addReservation() { }

  getAllReservations() { }
  getReservationById() { }
  updateReservation() { }
  deleteReservation() { }
}
