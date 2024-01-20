import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
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
  appointmentId!: number;
  appointment!: Appointment
  user!: User;
  bookDate!: string;
  fromDate!: string;
  toDate!: string;
  description: string = '';
  additionalNote: string = '';
  doctorList!: User[];
  doctorName: string = '';
  doctorAsignated!: User;

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
    this.getDoctorList();
    this.onDescriptionChange();
  }

  getDoctorList() {
    this.userService.getUserList().subscribe((list) => {
      this.doctorList = list.filter(user =>
        user.roles.length === 1 && user.roles.includes('DOCTOR'));
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

  onDescriptionChange() {
    if (!this.fromDate) {
      return;
    }
    const fromDate = new Date(1970, 0, 1, parseInt(this.fromDate.substr(0, 2)), parseInt(this.fromDate.substr(3, 2)));
    switch (this.description) {
      case "Mantenimiento y Prevención":
        fromDate.setMinutes(fromDate.getMinutes() + 30);
        break;
      case "Problemas Comunes y Tratamientos de Rutina":
        fromDate.setMinutes(fromDate.getMinutes() + 45);
        break;
      case "Ortodoncia y Estética Dental":
        fromDate.setMinutes(fromDate.getMinutes() + 45);
        break;
      case "Procedimientos Quirúrgicos y Restauradores":
        fromDate.setMinutes(fromDate.getMinutes() + 45);
        break;
      case "Problemas Específicos y Emergencias":
        fromDate.setMinutes(fromDate.getMinutes() + 45);
        break;
      case "Otros":
        fromDate.setMinutes(fromDate.getMinutes() + 30);
        break;
      default:
        break;
    }
    // Formatea toDate como 'HH:mm'
    this.toDate = fromDate.toTimeString().substr(0, 5);
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
