import { addAriaReferencedId } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UtilService } from 'src/app/services/util.service';

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
  appointmentsComYest: number = 0;
  numPatientsYesterday: number = 0;
  numPatientsTotal: number = 0;
  newPatients: number = 0;
  incrementRate: number = 0;

  today = new Date();


  constructor(public authService: AuthService, private appointmentService: AppointmentService, private interventionService: InterventionService, private utilService: UtilService) {
    this.currentUser = this.authService.currentUser()

  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadAppointment();
    this.loadInterventions();
    this.utilService.getAppointmentsCompletedYesterday().subscribe(num => {
      this.appointmentsComYest = num;
    });

    this.utilService.getnumPatientsYesterday().subscribe(num => {
      this.numPatientsYesterday = num;
    });

    this.utilService.getnumPatientsTotal().subscribe(num => {
      this.numPatientsTotal = num;
      this.newPatients = this.loadRate(this.numPatientsTotal, this.numPatientsYesterday);
    });

    // timer(0, 10000).subscribe(() => {
    //   utilUpdt: Util
    //   this.utilService.updateUtil()
    // });
  }


  loadRate(numPatientsTotal: number, numPatientsYesterday: number) {
    return numPatientsTotal - numPatientsYesterday;
  }

  loadAppointment() {
    this.appointmentService.getAllAppointments().subscribe(
      (appointments: any[]) => {
        this.numAppointmentsNoCompleted = this.countAppointmentsNoCompleted(appointments, this.today);
        this.numAppointmentsCompleted = this.countAppointmentsCompleted(appointments, this.today);
        this.totalAppointments = appointments.filter(appointment => this.isSameDate(new Date(appointment.bookDate), this.today)).length;
        // console.log("Citas pendientes: " + this.numAppointmentsNoCompleted + "/" + this.totalAppointments);
      },
      (error) => {
        console.error("Error al cargar los appointments:", error)
      }
    );
  }

  loadInterventions() {
    this.interventionService.getAllInterventions().subscribe(
      (interventions: any[]) => {
        this.numInterventions = interventions.filter(intervention => this.isSameDate(new Date(intervention.interventionDate), this.today)).length
      },
      (error) => {
        console.error("Error al cargar los interventions:", error)
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
