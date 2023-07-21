import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css']
})
export class AdminRoomComponent {
  roomName = "xxxx"
  roomId = 1
  roomOffice = "Barceloneta"
  constructor(private requestService: RequestService) { }

  /*CREATE*/
  addRoom() { }

  getAllRooms() { }
  getRoomById() { }
  updateRoom() { }
  deleteRoom() { }
}
