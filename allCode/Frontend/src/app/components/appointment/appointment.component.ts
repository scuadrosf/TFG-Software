import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
})
export class AppointmentComponent implements OnInit {

  appointmentList: Appointment[] = [];
  profileAvatarUrls: string[] = [];
  todayNow!: Date;
  fechaBaseDatos!: Date;
  isCompleted: boolean = false;

  constructor(private appointmentService: AppointmentService, private userService: UserService) { }


  ngOnInit(): void {
    this.appointmentService.getAllAppointments().subscribe(list => {
      this.appointmentList = list;
      this.appointmentList.forEach(appointment => {
        this.userService.getProfileAvatar(appointment.user.id).subscribe(blob => {
          const objectUrl = URL.createObjectURL(blob);
          this.profileAvatarUrls[appointment.user.id] = objectUrl;
        });
      });
    })

    console.log(this.isCompleted)
  }

  changeStatus(id: number) {
    const confirmed = window.confirm("¿Estas seguro que ha sido completado este evento?");
    if (confirmed) {
      this.isCompleted = !this.isCompleted;
      console.log(this.isCompleted)

      this.appointmentService.updateAppointment(id, this.isCompleted).subscribe(updatedAppointment => {
        console.log("Appointment actualizado:", updatedAppointment);
      })
    } else {
      console.log("Cancelado por el usuario")
      this.ngOnInit();
    }
  }

  deleteAppointment(id: number) {
    const confirmation = window.confirm('Esta seguro de eliminar la cita');
    if (confirmation) {
      this.appointmentService.deleteAppointment(id).subscribe();
      console.log("Cita eliminada")
      this.ngOnInit();
    }
    else{
      console.log("Confirmación de eliminado cancelada")
    }
    this.ngOnInit();
  }
}
