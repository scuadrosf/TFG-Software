import { addAriaReferencedId } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { InterventionService } from 'src/app/services/intervention.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html'
})
export class DashboardsComponent implements OnInit {
  isAdmin: boolean = false
  currentUser!: User
  numAppointmentsNoCompleted: number = 0;
  numAppointmentsCompleted: number = 0;
  totalAppointments: number = 0;
  numInterventions: number = 0;
  today = new Date();


  constructor(public authService: AuthService, private appointmentService: AppointmentService, private interventionService: InterventionService) {
    this.currentUser = this.authService.currentUser()

  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadAppointment();
    this.loadInterventions();

  }

  loadAppointment() {
    this.appointmentService.getAllAppointments().subscribe(
      (appointments: any[]) => {
        this.numAppointmentsNoCompleted = this.countAppointmentsNoCompleted(appointments, this.today);
        this.numAppointmentsCompleted = this.countAppointmentsCompleted(appointments, this.today);
        this.totalAppointments = appointments.filter(appointment => this.isSameDate(new Date(appointment.bookDate), this.today)).length;

        console.log("Citas pendientes: " + this.numAppointmentsNoCompleted + "/" + this.totalAppointments);

      },
      (error) => {
        console.error("Error al cargar los appointments:", error)
      }
    );
  }

  loadInterventions(){
    this.interventionService.getAllInterventions().subscribe(
      (interventions: any[]) => {
        this.numInterventions = interventions.filter(intervention => this.isSameDate(new Date(intervention.interventionDate), this.today)).length

      },
      (error) => {
        console.error("Error al cargar los interventions:",error)
      }
    );
  }

  countAppointmentsNoCompleted(appointments: any[], today: Date): number {
    return appointments.filter(appointment =>
      !appointment.completed && this.isSameDate(new Date(appointment.bookDate), today)
    ).length;
  }

  countAppointmentsCompleted(appointments: any[], today: Date): number {
    return appointments.filter(appointment =>
      appointment.completed && this.isSameDate(new Date(appointment.bookDate), today)
    ).length;
  }

  

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
