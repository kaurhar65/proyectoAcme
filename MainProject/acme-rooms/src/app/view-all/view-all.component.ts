import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import {
  environment,
  apiControllers,
  apiUrls,
} from '../../environments/environment';
import { Room } from '../models/room';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent {

}
