import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-intervention',
  templateUrl: './add-intervention.component.html',
  styleUrls: ['./add-intervention.component.scss']
})
export class AddInterventionComponent implements OnInit {

  appointmentId!: number;
  userId!: number;
  user!: User;
  type!: string;

  constructor(private userService: UserService, private appointmentService: AppointmentService, private interventionService: InterventionService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.appointmentId = this.activatedRoute.snapshot.params['idAppointment'];
    console.log("APO: ", this.appointmentId);
    this.userId = this.activatedRoute.snapshot.params['idUser'];
    console.log("USE:", this.userId);
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;
    })



  }

  submit() {
    if (this.type != null) {
      console.log(this.type);
      this.interventionService.addIntervention(this.appointmentId, this.userId, this.type).subscribe(
        (_) => {
          alert('Intervención añadida');
          window.history.back();
        },
        (error) => {
          console.error(error);
          this.router.navigate(['/error-page'])
        }
      );
    }
  }

  back() {
    window.history.back();
  }
}
