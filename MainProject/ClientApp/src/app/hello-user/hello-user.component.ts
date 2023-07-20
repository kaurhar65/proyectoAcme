import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Observable } from 'node_modules/rxjs';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';
import { UserServiceService } from '../user.service.service';

@Component({
  selector: 'app-hello-user',
  templateUrl: './hello-user.component.html',
  styleUrls: ['./hello-user.component.css']
})
export class HelloUserComponent {
  userName: string = this.userService.getUserName();

  constructor(private requestService: RequestService, private userService: UserServiceService) { }

}
