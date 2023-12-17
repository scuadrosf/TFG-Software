import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Document } from 'src/app/models/document.model';
import { Intervention } from 'src/app/models/intervention.model';
import { User } from 'src/app/models/user.model';
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

  interventions: Intervention[] = [];
  documents: Document[] = [];


  constructor(private documentService: DocumentService, public authService: AuthService, private interventionService: InterventionService, private userService: UserService, private utilService: UtilService) {

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
        this.interventions = list;
      });

      this.documentService.getAllDocumentsByUserId(this.user.id).subscribe((list: Document[]) => {
        this.documents = list;
      })
    });
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
}
