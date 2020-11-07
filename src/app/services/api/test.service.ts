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

  getAllVisits(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const url = this.apiUrl + '/test/getAllVisits';
    return this.http.get<any>(url, {
      headers: this.headers
    }).subscribe(next, error, complete);
  }

  getFridrichDownloadCount(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const url = this.apiUrl + '/test/getFridrichDownloadCount';
    return this.http.get<any>(url, {
      headers: this.headers
    }).subscribe(next, error, complete);
  }

  getFridrichViewCount(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const url = this.apiUrl + '/test/getFridrichViewCount';
    return this.http.get<any>(url, {
      headers: this.headers
    }).subscribe(next, error, complete);
  }

  getNewBearerToken(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const url = this.apiUrl + '/test/getNewBearerToken';
    return this.http.get<any>(url, {
      headers: this.headers
    }).subscribe(next, error, complete);
  }

  getAllPagesViewCount(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const url = this.apiUrl + '/stats/getAllPagesViewCount';
    return this.http.get<any>(url, {
      headers: this.headers
    }).subscribe(next, error, complete);
  }

  getBPInfos(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
    const url = this.apiUrl + '/test/getBPInfos';
    return this.http.get<any>(url, {
      headers: this.headers
    }).subscribe(next, error, complete);
  }

  // testGet(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
  //   // const url = this.apiUrl + '/comptes';
  //   const url = this.apiUrl + '/test/bearer';
  //   return this.http.get<any>(
  //     url, { headers: this.headers, params: new HttpParams()
  //       .set('userId', '4')
  //       .set('toto', '42') }
  //   ).subscribe(next, error, complete); // TODO vérifier que ça marche et faire pareil partout
  //   // return this.http.get<any>(url).subscribe(next, error, complete);
  // }

  // testPost(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
  //   const params = {
  //     monParam: 32
  //   };
  //   return this.http.post<any>(this.apiUrl + '/re/tt', params).subscribe(next, error, complete);
  // }

  // testPut(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
  //   const params = {
  //     monParam: 34
  //   };
  //   return this.http.put<any>(this.apiUrl + '/re/tt', params).subscribe(next, error, complete);
  // }

  // testDelete(next?: (value?: any) => void, error?: (error?: any) => void, complete?: () => void) {
  //   const params = {
  //     monParam: 39
  //   };
  //   return this.http.delete<any>(this.apiUrl + '/re/tt?userId=4&toto=42').subscribe(next, error, complete);
  // }

}
