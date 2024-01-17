import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit{

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
  speciality: string = '';

  constructor(public authService: AuthService, private router: Router){}

  ngOnInit(): void {
      
  }


  addDoctor(){
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
        speciality: this.speciality
      }
      console.log(userData)
      if (Object.values(userData).every(value => value !== '')){
        this.authService.registerDoctor(userData).subscribe(
          (_) => {
            Swal.fire("Doctor dado de alta", "", "success");
            window.history.back();
          },
          (_) => {
            Swal.fire("Probablemente este doctor ya exista, sino vuelva a intentarlo", "", "error");
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
