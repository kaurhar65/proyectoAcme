import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'node_modules/rxjs';
import { tap, shareReplay } from 'node_modules/rxjs/operators';
import { environment, apiControllers, apiUrls } from '../../environments/environment';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  private setSession(authenticationResult: any): void {
    const expiration = dayjs().add(authenticationResult.expiration, 'minutes');

    localStorage.setItem('token', authenticationResult.token);
    localStorage.setItem('expiration', JSON.stringify(expiration.valueOf()));
    localStorage.setItem('userId', authenticationResult.userId);
    //alert(localStorage.getItem('userId'));
    alert(JSON.stringify(authenticationResult));
  }

  public login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post(
        `${environment.apiUrl}${apiControllers.authentication}${apiUrls.authentication.login}`,
        {'email': email, 'password': password})
      .pipe(tap((res: any) => this.setSession(res)), shareReplay());
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getExpiration(): dayjs.Dayjs {
    return dayjs(JSON.parse(localStorage.getItem('expiration') as string));
  }

  public isLoggedIn(): boolean {
    return dayjs().isBefore(this.getExpiration());
  }
}
