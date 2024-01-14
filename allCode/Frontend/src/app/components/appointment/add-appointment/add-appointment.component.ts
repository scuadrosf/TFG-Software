import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
})
export class AddAppointmentComponent implements OnInit {

  userId!: number;
  userIdMe!: number;
  user!: User;
  userMe!: User;
  bookDate!: string;
  fromDate!: string;
  toDate!: string;
  description: string = '';
  additionalNote: string = '';
  isAdmin: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(this.userId).subscribe((response) => {
      this.user = response;
    });
    this.userService.getMe().subscribe(response => {
      this.userMe = response;
      this.userService.checkAdmin(this.userMe.id).subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      })
    })
  }

  addAppointment() {
    const data = {
      bookDate: this.bookDate,
      fromDate: this.fromDate,
      toDate: this.toDate,
      description: this.description,
      additionalNote: this.additionalNote
    }    
    if (this.bookDate == null || this.fromDate == null || this.toDate == null || this.description == null)
      Swal.fire("Debe rellenar todos los campos", "", "warning");
    else {
      this.appointmentService.bookAppointment(data, this.userId).subscribe(
        (_) => {
          Swal.fire("Cita creada", "", "success");
          if (this.isAdmin){
            window.history.back();
          }else{
            this.router.navigate(['/dashboard'])
          }
        },
        (_) => {
          Swal.fire("Algo ha ocurrido, vuelva a intentarlo", "", "error");
          console.error("error");
          this.router.navigate(['/error-page'])
        }
      )
    }
  }

  back() {
    window.history.back();
  }
}
