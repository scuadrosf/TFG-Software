import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  emailError: boolean = false;
  userNotFoundError: boolean = false;
  user!: User;
  encodedPassword!: string;

  constructor(private emailService: EmailService, private userService: UserService) { }

  resetPassword(email: string) {
    if (!email) {
      this.emailError = true;
      this.userNotFoundError = false;
      return;
    }
    this.emailError = false;
    this.userNotFoundError = false;
    
    this.userService.getUserByEmail(email).subscribe(user => {
      this.user = user;
      this.emailService.sendEmailRecovery(email, user.username);
      this.editPassword();
      Swal.fire("Se ha enviado un correo electrónico con sus nuevas credenciales", "", "info");
    },
    error => {
      this.userNotFoundError = true;
      console.error("Usuario no encontrado");
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
