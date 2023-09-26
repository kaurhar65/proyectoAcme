import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'node_modules/rxjs';
import {
  environment,
  apiControllers,
  apiUrls,
} from 'src/environments/environment';
import { UserServiceService } from 'src/app/user.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    //userName: "",
    password: '',
  };
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}
  goToRegister() {
    this.router.navigate(['register']);
  }

  goToHome() {
    if (localStorage.getItem('claims')?.includes("Admin")) { 
    //if ("Admin" in localStorage.getItem('claims') as String[]) {
      this.router.navigate(['adminProfile']);
    } else {
      this.router.navigate(['home']);
    }
  }

  login() {
    //alert(`${this.user.userName} and ${this.user.password}`),
    this.authenticationService
      .login(this.user.email, this.user.password)
      .subscribe({
        next: (response: any) => {
          //alert(JSON.stringify(response));
          if (response['token']) {
            alert(`You have successfully logged in as ${this.user.email}.`);
            this.goToHome();
          }
        },
        error(err: Error) {
          alert(err.message);
        },
      });
  }
}
