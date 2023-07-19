import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {
  reserva = {
    country: "any",
    office: "any",
    room: "any",
    day: dayjs().get('year') + "-" + (dayjs().get('month') + 1 as number) + "-" + dayjs().get('date'),
    startTime: dayjs().add(60, 'minutes').get('hour') + ":" + dayjs().get('minutes'),
    endTime: dayjs().add(120, 'minutes').get('hour') + ":" + dayjs().get('minutes')
  }
  enviarReserva() {
    alert(`${this.reserva.country} ${this.reserva.office} ${this.reserva.room} ${this.reserva.day} ${this.reserva.startTime} and ${this.reserva.endTime}`)
  }
}
