import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Document } from 'src/app/models/document.model';
import { InterventionService } from 'src/app/services/intervention.service';


@Component({
  selector: 'app-documents-of-intervention',
  templateUrl: './documents-of-intervention.component.html'
})
export class DocumentsOfInterventionComponent implements OnInit {

  documents: Document[] = [];

  interventionId!: number;

  // Show all documents of THAT intervention

  constructor(private interventionService: InterventionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.interventionId = this.activatedRoute.snapshot.params['idIntervention'];

    this.interventionService.getDocumentsByIntervention(this.interventionId).subscribe(list =>
      this.documents = list)
  }

  back() {
    window.history.back();
  }
}
