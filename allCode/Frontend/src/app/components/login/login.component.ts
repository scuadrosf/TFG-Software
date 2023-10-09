import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {


  constructor(private authService: AuthService, private router: Router) { }

  onLogin(user: string, pass: string) {
    this.authService.logIn(user, pass).subscribe(
      (_) => {
        this.router.navigate(['/dashboard'])
        console.log(this.authService.isLoggedIn)
        // window.location.reload();
      },
      (_) => { console.error('ERROR SESION') }
    )
  }
}
