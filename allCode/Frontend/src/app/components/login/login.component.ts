import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginError: boolean = false;
  emptyFields: boolean = false;
  isLogged: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  onLogin(user: string, pass: string) {
    if (!user || !pass) {
      this.emptyFields = true;
      this.loginError = false;
      return;
    }

    this.emptyFields = false;
    this.loginError = false;

    this.authService.logIn(user, pass).subscribe(
      (_) => {
        this.router.navigate(['/dashboard'])
        this.isLogged = this.authService.isLogged()
        console.log(this.authService.isLoggedIn)
      },

      (_) => {
        this.loginError = true;
        console.error('ERROR SESION')
      }
    )
  }
}
