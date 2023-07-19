import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit{
  isOpen:boolean = false;
  @Input() titulo:string = "";
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  cities: City[] = [
    {
      name: "Australia",
      rooms: [
        "ACME Sydney", "ACME Melbourne"
      ]
    },
    {
      name: "Japan",
      rooms: [
        "ACME Tokyo"
      ]
    },
    {
      name: "Canada",
      rooms: [
        "ACME Vancouver", "ACME Toronto"
      ]
    }
  ];

  isHomePage(titulo:string) {
    if (titulo == "Find your country") {
      return true;
    }
    return false;
  }

  showButton(titulo:string) {
    if (titulo.includes("Hello")||titulo.includes("Make a")) {
      return false
    }
    
    
    return true;
  }

  isUserPage(titulo:string) {
    if (titulo.includes("Hello")) {
      return true;
    }
    return false;
  }

  changeDisplay() {
    this.isOpen = !this.isOpen;
    if (this.isOpen == true) {
      document.getElementById("homeTitle")?.classList.add("opened");
      document.getElementById("homeTitle")?.classList.add("underline-animation-black");
    } else {
      document.getElementById("homeTitle")?.classList.remove("opened");
      document.getElementById("homeTitle")?.classList.remove("underline-animation-black");
      
      
    }
  }

  ngOnInit(): void {
  }
  goToLogin() {
    this.router.navigate(['login']);
  }
/* FUNCIONES BACKEND */
  salir() {
    this.authenticationService.logout().subscribe({ next() { } }),
    this.goToLogin()
  }
}

export class City {
  name: string;
  rooms: string[];

  constructor (name:string, rooms:string[]) {
    this.name = name;
    this.rooms = rooms;
  }
}
