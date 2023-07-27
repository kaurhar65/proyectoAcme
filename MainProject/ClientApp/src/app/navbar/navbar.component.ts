import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from '../services/request.service';
import { apiControllers, apiUrls, environment } from 'src/environments/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;
  @Input() titulo: string = '';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private crudService: RequestService
  ) {}

  cities: City[] = [];

  isHomePage(titulo: string) {
    if (titulo == 'Find your country') {
      return true;
    }
    return false;
  }

  showButton(titulo: string) {
    if (titulo.includes('Hello') || titulo.includes('Make a') || titulo.includes('You are in')) {
      return false;
    }

    return true;
  }

  isUserPage(titulo: string) {
    if (titulo.includes('Hello')) {
      return true;
    }
    return false;
  }
  showReservationsButton(titulo: string) {
    if (titulo.includes('You are in')) {
      return false;
    }
    return true;
  }

  changeDisplay() {
    this.isOpen = !this.isOpen;
    if (this.isOpen == true) {
      document.getElementById('homeTitle')?.classList.add('opened');
      document
        .getElementById('homeTitle')
        ?.classList.add('underline-animation-black');
    } else {
      document.getElementById('homeTitle')?.classList.remove('opened');
      document
        .getElementById('homeTitle')
        ?.classList.remove('underline-animation-black');
    }
  }

<<<<<<< HEAD
  ngOnInit(): void {
    this.crudService.get(`${environment.apiUrl}${apiControllers.country}${apiUrls.country.getAllCountries}`)
      .subscribe({next: (response:any) => {

      }, error: (error: Error) => {alert(`${error.name.toUpperCase()}: ${error.message}`)}
    });
  }
=======

  ngOnInit(): void {}
>>>>>>> main
  
  goToLogin() {
    this.router.navigate(['login']);
  }
  /* FUNCIONES BACKEND */
  salir() {
    this.authenticationService.logout();
    this.goToLogin();
  }
}

export class City {
  id:number;
  name: string;
  rooms: string[];

  constructor(id:number, name: string, rooms: string[]) {
    this.id = id;
    this.name = name;
    this.rooms = rooms;
  }
}
