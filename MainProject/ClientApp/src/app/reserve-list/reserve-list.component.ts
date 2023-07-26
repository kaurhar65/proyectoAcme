import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RequestService } from '../services/request.service';
import { ReservationExtendedDTO } from '../models/reservation-extended-dto';

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.css']
})
export class ReserveListComponent {

  //las reservas
  @Input()
  public reservation: ReservationExtendedDTO = new ReservationExtendedDTO();

  constructor(private requestService: RequestService) { }

}
