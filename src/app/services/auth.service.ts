import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  constructor(private localStorage: LocalStorage) {
  }

  isUserLogged(): boolean {
    return this.user !== undefined && this.user !== null;
  }

  setUser(user: User): Promise<any> {
    const promise = new Promise((then) => {
      this.localStorage.setItem("user", user).subscribe(() => {
        this.user = user;
        then();
      });
    });
    return promise;
  }

  getUser(): Promise<any> {
    const promise = new Promise((then) => {
      if (this.isUserLogged()) {
        then(this.user);
      } else {
        this.localStorage.getItem("user").subscribe((data: User) => {
          this.user = data;
          then(data);
        });
      }
    });
    return promise;
  }
}
