import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import {
  environment,
  apiControllers,
  apiUrls,
} from '../../environments/environment';
import { Room } from '../models/room';
import { RoomExtendedDTO } from '../models/room-extended-dto';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent {
  rooms: RoomExtendedDTO[] = new Array<RoomExtendedDTO>();
  roomImages: string[] = [
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/97/10/4f/97104f781e9d6ead6396784293c8eb77.jpg',
    'https://distritooficina.com/wp-content/uploads/2018/12/57I9386-Editar-1024x683.jpg',
    'https://deligrop.co.jp/assets/images/index/bnr_company.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
  ];
  roomDTOsByCountry: { [country: string]: RoomExtendedDTO[] } = {};
  countryKeys: string[] = [];

  constructor(private requestService: RequestService) {
    this.getAllRooms();    
  }


  getAllRooms(): void {
    this.requestService
      .get(
        `${environment.apiUrl}${apiControllers.room}${apiUrls.room.getAllRoomExtendedDTOs}`
      )
      .subscribe({
        next: (fetchedRoomDTOs: RoomExtendedDTO[]) => {
          this.rooms = fetchedRoomDTOs;
          //fetchedRoomDTOs.map((room: RoomExtendedDTO): any => {
          //return {
          //  id: room.id,
          //  name: room.name,
          //  capacity: room.capacity,
          //  officeName: room.officeName,
          //  cityName: room.cityName,
          //  countryName: room.countryName,
          //};
          //})
          this.roomDTOsByCountry = fetchedRoomDTOs.reduce(

            (accumulatorObject: { [country: string]: RoomExtendedDTO[] }, room: RoomExtendedDTO) => {
              accumulatorObject[room.countryName] = accumulatorObject[room.countryName]?.concat(room) ?? [room];
              return accumulatorObject;

            },

            {}

          );
          this.countryKeys = Object.keys(this.roomDTOsByCountry);
          alert(JSON.stringify(this.roomDTOsByCountry));
        },
      });
  }
}
