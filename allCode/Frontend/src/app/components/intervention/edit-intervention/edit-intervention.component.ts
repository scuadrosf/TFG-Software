import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Intervention } from 'src/app/models/intervention.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-intervention',
  templateUrl: './edit-intervention.component.html',
})
export class EditInterventionComponent implements OnInit {

  selectedFile: File | null = null;
  selectedFileName: string = '';

  appointmentId!: number;
  interventionId!: number;
  intervention!: Intervention;
  userId!: number;
  user!: User;
  type!: string;

  constructor(private userService: UserService, private appointmentService: AppointmentService, private interventionService: InterventionService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['idUser'];
    this.interventionId = this.activatedRoute.snapshot.params['idIntervention'];
    console.log("USE:", this.userId);
    console.log("INT:", this.interventionId);
    this.interventionService.getIntervention(this.interventionId).subscribe(intervention => {
      this.intervention = intervention;
    })
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;
    })
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile?.name || '';
  }

  update() {
    const formData = new FormData();
    if (confirm('Esta seguro de guardar los cambios')) {
      if (this.intervention) {
        if (this.type)
          formData.append('type', this.type);
        if (this.selectedFile)
          formData.append('file', this.selectedFile);
      }
      this.interventionService.updateIntervention(this.interventionId, this.user.id, formData).subscribe(
        (_) => {
          console.log(this.intervention);
          this.ngOnInit();
          this.back();
        },
      );
    } else {
      console.log("Cancelado por el usuario");
    }
  }

  back() {
    window.history.back();
  }
}
