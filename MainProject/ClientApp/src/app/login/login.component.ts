import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    name: "",
    email: "",
    password: ""
  }
  constructor(private router: Router) { } 
  goToRegister() {
    this.router.navigate(['register']);
  }

  login() {
    alert(`${this.user.name}, ${this.user.email} and ${this.user.password}`)
  }
  
}
