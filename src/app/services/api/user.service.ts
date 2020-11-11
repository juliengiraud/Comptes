import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private apiUrl: string = 'https://www.api.julien-giraud.fr/comptes';

  constructor(private http: HttpClient) {
  }

  login(user: User, next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const params = {
      data: user
    };
    return this.http.post<any>(this.apiUrl + '/login', params).subscribe(next, error, complete);
  }

  register(user: User, next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const params = {
      data: user
    };
    return this.http.post<any>(this.apiUrl + '/register', params).subscribe(next, error, complete);
  }

}
