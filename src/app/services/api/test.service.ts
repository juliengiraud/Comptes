import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected router: Router,
    protected localStorage: LocalStorage
  ) {
    super(http, authService, router, localStorage);
  }

  getAllPagesViewCount(next?: (value?: any) => void, error?: (err?: HttpErrorResponse) => void,
                       complete?: () => void): Subscription {
    const url = this.apiUrl + '/stats/getAllPagesViewCount';
    return this.doGet(url, null, next, error, complete);
  }

}
