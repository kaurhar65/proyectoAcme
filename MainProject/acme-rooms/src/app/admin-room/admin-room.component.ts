import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';
import { Room } from 'src/app/models/room';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css']
})
export class AdminRoomComponent {
  /*general */
  roomName = "xxxx"
  roomId = 1
  roomOfficeId = 16

  /*crud */
  rooms: (Room[]) = []
  oldRoom: (Room) = new Room()
  updatedRoom: (Room) = new Room()
  constructor(private requestService: RequestService) { }

  /*CREATE*/
  addRoom() {
    this.requestService.post(`${environment.apiUrl}${apiControllers.room}${apiUrls.room.createRoom}`,
      {
        "Name": this.roomName,
        "OfficeId": this.roomOfficeId
      })
      .subscribe({
        next() {
          alert(`You have successfully added the room.`);
        },
        error(err: Error) {
          alert(err.message)
        }
      });
  }
  getAllRooms() {
    this.requestService.get(`${environment.apiUrl}${apiControllers.room}${apiUrls.room.getAllRooms}`)
      .subscribe({
        next: (fetchedRooms: any[]) => {
          this.rooms = fetchedRooms.map((room: any): any => {
            return {
              id: room.id,
              name: room.name,
              officeId: room.officeId
            };
          });
        },
      });
  }
  getRoomById(id: number) {
    this.requestService.get(`${environment.apiUrl}${apiControllers.room}${apiUrls.room.getRoomById}`, new HttpParams().append("id", id))
      .subscribe({
        next: (fetchedRoom: any) => {
          this.rooms = [{
            id: fetchedRoom.id,
            name: fetchedRoom.name,
            officeId: fetchedRoom.officeId,
          }];
        },
      });
  }
  updateRoom(id: number) {
    /* getting old info*/
    this.requestService.get(`${environment.apiUrl}${apiControllers.room}${apiUrls.room.getRoomById}`, new HttpParams().append("id", id))
      .subscribe({
        next: (fetchedRoom: any) => {
          this.oldRoom = {
            id: fetchedRoom.id,
            name: fetchedRoom.name,
            officeId: fetchedRoom.officeId,
          };
        },
      });
    /*update database*/
    this.requestService
      .put(`${environment.apiUrl}${apiControllers.room}${apiUrls.room.updateRoom}`,
        {
          "Id": this.roomId,
          "Name": this.roomName,
          "OfficeId": this.roomOfficeId
        }).subscribe({
          next() {
          },
          error(err: Error) {
            alert(err.message)
          }
        });
    /*Get country with new info*/
    this.requestService.get(`${environment.apiUrl}${apiControllers.room}${apiUrls.room.getRoomById}`, new HttpParams().append("id", id))
      .subscribe({
        next: (fetchedRoom: any) => {
          this.updatedRoom = {
            id: fetchedRoom.id,
            name: fetchedRoom.name,
            officeId: fetchedRoom.officeId,
          };
        },
      });
  }
  deleteRoom() {
    alert(this.roomId);
    this.requestService
      .delete(`${environment.apiUrl}${apiControllers.room}${apiUrls.room.deleteRoom}`,
      new HttpParams().append('id', `${this.roomId.toString()}`))
      .subscribe({});
  }
}
