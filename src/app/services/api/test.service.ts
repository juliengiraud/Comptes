import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { GenericApiService } from 'src/app/services/api/generic-api.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestApiService extends GenericApiService {

  constructor(http: HttpClient,
              authService: AuthService,
              router: Router,
              localStorage: LocalStorage) {
    super(http, authService, router, localStorage);
  }

  getAllPagesViewCount(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void): Subscription {
    const url = this.apiUrl + '/stats/getAllPagesViewCount';
    return this.doGet(url, next, error, complete);
  }

}
