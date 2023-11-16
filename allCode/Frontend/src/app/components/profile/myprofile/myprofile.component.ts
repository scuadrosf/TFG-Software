import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Intervention } from 'src/app/models/intervention.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(public authService: AuthService, private interventionService: InterventionService, private userService: UserService, private utilService: UtilService) {

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
    });
  }

  exportPDF() {
    this.utilService.exportInterventionsPDF().subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download ="Intervenciones_"+format(Date.now(), "yyyy-MM-dd")+".pdf";
      link.click();
    });
  }
}
