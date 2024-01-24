import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-intervention',
  templateUrl: './add-intervention.component.html'
})
export class AddInterventionComponent implements OnInit {

  selectedFile: File | null = null;
  selectedFileName: string = '';
  descriptionAppointment!: string;
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

    this.appointmentService.getAppointment(this.appointmentId).subscribe(response =>
      this.descriptionAppointment = response.description)



  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile?.name || '';
  }

  submit() {
    const formData = new FormData();
    if (this.type != null && this.selectedFile) {
      console.log(this.type);
      formData.append('file', this.selectedFile);
      formData.append('type', this.type);
    }else if (this.type && !this.selectedFile) {
      formData.append('file', "");
      formData.append('type', this.type);
    }else{
      console.error("Ningun archivo seleccionado")
    }
    this.interventionService.addIntervention(this.appointmentId, this.userId, formData).subscribe(
      (_) => {
        Swal.fire("Intervención añadida", "", "success");
        this.back();
      },
      (error) => {
        Swal.fire("Ha ocurrido un error", "", "error");
        console.error(error);
        this.back();
      }
    );
  }

  back() {
    window.history.back();
  }
}
