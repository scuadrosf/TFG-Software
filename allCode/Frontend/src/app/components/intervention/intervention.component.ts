import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss']
})
export class InterventionComponent implements OnInit {

  appointmentList: Appointment[] = [];
  profileAvatarUrls: string[] = [];
  userId!: number;
  user!: User;

  constructor(private appointmentServie: AppointmentService, private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(this.userId).subscribe(response => {
      this.user = response;
    })
    this.appointmentServie.getAllAppointmentsByUser(this.userId).subscribe(list => {
      this.appointmentList = list;


    });
  }
}
