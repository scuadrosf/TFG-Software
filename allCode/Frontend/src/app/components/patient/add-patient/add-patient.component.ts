import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  name: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  passwordEncoded: string = 'pass';
  gender: string = '';
  phone: string = '';
  birth: string = '';
  address: string = '';
  country: string = '';
  city: string = '';
  postalCode: string = '';


  constructor(public authService: AuthService, private router: Router, private emailService: EmailService) { }


  addPatient() {
    if (this.authService.isAdmin()) {
      const userData = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        passwordEncoded: this.username,
        gender: this.gender,
        phone: this.phone,
        birth: this.birth,
        address: this.address,
        country: this.country,
        city: this.city,
        postalCode: this.postalCode,
      }
      console.log(this.gender);
      this.authService.register(userData).subscribe(
        (_) => {
          alert('Paciente creado');
          this.emailService.sendEmail(this.email, userData.passwordEncoded);
          window.history.back();
        },
        (_) => {
          console.error("error");
          this.router.navigate(['/error-page'])
        }
      );
    }else{
      console.error(this.authService.currentUser())
    }
  }
}
