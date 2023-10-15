import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  name: string = '';
  lastName: string = '';
  email: string = '';
  passwordEncoded: string = 'pass';
  username: string = '';
  gender: string = '';
  phone: string = '';
  birth: string = '';
  address: string = '';
  country: string = '';
  city: string = '';
  postalCode: string = '';


  constructor(public authService: AuthService, private router: Router) { }


  addPatient() {
    const userData = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      passwordEncoded: this.passwordEncoded,
      username: this.username,
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
        this.router.navigate(['/patient-list']);
      },
      (_) => {
        console.error("error");
        this.router.navigate(['/error-page'])
      }
    );
  }
}
