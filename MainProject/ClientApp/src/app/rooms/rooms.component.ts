import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms:any;

  constructor (private crudService: RequestService) {}

  ngOnInit(): void {
    this.crudService.get("http://localhost:5075/api/Room/GetAllRooms").subscribe(data => {
      console.table(data);
    })
  }
}
