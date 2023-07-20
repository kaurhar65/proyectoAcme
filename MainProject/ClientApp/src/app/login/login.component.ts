import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'node_modules/rxjs';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: "",
    //userName: "",
    password: ""
  }
  constructor(private router: Router, private authenticationService: AuthenticationService) { } 
  goToRegister() {
    this.router.navigate(['register']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  login() {
    let self = this;
    //alert(`${this.user.userName} and ${this.user.password}`),
      this.authenticationService.login(this.user.email, this.user.password)
        .subscribe({
          next(response: any) {
            //alert(JSON.stringify(response));
            if (response["token"]) {
              alert(`You have successfully logged in as ${self.user.email}.`);
              self.goToHome();
            }
          },
          error(err: Error) {
            alert(err.message)
          }
        });
  };
  
}
