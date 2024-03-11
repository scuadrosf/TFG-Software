import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit {

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
  codEntity!: number;
  user!: User;

  constructor(public authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe(response => {
      this.user = response;
      this.codEntity = response.codEntity;
    })
  }


  addDoctor() {
    if ((this.authService.isAdmin() || this.authService.isDoctor()) && !this.authService.isSuperAdmin()) {
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
        speciality: this.speciality,
        codEntity: this.codEntity
      }
      console.log(userData)
      if (Object.values(userData).every(value => value !== '')) {
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
      } else {
        Swal.fire('Todos los campos son obligatorios', '', 'warning');
      }
    }else if (this.authService.isSuperAdmin()) {
      const userData = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        passwordEncoded: this.username,
        codEntity: this.codEntity
      }
      console.log(userData)
      if (Object.values(userData).every(value => value !== '')) {
        this.authService.registerEntity(userData).subscribe(
          (_) => {
            Swal.fire("Entidad dada de alta", "", "success");
            window.history.back();
          },
          (_) => {
            Swal.fire("Probablemente este doctor ya exista, sino vuelva a intentarlo", "", "error");
            console.error("error");
            this.router.navigate(['/error-page'])
          }
        );
      } else {
        Swal.fire('Todos los campos son obligatorios', '', 'warning');
      }
    }
    
    else {
      console.error(this.authService.currentUser())
    }
  }
}
