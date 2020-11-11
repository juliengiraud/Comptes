import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TestApiService {

  private apiUrl: string = 'https://www.api.julien-giraud.fr';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Authorization', 'Bearer ' + '1i8pgnsfn4iwfxvt2sf887bikxlbxytd8kmqqc47qf70d3ymqme5diqnsa5bta38');
  }

  getAllPagesViewCount(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const url = this.apiUrl + '/stats/getAllPagesViewCount';
    return this.http.get<any>(url, {
      headers: this.headers
    }).subscribe(next, error, complete);
  }

}
