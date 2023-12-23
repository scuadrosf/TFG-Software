import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { debounceTime, switchMap } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
})
export class AppointmentComponent implements OnInit {

  loading: boolean = false;
  control = new FormControl();
  noResults: boolean = false;
  selectedDay: string = '';
  originalAppointmentList: Appointment[] = [];
  appointmentList: Appointment[] = [];
  profileAvatarUrls: string[] = [];
  todayNow!: Date;
  fechaBaseDatos!: Date;
  isCompleted: boolean = false;

  constructor(private router: Router, private appointmentService: AppointmentService, private userService: UserService, private utilService: UtilService) { }


  ngOnInit(): void {
    this.getAllAppointments();
    this.observerChangeSearch();


    console.log(this.isCompleted)
  }

  getAllAppointments(): void {
    this.loading = true;

    this.appointmentService.getAllAppointments().subscribe(list => {
      this.originalAppointmentList = list;
      this.appointmentList = [...list];
      this.appointmentList.forEach(appointment => {
        this.userService.getProfileAvatar(appointment.user.id).subscribe(blob => {
          const objectUrl = URL.createObjectURL(blob);
          this.profileAvatarUrls[appointment.user.id] = objectUrl;
        });
      });
      this.loading = false;
    })

  }

  observerChangeSearch() {
    this.control.valueChanges
      .pipe(
        // startWith(''),
        debounceTime(500),
        switchMap(query => {
          this.loading = true;
          if (query.trim().length === 0) {
            this.noResults = false;
            return this.appointmentService.getAllAppointments();
          } else {
            this.noResults = false;
            return this.appointmentService.findAppointmentsByUserDetails(query);
          }
        })
      )
      .subscribe(result => {
        if (result.length === 0) {
          this.noResults = true;
        }
        this.appointmentList = result;
        this.loading = false;
      });

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
    this.appointmentService.deleteAppointment(id).subscribe();
    this.ngOnInit();
    console.log("Cita eliminada")
    this.ngOnInit();
  }

  addIntervention(idAppointment: number) {
    this.appointmentService.getAppointment(idAppointment).subscribe(appointment => {
      this.router.navigate(['appointment-list/' + appointment.user.id + '/add-intervention/' + idAppointment])

    })
  }

  reload() {
    window.location.reload();
  }

  exportPDF() {
    this.utilService.exportAppointmentsPDF().subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Citas_" + format(Date.now(), "yyyy-MM-dd") + ".pdf";
      link.click();
    });
  }

  filterAppointmentsByDay() {
    if (this.selectedDay) {
      this.appointmentList = this.originalAppointmentList.filter(appointment =>
        appointment.bookDate === this.selectedDay
      );
    } else {
      this.appointmentList = this.originalAppointmentList;
    }
  }
}
