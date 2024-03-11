import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { Description } from 'src/app/models/description.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
})
export class EditAppointmentComponent {

  userId!: number;
  userMe!: User;
  appointmentId!: number;
  appointment!: Appointment
  user!: User;
  bookDate!: string;
  fromDate!: string;
  toDate!: string;
  description: string = '';
  additionalNote: string = '';
  doctorList!: User[];
  descriptionList!: Description[];
  doctorName: string = '';
  doctorAsignated!: User;
  groupedDescriptions: any = {};


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentId = this.activatedRoute.snapshot.params['id'];
    console.log(this.appointmentId);
    this.appointmentService.getAppointment(this.appointmentId).subscribe((response) => {
      this.appointment = response;
      this.description = response.description;

      this.userService.getUser(this.appointment.user.id).subscribe(patient => {
        this.user = patient;
      })
    });
    this.userService.getMe().subscribe(response => {
      this.userMe = response;
      this.getDoctorList(this.userMe);
    });
    this.onDescriptionChange();

    this.appointmentService.getAllDescriptions().subscribe(response => {
      this.descriptionList = response;
      this.groupDescriptions();
    });

  }

  groupDescriptions() {
    // Agrupar las descripciones por nameDescription
    this.descriptionList.forEach((description) => {
      const groupName = description.nameDescription;
      if (!this.groupedDescriptions[groupName]) {
        this.groupedDescriptions[groupName] = [];
      }
      this.groupedDescriptions[groupName].push(description);
    });
  }


  getDoctorList(userMe: User) {
    this.userService.getUserList().subscribe((list) => {
      this.doctorList = list.filter(user =>
        user.roles.length >= 1 && user.roles.includes('DOCTOR') && user.codEntity == userMe.codEntity);
    });
  }

  confirmEdit() {
    Swal.fire({
      title: "¿Esta seguro/a de actualizar los cambios?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      denyButtonText: `Cancelar`,
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.bookDate == null || this.fromDate == null || this.toDate == null) {
          Swal.fire("Debe completar todos los campos no rellenados", "", "warning");
        } else {
          if (this.appointment) {
            if (this.bookDate)
              this.appointment.bookDate = this.bookDate;
            if (this.fromDate)
              this.appointment.fromDate = this.fromDate;
            if (this.toDate)
              this.appointment.toDate = this.toDate;
            if (this.description)
              this.appointment.description = this.description;
            if (this.additionalNote)
              this.appointment.additionalNote = this.additionalNote;
            if (this.doctorAsignated)
              this.appointment.doctorAsignated = this.doctorAsignated;
            this.appointmentService.updateFullAppointment(this.appointment).subscribe(
              (_) => {
                console.log(this.appointment);
                this.ngOnInit();
                window.history.back();
              },
            );
          }
          Swal.fire("Cita editada", "", "success");
        }
      } else if (result.isDenied) {
      }
    });
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  onDescriptionChange() {
    if (!this.fromDate) {
      Swal.fire("Seleccione la hora de inicio", "", "warning");
      return;
    }

    const fromDateParts = this.fromDate.split(':');
    const fromDateObj = new Date();
    fromDateObj.setHours(parseInt(fromDateParts[0], 10), parseInt(fromDateParts[1], 10), 0, 0);

    let selectedDescription = this.descriptionList.find(descriptionItem => descriptionItem.nameIntervention === this.description);

    if (selectedDescription && selectedDescription.timeToIntervention) {
      const timeToInterventionString = selectedDescription.timeToIntervention;
      const timeParts = timeToInterventionString.split(':');
      const durationHours = parseInt(timeParts[0], 10);
      const durationMinutes = parseInt(timeParts[1], 10);

      if (!isNaN(durationHours) && !isNaN(durationMinutes)) {
        fromDateObj.setHours(fromDateObj.getHours() + durationHours);
        fromDateObj.setMinutes(fromDateObj.getMinutes() + durationMinutes);
      } else {
        console.error('Invalid timeToIntervention format:', timeToInterventionString);
        // Manejo de error o valor predeterminado
      }
    }

    // Formateo de la hora para asegurar el formato correcto
    this.toDate = fromDateObj.getHours().toString().padStart(2, '0') + ':' +
      fromDateObj.getMinutes().toString().padStart(2, '0');
  }

  onDoctorChange() {

    this.userService.getUserByName(this.doctorName).subscribe(doctor => {
      this.doctorAsignated = doctor
    })

  }

  back() {
    window.history.back();
  }
}
