import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'node_modules/rxjs';
import { tap, shareReplay } from 'node_modules/rxjs/operators';
import {
  environment,
  apiControllers,
  apiUrls,
} from '../../environments/environment';
import * as dayjs from 'dayjs';
import { UserServiceService } from 'src/app/user.service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserServiceService
  ) {}

  private setSession(authenticationResult: any, email: string): void {
    const expiration = dayjs().add(authenticationResult.expiration, 'minutes');

    localStorage.setItem('token', authenticationResult.token);
    localStorage.setItem('expiration', JSON.stringify(expiration.valueOf()));
    localStorage.setItem('userId', authenticationResult.userId);
    this.userService.setUserName(email);
    //alert(localStorage.getItem('userId'));
    alert(JSON.stringify(authenticationResult));
  }

  public login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post(
        `${environment.apiUrl}${apiControllers.authentication}${apiUrls.authentication.login}`,
        { email: email, password: password }
      )
      .pipe(
        tap((res: any) => this.setSession(res, email)),
        shareReplay()
      );
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }

  private getExpiration(): dayjs.Dayjs {
    return dayjs(JSON.parse(localStorage.getItem('expiration') as string));
  }

  public isTokenStillValid(): boolean {
    return dayjs().isBefore(this.getExpiration());
  }
}
