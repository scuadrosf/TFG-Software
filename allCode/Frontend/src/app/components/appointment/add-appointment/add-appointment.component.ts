import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
})
export class AddAppointmentComponent implements OnInit {

  userId!: number;
  user!: User;
  bookDate!: string;
  fromDate!: string;
  toDate!: string;
  description: string = '';
  additionalNote: string = '';

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    console.log(this.userId);
    this.userService.getUser(this.userId).subscribe((response) => {
      this.user = response;
    });
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
      alert("Debe rellenar todos los campos")
    else {
      this.appointmentService.bookAppointment(data, this.userId).subscribe(
        (_) => {
          alert('Cita creada');
          window.history.back();
        },
        (_) => {
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
