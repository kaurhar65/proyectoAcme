import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RequestService } from '../services/request.service';
@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.css']
})
export class ReserveListComponent {

  //las reservas

  constructor(private requestService: RequestService) { }

}
