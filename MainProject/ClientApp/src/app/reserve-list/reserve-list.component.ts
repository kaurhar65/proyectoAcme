import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RequestService } from '../services/request.service';
import { ReservationExtendedDTO } from '../models/reservation-extended-dto';

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
    const parentElement =
      this.reservationComponentRef.nativeElement.parentElement;
    if (parentElement) {
      parentElement.removeChild(this.reservationComponentRef.nativeElement);
    }
  }
}
