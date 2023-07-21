import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';

@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.component.html',
  styleUrls: ['./admin-country.component.css'],
})
export class AdminCountryComponent {
  constructor(private requestService: RequestService) { }
  countryName = "xx"
  countryId = 12

  addCountry() {
    alert(this.countryName);
    let self = this;
    this.requestService.post(`${environment.apiUrl}${apiControllers.country}${apiUrls.country.createCountry}`,
      {
        "Name": this.countryName
      })
      .subscribe({
        next(response: any) {
          alert(JSON.stringify(response))
          if (response["body"]) {
            alert(`You have successfully added the country.`);
          }
        },
        error(err: Error) {
          alert(err.message)
        }
      });
  }
  getCountryById() {
    alert(this.countryId);
    let self = this;
    this.requestService.get(`${environment.apiUrl}${apiControllers.country}${apiUrls.country.getCountryById} ${this.countryId}`)
      .subscribe({
        next(response: any) {
          alert(JSON.stringify(response))
          if (response["body"]) {
            alert(`MOSTRARRR COUNTRIES`);
          }
        },
        error(err: Error) {
          alert(err.message)
        }
      });
  }
  getAllCountries() {
    alert(this.countryId);
    let self = this;
    this.requestService.get(`${environment.apiUrl}${apiControllers.country}${apiUrls.country.getAllCountries}`)
      .subscribe({
        next(response: any) {
          alert(JSON.stringify(response))
          if (response["body"]) {
            alert(`MOSTRARRR TODAS COUNTRIES`);
          }
        },
        error(err: Error) {
          alert(err.message)
        }
      });

  }
  updateCountry() { }
  deleteCountry() { }

}

