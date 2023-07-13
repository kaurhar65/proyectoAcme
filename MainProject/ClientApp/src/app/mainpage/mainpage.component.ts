import { Component } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})

export class MainpageComponent {
  rooms = this.getRooms();

  getRooms() {
    let rooms = [
      {id:1, name:"La gran room", img:"https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg"},
      {id:2, name:"La mediana room", img:"https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg"},
      {id:3, name:"La pequeña room", img:"https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg"},
      {id:4, name:"Otra room", img:"https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg"},
      {id:5, name:"Y otra más", img:"https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg"}
  ];
    return rooms;
  }


  goToDetails(id:number) {
    alert(`Va a los detalles de ${id}`);
  }
}
