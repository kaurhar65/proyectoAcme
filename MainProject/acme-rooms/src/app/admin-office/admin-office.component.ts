import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';
import { Office } from 'src/app/models/office';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-admin-office',
  templateUrl: './admin-office.component.html',
  styleUrls: ['./admin-office.component.css']
})
export class AdminOfficeComponent {
  constructor(private requestService: RequestService) { }
  /*general*/
  officeName = "xx"
  officeId = 16
  officeCityId = 32
  /*crud */
  offices: (Office[]) = []
  oldOffice: (Office) = new Office()

  addOffice() {
    this.requestService.post(`${environment.apiUrl}${apiControllers.office}${apiUrls.office.createOffice}`,
      {
        "Name": this.officeName,
        "CityId": this.officeCityId
      })
      .subscribe({
        next() {
          alert(`You have successfully added the office.`);
        },
        error(err: Error) {
          alert(err.message)
        }
      });
  }
  getAllOffices() {
    this.requestService.get(`${environment.apiUrl}${apiControllers.office}${apiUrls.office.getAllOffices}`)
      .subscribe({
        next: (fetchedOffices: any[]) => {
          this.offices = fetchedOffices.map((office: any): any => {
            return {
              id: office.id,
              name: office.name,
              cityId: office.cityId
            };
          });
        },
      });    
  }
  getOfficeById(id: number) {
    this.requestService.get(`${environment.apiUrl}${apiControllers.office}${apiUrls.office.getOfficeById}`, new HttpParams().append("id", id))
      .subscribe({
        next: (fetchedOffice: any) => {
          this.offices = [{
            id: fetchedOffice.id,
            name: fetchedOffice.name,
            cityId: fetchedOffice.cityId,
          }];
        },
      });
  }
  updateOffice(id: number) {
    /* getting old info*/
    this.requestService
      .get(`${environment.apiUrl}${apiControllers.office}${apiUrls.office.getOfficeById}`, new HttpParams().append("id", id))
      .subscribe({
        next: (fetchedOffice: any) => {
          this.oldOffice = {
            id: fetchedOffice.id,
            name: fetchedOffice.name,
            cityId: fetchedOffice.cityId,
          };
        },
      });
    /*update database*/
    this.requestService
      .put(`${environment.apiUrl}${apiControllers.office}${apiUrls.office.updateOffice}`,
        {
          "Id": this.officeId,
          "Name": this.officeName,
          "CityId": this.officeCityId
        }).subscribe({
          next() {
          },
          error(err: Error) {
            alert(err.message)
          }
        });
    /*Get country with new info*/
    this.getOfficeById(this.officeId)
  }
  deleteOffice() {
    alert(this.officeId);
    this.requestService
      .delete(`${environment.apiUrl}${apiControllers.office}${apiUrls.office.deleteOffice}`,
      new HttpParams().append('id', `${this.officeId.toString()}`))
      .subscribe({});
  }
}
