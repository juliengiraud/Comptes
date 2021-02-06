import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class OperationApiService extends GenericApiService {

  constructor(http: HttpClient,
              authService: AuthService) {
    super(http, authService);
    this.apiUrl = this.apiUrl + '/comptes';
  }

  getAllOperations(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void): Subscription {
    const url = this.apiUrl + '/getAllOperations';
    return this.doGet(url, next, error, complete);
  }

}
