import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
})
export class EditAppointmentComponent {

  userId!: number;
  appointmentId!: number;
  appointment!: Appointment
  user!: User;
  bookDate!: string;
  fromDate!: string;
  toDate!: string;
  description: string = '';
  additionalNote: string = '';

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentId = this.activatedRoute.snapshot.params['id'];
    console.log(this.appointmentId);
    this.appointmentService.getAppointment(this.appointmentId).subscribe((response) => {
      this.appointment = response;

      this.userService.getUser(this.appointment.user.id).subscribe(patient => {
        this.user = patient;
      })
    });
  }

  confirmEdit() {
    const confirm = window.confirm("¿Desea confirmar cambios?")
    if (confirm) {
      if (this.appointment) {
        if(this.bookDate)
          this.appointment.bookDate = this.bookDate;
        if(this.fromDate)
          this.appointment.fromDate = this.fromDate;
        if(this.toDate)
          this.appointment.toDate = this.toDate;
        if(this.description)
          this.appointment.description = this.description;
        if (this.additionalNote)
          this.appointment.additionalNote = this.additionalNote;
        this.appointmentService.updateFullAppointment(this.appointment).subscribe(
          (_) => {
            console.log(this.appointment);
            this.ngOnInit();
            window.history.back();
          },
        );
      }
    }else{
      console.log("Cancelado por el usuario");
    }
  }


  back() {
    window.history.back();
  }
}
