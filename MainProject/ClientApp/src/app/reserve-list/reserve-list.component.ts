import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RequestService } from '../services/request.service';
import { ReservationExtendedDTO } from '../models/reservation-extended-dto';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.css'],
})
export class ReserveListComponent {
  @ViewChild('reservationComponent', { static: true })
  reservationComponentRef!: ElementRef;
  //las reservas
  @Input()
  public reservation: ReservationExtendedDTO = new ReservationExtendedDTO();

  constructor(private requestService: RequestService) {}

  onDeleteClick() {
    alert(`${this.reservation.id}`);
    this.eliminarComponente();
    this.eliminarReserva(this.reservation.id);
  }

  eliminarComponente() {
    const parentElement =
      this.reservationComponentRef.nativeElement.parentElement;
    if (parentElement) {
      parentElement.removeChild(this.reservationComponentRef.nativeElement);
    }
  }

  eliminarReserva(id: number) {
    this.requestService
      .delete(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.deleteReservation}`,
        new HttpParams().append('id', id))
      //   {
      //     id: this.reservation.id,
      //   }
      // )
      .subscribe({
        next: (response) => {
          alert(`Eliminado correctamente. ${JSON.stringify(response)}`);
        }
      });
  }
}
