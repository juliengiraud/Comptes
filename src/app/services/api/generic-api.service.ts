import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericApiService {

  protected apiUrl = 'https://www.api.julien-giraud.fr';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  private getHeaders(): HttpHeaders {
    if (this.authService.isUserLogged()) {
      const token: string = this.authService.getUser().token;
      return this.headers.set('Authorization', 'Bearer ' + token);
    }
    return this.headers;
  }

  protected doGet(url: string, params: any, next?: (value?: any) => void,
                  error?: (error?: any) => void, complete?: () => void): Subscription {
    let httpParams = new HttpParams();
    for (const property of Object.keys(params)) {
      httpParams = httpParams.set(property, params[property]);
    }
    return this.http.get<any>(url + '?' + httpParams.toString(), { headers: this.getHeaders() })
        .subscribe(next, error, complete);
  }

  protected doPost(url: string, params: any, next?: (value?: any) => void,
                   error?: (error?: any) => void, complete?: () => void): Subscription  {
    return this.http.post<any>(url, params, { headers: this.getHeaders() })
        .subscribe(next, error, complete);
  }

  protected doPut(url: string, params: any, next?: (value?: any) => void,
                  error?: (error?: any) => void, complete?: () => void): Subscription  {
    return this.http.put<any>(url, params, { headers: this.getHeaders() })
        .subscribe(next, error, complete);
  }

}
