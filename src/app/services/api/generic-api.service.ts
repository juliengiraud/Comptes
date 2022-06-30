import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GenericApiService {

    protected apiUrl = 'https://www.api.julien-giraud.fr';
    private headers: HttpHeaders = new HttpHeaders();

    constructor(
        protected http: HttpClient,
        protected authService: AuthService,
        protected router: Router,
        protected localStorage: LocalStorage
    ) {
    }

    private getHeaders(): HttpHeaders {
        if (this.authService.isUserLogged()) {
            const token: string = this.authService.getUser().token;
            return this.headers.set('Authorization', 'Bearer ' + token);
        }
        return this.headers;
    }

    protected doGet(
        url: string,
        params: any,
        next?: (value?: any) => void,
        error?: (err: HttpErrorResponse) => void,
        complete?: () => void
    ): Subscription {
        return this.http.get(
            this.getUrlWithParams(url, params), { headers: this.getHeaders() }
        ).subscribe(
            next,
            response => this.genericError(response, error, complete),
            complete
        );
    }

    protected doPost(
        url: string,
        params: any,
        next?: (value?: any) => void,
        error?: (err: HttpErrorResponse) => void,
        complete?: () => void
    ): Subscription {
        return this.http.post(
            url, params, { headers: this.getHeaders() }
        ).subscribe(
            next,
            response => this.genericError(response, error, complete),
            complete
        );
    }

    protected doPut(
        url: string,
        params: any,
        next?: (value?: any) => void,
        error?: (err: HttpErrorResponse) => void,
        complete?: () => void
    ): Subscription {
        return this.http.put(
            url, params, { headers: this.getHeaders() }
        ).subscribe(
            next,
            response => this.genericError(response, error, complete),
            complete
        );
    }

    protected doDelete(
        url: string,
        params: any,
        next?: (value?: any) => void,
        error?: (err?: HttpErrorResponse) => void,
        complete?: () => void
    ): Subscription {
        return this.http.delete(
            this.getUrlWithParams(url, params), { headers: this.getHeaders() }
        ).subscribe(
            next,
            response => this.genericError(response, error, complete),
            complete
        );
    }

    genericError(
        response: HttpErrorResponse,
        error: (err: HttpErrorResponse) => void,
        complete: () => void
    ): void {
        if (!environment.production) {
            console.log(response);
        }
        if (response.status === 401) {
            this.localStorage.clear().subscribe(() => {
                this.router.navigate(['login']);
            });
            return;
        }
        if (error != null) {
            error(response);
            complete();
        }
    }

    getUrlWithParams(url: string, params: any): string {
        if (params == null) {
            return url;
        }
        let httpParams = new HttpParams();
        for (const property of Object.keys(params)) {
            if (params[property] != null) {
                httpParams = httpParams.set(property, params[property]);
            }
        }
        return url + '?' + httpParams.toString();
    }
}
