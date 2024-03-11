import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Description } from 'src/app/models/description.model';
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
  doctorList!: User[];
  doctorName: string = '';
  doctorAsignated!: User;
  descriptionList!: Description[];
  groupedDescriptions: any = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private appointmentService: AppointmentService) { }

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
      this.getDoctorList(this.userMe);
    })
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

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  getDoctorList(userMe: User) {
    this.userService.getUserList().subscribe((list) => {
      this.doctorList = list.filter(user =>
        user.roles.length >= 1 && user.roles.includes('DOCTOR') && user.codEntity == userMe.codEntity);
    });
  }

  addAppointment() {
    const data = {
      bookDate: this.bookDate,
      fromDate: this.fromDate,
      toDate: this.toDate,
      description: this.description,
      additionalNote: this.additionalNote,
      doctorAsignated: this.doctorAsignated
    };

    if (!this.bookDate || !this.fromDate || !this.toDate || !this.description || !this.doctorAsignated) {
      Swal.fire("Debe rellenar todos los campos", "", "warning");
      return;
    }

    this.appointmentService.checkAppointmentAvailability(this.doctorAsignated.id, this.bookDate, this.fromDate, this.toDate).subscribe(isAvailable => {
      if (!isAvailable) {
        Swal.fire("Ya existe una cita en este horario para este doctor", "", "warning");
        return;
      } else {
        this.appointmentService.bookAppointment(data, this.userId).subscribe(
          (_) => {
            Swal.fire("Cita creada", "", "success");
            if (this.isAdmin) {
              window.history.back();
            } else {
              this.router.navigate(['/dashboard']);
            }
          },
          (_) => {
            Swal.fire("Algo ha ocurrido, vuelva a intentarlo", "", "error");
            console.error("error");
            this.router.navigate(['/error-page']);
          }
        );
      }
    });
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
