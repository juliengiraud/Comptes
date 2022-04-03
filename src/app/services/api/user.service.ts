import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../auth.service';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends GenericApiService {

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected router: Router,
    protected localStorage: LocalStorage
  ) {
    super(http, authService, router, localStorage);
    this.apiUrl = this.apiUrl + '/comptes';
  }

  login(user: User, next?: (value?: any) => void, error?: (err?: HttpErrorResponse) => void,
        complete?: () => void): Subscription {
    const url = this.apiUrl + '/login';
    const params = {
      data: user
    };
    return this.doPost(url, params, next, error, complete);
  }

  register(user: User, next?: (value?: any) => void, error?: (err?: HttpErrorResponse) => void,
           complete?: () => void): Subscription {
    const url = this.apiUrl + '/register';
    const params = {
      data: user
    };
    return this.doPost(url, params, next, error, complete);
  }

}
