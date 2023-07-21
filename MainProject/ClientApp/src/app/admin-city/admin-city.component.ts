import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';

@Component({
  selector: 'app-admin-city',
  templateUrl: './admin-city.component.html',
  styleUrls: ['./admin-city.component.css']
})
export class AdminCityComponent {
  constructor(private requestService: RequestService) { }
  cityName = "xx"
  cityId = 2
  cityCountry = "Spain"


  addCity() {
    alert(this.cityName);
    let self = this;
    this.requestService.post(`${environment.apiUrl}${apiControllers.city}${apiUrls.city.createCity}`,
      {
        "Name": this.cityName
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
  getCityById() {
    alert(this.cityId);
    let self = this;
    this.requestService.get(`${environment.apiUrl}${apiControllers.city}${apiUrls.city.getCityById} ${this.cityId}`)
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
  getAllCities() {
    alert(this.cityId);
    let self = this;
    this.requestService.get(`${environment.apiUrl}${apiControllers.city}${apiUrls.city.getAllCities}`)
      .subscribe({
        next(response: any) {
          alert(JSON.stringify(response))
          if (response["body"]) {
            alert(`MOSTRARRR TODAS CITIES`);
          }
        },
        error(err: Error) {
          alert(err.message)
        }
      });
  }
  updateCity() { }
  deleteCity() { }
}
