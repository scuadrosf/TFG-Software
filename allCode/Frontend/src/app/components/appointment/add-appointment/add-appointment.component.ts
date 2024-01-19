import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    })
    this.getDoctorList();
  }

  getDoctorList(){
    this.userService.getUserList().subscribe((list) => {
      this.doctorList = list.filter(user => 
        user.roles.length === 1 && user.roles.includes('DOCTOR'));
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

    this.appointmentService.checkAppointmentAvailability(this.bookDate, this.fromDate, this.toDate).subscribe(isAvailable => {
      if (!isAvailable) {
        Swal.fire("Ya existe una cita en este horario", "", "warning");
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
