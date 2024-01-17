import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit{
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
  doctorAsignated!: User;


  constructor(private userService:UserService, public authService: AuthService, private router: Router, private emailService: EmailService) { }

  ngOnInit(): void {
      this.userService.getMe().subscribe(response =>{
        this.doctorAsignated = response;
      })
  }


  addPatient() {
    if (this.authService.isAdmin() || this.authService.isDoctor()) {
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
        doctorAsignated: this.doctorAsignated
      }
      if (Object.values(userData).every(value => value !== '')){
        this.authService.register(userData).subscribe(
          (_) => {
            Swal.fire("Usuario registrado", "", "success");
            this.emailService.sendEmail(this.email, userData.passwordEncoded);
            window.history.back();
          },
          (_) => {
            Swal.fire("Probablemente este usuario ya exista, sino vuelva a intentarlo", "", "error");
            console.error("error");
            this.router.navigate(['/error-page'])
          }
        );
      }else{
        Swal.fire('Todos los campos son obligatorios', '', 'warning');
      }
    }else{
      console.error(this.authService.currentUser())
    }
  }
}
