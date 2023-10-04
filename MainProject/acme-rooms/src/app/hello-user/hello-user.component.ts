import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Observable } from 'node_modules/rxjs';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';
import { UserServiceService } from 'src/app/user.service.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-hello-user',
  templateUrl: './hello-user.component.html',
  styleUrls: ['./hello-user.component.css']
})
export class HelloUserComponent {
  userName: string = "";
  email: string = "";
  phone: string = "hay que revisar esto";

  currentPassword: string = "";

  newPassword: string = "";
  confirmPassword: string = "";

  currentEmail: string = "";
  newEmail: string = "";
  confirmEmail: string = "";

  newPhone: string = "";

  constructor(private requestService: RequestService, private userServiceService: UserServiceService) {
    this.userName = localStorage.getItem('userName')!;
    this.email = localStorage.getItem('email')!;
    /*this.phone = localStorage.getItem('phoneNumber')!;*/
  }

  public mensaje() {
    alert("nice");
  }

  public modifyUser(): void {
    /*update database*/
    alert(`${JSON.stringify(this.userName)}`);
    this.requestService
      .put(
        `${environment.apiUrl}${apiControllers.user}${apiUrls.user.updateUser}`,
        {
          UserName: this.userName,
          Email: this.email,
          Phone: "+1(555)125-4567"
        }
      )
      .subscribe({
        next: (response) => {          
          alert(`${JSON.stringify(response)}`);
          this.userServiceService.setUserName(this.email);

        },

        error: (err: Error) => {
          alert(`${JSON.stringify(err)}`);
        },
      });
  }

  public changePassword() {
    alert("holi");
    this.requestService
      .put(
        `${environment.apiUrl}${apiControllers.user}${apiUrls.user.updatePassword}`,
        {
          id: localStorage.getItem('userId'),
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          newPasswordConfirmation: this.confirmPassword
        }
      )
      .subscribe({
        next: (response) => {
          alert(`${JSON.stringify(response)}`);

        },

        error: (err: Error) => {
          alert(`${JSON.stringify(err)}`);
        },
      });
  }
  public updatePhone() {
    alert("update Phone");
  }
}
