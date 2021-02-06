import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../auth.service';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends GenericApiService {

  constructor(http: HttpClient,
              authService: AuthService) {
    super(http, authService);
    this.apiUrl = this.apiUrl + '/comptes';
  }

  login(user: User, next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void): Subscription {
    const url = this.apiUrl + '/login';
    const params = {
      data: user
    };
    return this.doPost(url, params, next, error, complete);
  }

  register(user: User, next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void): Subscription {
    const url = this.apiUrl + '/register';
    const params = {
      data: user
    };
    return this.doPost(url, params, next, error, complete);
  }

}
