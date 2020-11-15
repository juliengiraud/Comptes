import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserApiService } from 'src/app/services/api/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private userApiService: UserApiService,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  doLogin() {
    console.log("login", this.user);
    this.userApiService.login(this.user, (data: any) => {
      console.log("Connexion réussie", data);
      this.authService.setUser(data);
    }, (err) => {
      if (err.error.error === "CONNECTION_FAILED") {
        console.log("Login ou mot de passe incorrect");
      } else {
        console.log("err", err);
      }
    });
  }

  doRegister() {
    console.log('register', this.user);
    this.userApiService.register(this.user, (data: any) => {
      console.log("Compte crée", data);
      this.authService.setUser(data);
    }, (err) => {
      if (err.error.error === 'USED_LOGIN') {
        console.log('Login déjà utilisé')
      } else {
        console.log("err", err);
      }
    });
  }

  doLogout() {
    this.authService.logout();
  }

}
