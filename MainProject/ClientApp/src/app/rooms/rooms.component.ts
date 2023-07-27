import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { apiControllers, apiUrls, environment } from 'src/environments/environment';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {

  allRooms: Room[]= [];
  constructor (private requestService: RequestService) {

  }

  
  ngOnInit(): void {
    this.requestService.get(`${environment.apiUrl}${apiControllers.room}${apiUrls.room.getAllRooms}`)
    .subscribe({next(response: any) {
      let allRooms: Room[] = [];
      response.forEach((room: any) => {
        let newRoom = new Room(room.id,room.name, room.officeId);
        allRooms.push(newRoom);
      });
    }, error(err: Error){alert(`${err.name}: ${err.message}`)}})
  }
}

class Room {
  id:number;
  name:string;
  officeId:number;

  constructor (id:number, name:string, officeId:number) {
    this.id = id;
    this.name = name;
    this.officeId = officeId;
  }
}
