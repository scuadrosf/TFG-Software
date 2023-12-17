import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {

  user!: User;
  encodedPassword!: string;

  constructor(private emailService: EmailService, private userService: UserService) { }

  resetPassword(email: string) {
    this.userService.getUserByEmail(email).subscribe(user => {
      this.user = user;
      this.emailService.sendEmailRecovery(email, user.username);
      this.editPassword();
      alert("Se han enviado a su correo electrónico las nuevas credenciales")
    })

  }
  editPassword() {
    if (this.user) {
      this.user.encodedPassword = this.user.username;
      console.log(this.user.encodedPassword)
      this.userService.updatePassword(this.user).subscribe(
        (_) => {
          console.log(this.user);
          window.history.back();
        }
      )
    }
  }
}
