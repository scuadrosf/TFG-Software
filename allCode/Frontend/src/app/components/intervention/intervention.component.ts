import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html'
})
export class InterventionComponent implements OnInit {

  appointmentList: Appointment[] = [];
  profileAvatarUrls: string[] = [];
  userId!: number;
  user!: User;

  constructor(private interventionService: InterventionService, private userService: UserService, private activatedRoute: ActivatedRoute, public authService: AuthService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(this.userId).subscribe(response => {
      this.user = response;
    })
    this.interventionService.getAllAppointmentsByUser(this.userId).subscribe(list => {
      this.appointmentList = list.slice().sort((a, b) => {
        // Ordenar por día
        const dateA = new Date(a.bookDate);
        const dateB = new Date(b.bookDate);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        // Si las fechas son iguales, ordenar por hora
        const timeA = a.fromDate.split(':').map(Number);
        const timeB = b.fromDate.split(':').map(Number);
        if (timeA[0] < timeB[0]) return -1;
        if (timeA[0] > timeB[0]) return 1;
        // Si las horas son iguales, comparar los minutos
        if (timeA[1] < timeB[1]) return -1;
        if (timeA[1] > timeB[1]) return 1;
        return 0;
      });
    });
  }

  deleteAppointment(appointment: Appointment) {
    Swal.fire({
      title: "¿Esta seguro de eliminar la cita?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.deleteAppointment(appointment.id).subscribe();
        Swal.fire("Eliminado", "", "success");
        console.log("Appointment eliminado")
        this.ngOnInit();
        this.ngOnInit();
      } else if (result.isDenied) {
        console.log("Confirmación de eliminado cancelada")
      }
    });
  }
}
