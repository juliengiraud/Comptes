import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestApiService {

  private apiUrl: string = 'https://www.api.julien-giraud.fr';
  private headers: HttpHeaders;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.headers = new HttpHeaders();
    this.authService.getUser().then((data) => {
      this.headers = this.headers.set('Authorization', 'Bearer ' + data.token);
    });
  }

  getAllPagesViewCount(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const url = this.apiUrl + '/stats/getAllPagesViewCount';
    return this.http.get<any>(url, {
      headers: this.headers
    }).subscribe(next, error, complete);
  }

}
