import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html'
})
export class InterventionComponent implements OnInit {

  appointmentList: Appointment[] = [];
  profileAvatarUrls: string[] = [];
  userId!: number;
  user!: User;

  constructor(private interventionService: InterventionService, private userService: UserService, private activatedRoute: ActivatedRoute, public authService:AuthService) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(this.userId).subscribe(response => {
      this.user = response;
    })
    this.interventionService.getAllAppointmentsByUser(this.userId).subscribe(list => {
      this.appointmentList = list;
    });
  }
}
