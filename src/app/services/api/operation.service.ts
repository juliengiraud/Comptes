import { HttpClient, HttpParams } from '@angular/common/http';
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

  getOperations(start: number, length: number,
                next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void): Subscription {
    let params = new HttpParams();
    params = params.set('start', start.toString());
    params = params.set('length', length.toString());
    const url = this.apiUrl + '/getOperations?' + params.toString();
    return this.doGet(url, next, error, complete);
  }

}
