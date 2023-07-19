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
  }

  public login(userName: string, password: string): Observable<any> {
    return this.httpClient
      .post(
        `${environment.apiUrl}\
          ${apiControllers.authentication}\
          ${apiUrls.authentication.login}`,
        {'userName': userName, 'password': password})
      .pipe(tap((res: any) => this.setSession(res)), shareReplay());
  }

  public logout(): Observable<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    return of();
  }

  private getExpiration(): dayjs.Dayjs {
    return dayjs(JSON.parse(localStorage.getItem('expiration') as string));
  }

  public isLoggedIn(): boolean {
    return dayjs().isBefore(this.getExpiration());
  }
}
