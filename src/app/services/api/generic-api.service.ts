import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericApiService {

  protected apiUrl: string = 'https://www.api.julien-giraud.fr';
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

  protected doGet(url: string, next?: (value?: any) => void,
                  error?: (error?: any) => void, complete?: () => void): Subscription {
    // TODO ajouter le code pour les paramètres GET
    return this.http.get<any>(url, { headers: this.getHeaders() })
        .subscribe(next, error, complete);
  }

  protected doPost(url: string, params: any, next?: (value?: any) => void,
                   error?: (error?: any) => void, complete?: () => void): Subscription  {
    // return this.http.post<any>(url, { headers: this.getHeaders(), params })
    return this.http.post<any>(url, params, {headers: this.getHeaders()})
        .subscribe(next, error, complete);
  }

}
