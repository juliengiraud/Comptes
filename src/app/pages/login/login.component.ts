import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
              public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  doLogin(): void {
    this.userApiService.login(this.user, (data: any) => {
      this.authService.setUser(data).then(() => {
        this.router.navigate(['home']);
      });
    }, (err) => {
      if (err.error.error === 'CONNECTION_FAILED') {
        console.log('Login ou mot de passe incorrect');
      }
    });
  }

  doRegister(): void {
    this.userApiService.register(this.user, (data: any) => {
      this.authService.setUser(data);
    }, (err) => {
      if (err.error.error === 'USED_LOGIN') {
        console.log('Login déjà utilisé');
      }
    });
  }

  doLogout(): void {
    this.authService.logout();
  }

}
