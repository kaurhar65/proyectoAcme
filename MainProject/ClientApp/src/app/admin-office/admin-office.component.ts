import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';

@Component({
  selector: 'app-admin-office',
  templateUrl: './admin-office.component.html',
  styleUrls: ['./admin-office.component.css']
})
export class AdminOfficeComponent {
  constructor(private requestService: RequestService) { }
  officeName = "xx"
  officeId = 2
  officeCity = "Madrid"

  addOffice() {
    alert(this.officeName);
    let self = this;
    this.requestService.post(`${environment.apiUrl}${apiControllers.office}${apiUrls.office.createOffice}`,
      {
        "Name": this.officeName
      })
      .subscribe({
        next(response: any) {
          alert(JSON.stringify(response))
          if (response["body"]) {
            alert(`You have successfully added the office.`);
          }
        },
        error(err: Error) {
          alert(err.message)
        }
      });
  }
  getOfficeById() {
    alert('falta implementar!');
  }
  getAllOffices() {
    alert('falta implementar!');
    
  }
  updateOffice() { }
  deleteOffice() { }
}
