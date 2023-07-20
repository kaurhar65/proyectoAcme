import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {
  allRooms: Room[] = [
    {id: 1, name: "Sala 1", img:"https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg"},
    {id: 2, name: "Sala 2", img:"https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg"},
    {id: 3, name: "Sala 3", img:"https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg"},
    {id: 4, name: "Sala 4", img:"https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg"},
  ]

  

  constructor (private crudService: RequestService) {}

  ngOnInit(): void {
    
  }
}

class Room {
  id:number;
  name:string;
  img:string;

  constructor (id:number, name:string, img:string) {
    this.id = id;
    this.name = name;
    this.img = img;
  }
}
