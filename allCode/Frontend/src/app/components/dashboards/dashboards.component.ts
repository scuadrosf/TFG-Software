import { addAriaReferencedId } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { Appointment } from 'src/app/models/appointment.model';
import { Intervention } from 'src/app/models/intervention.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  isAdmin: boolean = false
  currentUser!: User
  appointmentsUser: Appointment[] = [];
  appointmentsToday: Appointment[] = [];
  appointmentsTodays: Appointment[] = [];
  interventionsUser: Intervention[] = [];
  numAppointmentsNoCompleted: number = 0;
  numAppointmentsCompleted: number = 0;
  totalAppointmentsToday: number = 0;
  numInterventions: number = 0;
  appointmentsComYest: number = 0;
  numPatientsYesterday: number = 0;
  numPatientsTotal: number = 0;
  nextAppointment: string = '';
  newPatients: number = 0;
  incrementRate: number = 0;
  differenceTime: string = '';
  page!: number;
  today = new Date();


  constructor(private userService: UserService, public authService: AuthService, private appointmentService: AppointmentService, private interventionService: InterventionService, private utilService: UtilService) {
  }

  ngOnInit(): void {
    this.userService.getMe().subscribe((response) => {
      this.currentUser = response;

      this.loadInterventionsUser(this.currentUser.id);
      this.loadAppointmentsUser(this.currentUser.id);

    })

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

  loadAppointmentsUser(id: number) {
    this.appointmentService.getAllAppointmentsByUser(id).subscribe(list =>
      this.appointmentsUser = list)
  }

  loadInterventionsUser(id: number) {
    this.interventionService.getUserInterventions(id).subscribe(list =>
      this.interventionsUser = list

    )
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe();
    this.ngOnInit();
    console.log("Cita eliminada")
    this.ngOnInit();
  }


  loadRate(numPatientsTotal: number, numPatientsYesterday: number) {
    return numPatientsTotal - numPatientsYesterday;
  }

  loadAppointment() {
    this.appointmentService.getAllAppointments().subscribe(
      (appointments: any[]) => {
        this.numAppointmentsNoCompleted = this.countAppointmentsNoCompleted(appointments, this.today);
        this.numAppointmentsCompleted = this.countAppointmentsCompleted(appointments, this.today);
        this.totalAppointmentsToday = appointments.filter(appointment => this.isSameDate(new Date(appointment.bookDate), this.today)).length;
        this.appointmentsToday = appointments
          .filter(appointment => this.isSameDate(new Date(appointment.bookDate), this.today))
          .sort((a, b) => {
            const timeA = a.fromDate.split(':').map(Number);
            const timeB = b.fromDate.split(':').map(Number);

            if (timeA[0] < timeB[0]) return -1;
            if (timeA[0] > timeB[0]) return 1;
            // Si las horas son iguales, comparar los minutos
            if (timeA[1] < timeB[1]) return -1;
            if (timeA[1] > timeB[1]) return 1;
            // Si las horas y los minutos son iguales, retornar 0
            return 0;
          });



        // Calcula el tiempo para la próxima cita
        const now = new Date();
        const futureAppointments = this.appointmentsToday.filter(appointment => new Date(appointment.bookDate) > now);
        futureAppointments.sort((a, b) => new Date(a.bookDate).getTime() - new Date(b.bookDate).getTime());

        if (futureAppointments.length > 0) {
          const nextAppointmentDate = new Date(futureAppointments[0].bookDate);
          const timeDifference = nextAppointmentDate.getTime() - now.getTime();

          // Convierte la diferencia de tiempo en horas y minutos
          const hours = Math.floor(timeDifference / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          console.log(`La próxima cita es en ${hours} horas y ${minutes} minutos.`);
          this.nextAppointment = hours.toString();
        } else {
          console.log("No hay citas futuras para hoy.");
          this.nextAppointment = "NaNd"
        }
      },
      (error) => {
        console.error("Error al cargar los appointments:", error)
      }
    );
  }

  // calculateNextAppointmentTime(): string {

  // }

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

  isCurrentAppointment(appointment: any): boolean {
    const appointmentTimeParts = appointment.fromDate.split(":");

    if (appointmentTimeParts.length !== 3) {
      return false; // La hora no está en el formato correcto
    }

    const appointmentHours = parseInt(appointmentTimeParts[0]);
    const appointmentMinutes = parseInt(appointmentTimeParts[1]);

    const appointmentTime = new Date();
    appointmentTime.setHours(appointmentHours, appointmentMinutes, 0, 0);

    const twentyMinutesBefore = new Date(appointmentTime);
    twentyMinutesBefore.setMinutes(appointmentTime.getMinutes() - 10);

    const fiveMinutesAfter = new Date(appointmentTime);
    fiveMinutesAfter.setMinutes(appointmentTime.getMinutes() + 5);

    const isCurrent = this.today >= twentyMinutesBefore && this.today <= fiveMinutesAfter;

    return isCurrent;
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  timeOn(appointment: any) {
    // Supongamos que appointment.fromDate y appointment.toDate son strings en formato "HH:mm:ss"
    const fromTimeParts = appointment.fromDate.split(":");
    const toTimeParts = appointment.toDate.split(":");

    const fromDateTime = new Date();
    fromDateTime.setHours(parseInt(fromTimeParts[0], 10));
    fromDateTime.setMinutes(parseInt(fromTimeParts[1], 10));

    const toDateTime = new Date();
    toDateTime.setHours(parseInt(toTimeParts[0], 10));
    toDateTime.setMinutes(parseInt(toTimeParts[1], 10));

    const timeDifferenceInMilliseconds = toDateTime.getTime() - fromDateTime.getTime();

    // Convierte la diferencia de tiempo a horas y minutos
    const hoursDifference = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return minutesDifference.toString();

  }
}
