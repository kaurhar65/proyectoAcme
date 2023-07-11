import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user = {
    name: "",
    email: "",
    password: ""
  }

  constructor(private router: Router) { } 
  goToLogin() {
    this.router.navigate(['login']);
  }

  registerSubmit() {
    alert(`${this.user.name}, ${this.user.email} and ${this.user.password}`)
  }

}
