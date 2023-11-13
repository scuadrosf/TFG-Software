import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Appointment } from 'src/app/models/appointment.model';
import { Document } from 'src/app/models/document.model';
import { Intervention } from 'src/app/models/intervention.model';
import { InterventionService } from 'src/app/services/intervention.service';
import { AddAppointmentMainComponent } from '../../appointment/add-appointment-main/add-appointment-main.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DocumentService } from 'src/app/services/document.service';


@Component({
  selector: 'app-documents-of-intervention',
  templateUrl: './documents-of-intervention.component.html'
})
export class DocumentsOfInterventionComponent implements OnInit {

  pdfSrc: any;

  document!: Document;
  intervention!: Intervention;
  appointment!: Appointment;

  interventionId!: number;

  // Show document of THAT intervention

  constructor(private documentService: DocumentService, private interventionService: InterventionService, private activatedRoute: ActivatedRoute, private appointmentService: AppointmentService) {

  }

  ngOnInit(): void {
    this.interventionId = this.activatedRoute.snapshot.params['idIntervention'];
    this.interventionService.getIntervention(this.interventionId).subscribe(intervention =>
      this.intervention = intervention);

    this.appointmentService.getAppointmentByInterventionId(this.interventionId).subscribe(appointment =>
      this.appointment = appointment);

    this.interventionService.getDocumentByIntervention(this.interventionId).subscribe(

      (document: Document) => {
        this.document = document;
        console.log(document);
        if (document.file instanceof Uint8Array) {
          // Si document.file ya es un Uint8Array se usa directamente
          this.pdfSrc = document.file;
        } else if (typeof document.file === 'string') {
          // Decodifica la cadena Base64 a un Uint8Array
          const byteCharacters = atob(document.file);
          const byteArray = new Uint8Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
          }

          // Asigna el Uint8Array al pdfSrc
          this.pdfSrc = byteArray;
        } else {
          console.error('El campo "file" no es un array de bytes o una cadena Base64')
        }
      },
      error => {
        console.error("Error al obtener el documento PDF", error);
      });
  }

  back() {
    window.history.back();
  }

  download(){
    this.documentService.downloadDocument(this.document.id).subscribe(blob =>{
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = this.document.fileName;
      link.click();
    });
  }
}
