import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { Operation } from 'src/app/model/operation.model';
import { AuthService } from '../auth.service';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class OperationApiService extends GenericApiService {

  constructor(http: HttpClient,
              authService: AuthService,
              router: Router,
              localStorage: LocalStorage) {
    super(http, authService, router, localStorage);
    this.apiUrl = this.apiUrl + '/comptes';
  }

  getByStartAndQuantity(start: number, length: number, next?: (value?: Array<Operation>) => void,
                        error?: (error?: any) => void, complete?: () => void): Subscription {
    const params = {
      start: start.toString(),
      length: length.toString()
    };
    const url = this.apiUrl + '/getByStartAndQuantity';
    return this.doGet(url, params, next, error, complete);
  }

  update(operation: Operation, next?: (value?: Array<Operation>) => void,
         error?: (error?: any) => void, complete?: () => void): Subscription {
    const params = {
      data: operation
    };
    const url = this.apiUrl + '/update';
    return this.doPut(url, params, next, error, complete);
  }

  create(operation: Operation, next?: (value?: Array<Operation>) => void,
         error?: (error?: any) => void, complete?: () => void): Subscription {
    const params = {
      data: operation
    };
    const url = this.apiUrl + '/create';
    return this.doPost(url, params, next, error, complete);
  }

}
