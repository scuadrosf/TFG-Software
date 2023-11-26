import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Appointment } from 'src/app/models/appointment.model';
import { Document } from 'src/app/models/document.model';
import { Intervention } from 'src/app/models/intervention.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  user!: User;
  idUser!: number;
  profileAvatarUrls!: string;
  isAdmin: boolean = false;
  
  apointment!: Appointment | null;
  interventions: Intervention[] = [];
  documents: Document[] = [];


  constructor(private documentService: DocumentService, private utilService: UtilService, public authService: AuthService, private interventionService: InterventionService, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.idUser = this.activatedRoute.snapshot.params['id'];

  }

  ngOnInit(): void {
    // console.log(this.authService.isUser())
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

      this.documentService.getAllDocumentsByUserId(this.user.id).subscribe((list: Document[]) => {
        this.documents = list;
      })
    });

  }  

  deleteIntervention(intervention: Intervention){
    const confirmation = window.confirm('Esta seguro de eliminar la intervención');
    if (confirmation) {
      this.interventionService.deleteIntervention(intervention);
      console.log("Intervention eliminado")
      this.ngOnInit();
      // window.location.reload();
    }
    else {
      console.log("Confirmación de eliminado cancelada")
    }
    this.ngOnInit();
  }
  
  exportPDF() {
    this.utilService.exportInterventionsPDF(this.user.id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download ="Intervenciones_"+format(Date.now(), "yyyy-MM-dd")+".pdf";
      link.click();
    });
  }

  download(documentId: number){
    this.documentService.downloadDocument(documentId).subscribe(blob =>{
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = '_blank';
      link.click();
    });
  }

  deleteDocument(document: Document){
    const confirmation = window.confirm('Esta seguro de eliminar el documento');
    if (confirmation) {
      this.documentService.deleteDocument(document);
      console.log("Document eliminado")
      this.ngOnInit();
      // window.location.reload();
    }
    else {
      console.log("Confirmación de eliminado cancelada")
    }
    this.ngOnInit();
  }
}
