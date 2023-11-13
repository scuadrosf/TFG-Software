import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Document } from 'src/app/models/document.model';
import { InterventionService } from 'src/app/services/intervention.service';


@Component({
  selector: 'app-documents-of-intervention',
  templateUrl: './documents-of-intervention.component.html'
})
export class DocumentsOfInterventionComponent implements OnInit {

  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  // pdfSrc = "https://www.turnerlibros.com/wp-content/uploads/2021/02/ejemplo.pdf";
  pdfSrc: any;

  document: Document | undefined;

  interventionId!: number;

  // Show all documents of THAT intervention

  constructor(private interventionService: InterventionService, private activatedRoute: ActivatedRoute) {
    // (window as any)["pdfWorkerSrc2.14.305"] = 'Frontend/src/app/components/documents/documents-of-intervention/pdf.worker.min.js';

   }

  ngOnInit(): void {
    this.interventionId = this.activatedRoute.snapshot.params['idIntervention'];
    this.interventionService.getDocumentsByIntervention(this.interventionId).subscribe(
      
      (document: Document) =>{
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
        }else{
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
}
