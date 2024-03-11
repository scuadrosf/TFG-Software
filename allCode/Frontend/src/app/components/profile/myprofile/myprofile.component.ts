import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Appointment } from 'src/app/models/appointment.model';
import { Document } from 'src/app/models/document.model';
import { Intervention } from 'src/app/models/intervention.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html'
})
export class MyprofileComponent {

  user!: User;
  profileAvatarUrls!: string;
  isAdmin: boolean = false;
  page!: number;

  appointmentsUser: Appointment[] = [];
  interventions: Intervention[] = [];
  documents: Document[] = [];
  doctorAsignated!: User;


  constructor(private appointmentService: AppointmentService, private documentService: DocumentService, public authService: AuthService, private interventionService: InterventionService, private userService: UserService, private utilService: UtilService) {

  }

  ngOnInit(): void {
    this.userService.getMe().subscribe((response) => {
      this.user = response;

      this.userService.getProfileAvatar(response.id).subscribe(blob => {
        const objectUrl = URL.createObjectURL(blob);
        this.profileAvatarUrls = objectUrl;
      });

      this.userService.checkAdmin(this.user.id).subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      });

      this.interventionService.getUserInterventions(this.user.id).subscribe((list: Intervention[]) => {
        this.interventions = list.slice().sort((a, b) => {
          const dateA = new Date(a.interventionDate);
          const dateB = new Date(b.interventionDate);

          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return 0;
        });      });

      this.documentService.getAllDocumentsByUserId(this.user.id).subscribe((list: Document[]) => {
        this.documents = list.slice().sort((a, b) => {
          const dateA = new Date(a.creationDate);
          const dateB = new Date(b.creationDate);

          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return 0;
        });
      });

      this.appointmentService.getAllAppointmentsByUser(this.user.id).subscribe(list => {
        this.appointmentsUser = list.slice().sort((a, b) => {
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
        });      });

      this.userService.getDoctorAsignated(this.user.id).subscribe(doctor => {
        this.doctorAsignated = doctor;
      });
    });
  }

  exportPDF() {
    this.utilService.exportInterventionsPDF(this.user.id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Intervenciones_" + format(Date.now(), "yyyy-MM-dd") + ".pdf";
      link.click();
    });
  }

  download(documentId: number) {
    this.documentService.downloadDocument(documentId).subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = '_blank';
      link.click();
    });
  }
}
