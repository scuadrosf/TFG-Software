import { Component, OnInit } from '@angular/core';
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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  selectedFile: File | null = null;
  selectedFileName: string = '';
  page!: number;
  page2!: number;

  user!: User;
  idUser!: number;
  profileAvatarUrls!: string;
  isAdmin: boolean = false;
  doctorAsignated!: User;

  appointmentsUser: Appointment[] = [];
  interventions: Intervention[] = [];
  documents: Document[] = [];

  selectedDocumentId!: number;

  constructor(private appointmentService: AppointmentService, private documentService: DocumentService, private utilService: UtilService, public authService: AuthService, private interventionService: InterventionService, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.idUser = this.activatedRoute.snapshot.params['id'];

  }

  showChangeDocumentModalById(documentId: any): void {
    this.selectedDocumentId = documentId;
  }

  ngOnInit(): void {
    this.userService.getUser(this.idUser).subscribe((response) => {
      this.user = response;

      this.userService.getProfileAvatar(response.id).subscribe(blob => {
        const objectUrl = URL.createObjectURL(blob);
        this.profileAvatarUrls = objectUrl;
      });

      this.userService.checkAdmin(this.idUser).subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      });

      this.interventionService.getUserInterventions(this.idUser).subscribe((list: Intervention[]) => {
        this.interventions = list;
      });

      this.documentService.getAllDocumentsByUserId(this.idUser).subscribe((list: Document[]) => {
        this.documents = list;
      })

      this.appointmentService.getAllAppointmentsByUser(this.idUser).subscribe(list =>
        this.appointmentsUser = list)

      this.userService.getDoctorAsignated(this.user.id).subscribe(doctor =>
        this.doctorAsignated = doctor)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile?.name || '';
  }

  completeAppointment(appointment: Appointment, status: boolean) {
    this.appointmentService.updateAppointment(appointment.id, !status).subscribe();
    this.ngOnInit();
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

  deleteIntervention(intervention: Intervention) {
    Swal.fire({
      title: "¿Esta seguro de eliminar la intervencion?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.interventionService.deleteIntervention(intervention);
        Swal.fire("Eliminado", "", "success");
        console.log("Intervention eliminado")
        this.ngOnInit();
        this.ngOnInit();
      } else if (result.isDenied) {
        console.log("Confirmación de eliminado cancelada")
      }
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

  deleteDocument(document: Document) {
    Swal.fire({
      title: "¿Esta seguro de eliminar el documento?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.deleteDocument(document);
        Swal.fire("Eliminado", "", "success");
        console.log("Document eliminado")
        this.ngOnInit();
        this.ngOnInit();
      } else if (result.isDenied) {
        console.log("Confirmación de eliminado cancelada")
      }
    });
  }

  submit() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
      this.documentService.updateDocument(this.selectedDocumentId, this.idUser, formData).subscribe(
        (_) => {
          window.location.reload();
        }
      )
    }
    else
      window.history.back();
    window.location.reload();
  }
}
