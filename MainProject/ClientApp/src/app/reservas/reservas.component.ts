import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { FormsModule } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from '../../environments/environment';
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {
  reserva = {
    country: 1,
    office: 1,
    room: 1,
    day: dayjs().get('year') + "-" + (dayjs().get('month') + 1 as number) + "-" + dayjs().get('date'),
    startTime: dayjs().add(60, 'minutes').get('hour') + ":" + dayjs().get('minutes'),
    endTime: dayjs().add(120, 'minutes').get('hour') + ":" + dayjs().get('minutes')
  }
  enviarReserva() {
    alert(`${this.reserva.country} ${this.reserva.office} ${this.reserva.room} ${this.reserva.day} ${this.reserva.startTime} and ${this.reserva.endTime}`)
    this.crearReserva()
  }
  constructor(private requestService: RequestService) { }
  crearReserva() {
    const url = apiUrls.reservation.createReservation;
    let result: object;
    this.requestService.post(url, this.reserva)
      .subscribe({
        next(response: object) {
          result = response;
          alert('aaa')
          /*alert(JSON.stringify(result))*/
        },
        error(err: Error) {
          alert(err.message)
        }
      });
  }
}
