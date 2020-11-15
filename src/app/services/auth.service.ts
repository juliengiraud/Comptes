import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  constructor(private localStorage: LocalStorage) {
    this.localStorage.getItem("user").subscribe((user: User) => {
      this.user = user;
    }, (err) => {
      console.log(err);
      this.user = null;
    });
  }

  isUserLogged(): boolean {
    return this.user !== undefined && this.user !== null;
  }

  setUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.localStorage.setItem("user", user).subscribe(() => {
        this.user = user;
        resolve();
      }, (err) => {
        reject(err);
      });
    });
  }

  getUserPromise(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.localStorage.getItem("user").subscribe((user: User) => {
        this.user = user;
        resolve(user);
      }, (err) => {
        reject(err)
      });
    });
  }

  getUser(): User {
    return this.user;
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.localStorage.removeItem("user").subscribe(() => {
        this.user = null;
        resolve();
      }, (err) => {
        this.user = null;
        reject(err)
      });
    });
  }

}
