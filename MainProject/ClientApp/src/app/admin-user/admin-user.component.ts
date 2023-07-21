import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent {
  userName = "xxxx"
  userId = 1
  userEmail = "user@user.user"
  userPassword = "User12345@"
  userPhone = 654321234
  userPic = 'insertar imageeeeen'
  constructor(private requestService: RequestService) { }

  /*CREATE*/
  addUser() { }

  getAllUsers() { }
  getUserById() { }
  updateUser() { }
  deleteUser() { }
}
