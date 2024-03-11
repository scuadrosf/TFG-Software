import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { debounceTime, switchMap } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

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
  page!: number;
  showingAllAppointments!: boolean;
  doctorAsignated!: number;
  codEntity!: number;

  constructor(private router: Router, private appointmentService: AppointmentService, private userService: UserService, private utilService: UtilService) { }


  ngOnInit(): void {
    this.showingAllAppointments = false;

    this.userService.getMe().subscribe((response) => {
      this.doctorAsignated = response.id;
      this.codEntity = response.codEntity;
      this.getAllAppointmentsByDoctor(this.doctorAsignated, this.codEntity);
    });

    this.observerChangeSearch();
  }

  getAllAppointments(): void {
    this.loading = true;
    this.appointmentService.getAllAppointmentsByCodEntity(this.codEntity).subscribe(list => {
      this.originalAppointmentList = list;
      // Ordena primero por fecha y luego por hora y minutos
      this.appointmentList = this.originalAppointmentList.slice().sort((a, b) => {
        const dateA = new Date(a.bookDate);
        const dateB = new Date(b.bookDate);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        // Si las fechas son iguales, ordena por hora y minutos
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

      // Obtiene los avatares para los usuarios filtrados
      this.appointmentList.forEach(appointment => {
        this.userService.getProfileAvatar(appointment.user.id).subscribe(blob => {
          const objectUrl = URL.createObjectURL(blob);
          this.profileAvatarUrls[appointment.user.id] = objectUrl;
        });
      });
      this.loading = false;
    });
  }

  getAllAppointmentsByDoctor(doctorId: number, codEntity: number): void {
    this.loading = true;
    this.appointmentService.getAllAppointments().subscribe(list => {
      /* Filtra las citas para incluir solo aquellas cuyo usuario tiene el doctorAsignated igual a doctorId 
      o se le ha asignado dicha cita en específico */
      this.originalAppointmentList = list.filter(appointment =>
        ((appointment.user && appointment.user.doctorAsignated &&
          appointment.user.doctorAsignated.id === doctorId) ||
        (appointment.doctorAsignated && appointment.doctorAsignated.id === doctorId)) && (appointment.user && appointment.user.codEntity === codEntity)
      );

      // Ordena primero por fecha y luego por hora y minutos
      this.appointmentList = this.originalAppointmentList.slice().sort((a, b) => {
        const dateA = new Date(a.bookDate);
        const dateB = new Date(b.bookDate);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        // Si las fechas son iguales, ordena por hora y minutos
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

      // Obtiene los avatares para los usuarios filtrados
      this.appointmentList.forEach(appointment => {
        if (appointment.user && appointment.user.id) {
          this.userService.getProfileAvatar(appointment.user.id).subscribe(blob => {
            const objectUrl = URL.createObjectURL(blob);
            this.profileAvatarUrls[appointment.user.id] = objectUrl;
          });
        }
      });

      this.loading = false;
    });
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
    Swal.fire({
      title: "¿Seguro/a que se ha completado este evento?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Completar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.isCompleted = !this.isCompleted;
        console.log(this.isCompleted)

        this.appointmentService.updateAppointment(id, this.isCompleted).subscribe(
          (_) => {
            Swal.fire("Cita completada", "", "success");
            this.ngOnInit();
            this.ngOnInit();
          },
          (error) => {
            Swal.fire("La cita no se ha podido actualizar", "", "error");
            this.ngOnInit();
            this.ngOnInit();
          }
        );

      } else if (result.isDenied) {
        this.ngOnInit();
      }
    });
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe();
    this.ngOnInit();
    console.log("Cita eliminada")
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

  showModalDelete(id: number) {
    Swal.fire({
      title: "Vas a eliminar la cita",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAppointment(id);
        Swal.fire("Eliminado", "", "success");
        this.ngOnInit();
      } else if (result.isDenied) {
      }
    });
  }

  togglePatientView(): void {
    if (this.showingAllAppointments) {
      this.getAllAppointmentsByDoctor(this.doctorAsignated, this.codEntity);
    } else {
      this.getAllAppointments();
    }
    this.showingAllAppointments = !this.showingAllAppointments;
  }
}
