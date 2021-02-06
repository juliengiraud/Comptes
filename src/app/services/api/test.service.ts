import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'src/app/services/api/generic-api.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestApiService extends GenericApiService {

  constructor(http: HttpClient,
              authService: AuthService) {
    super(http, authService);
  }

  getAllPagesViewCount(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const url = this.apiUrl + '/stats/getAllPagesViewCount';
    return this.doGet(url, next, error, complete);
  }

}
