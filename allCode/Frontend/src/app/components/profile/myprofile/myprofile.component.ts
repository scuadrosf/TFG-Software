import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intervention } from 'src/app/models/intervention.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html'
})
export class MyprofileComponent {

  user!: User;
  profileAvatarUrls!: string;
  isAdmin: boolean = false;

  interventions: Intervention[] = [];

  constructor(public authService: AuthService, private interventionService: InterventionService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getMe().subscribe((response) => {
      this.user = response;

      this.userService.getProfileAvatar(response.id).subscribe(blob => {
        const objectUrl = URL.createObjectURL(blob);
        this.profileAvatarUrls = objectUrl;
      });

      // this.interventionService.getUserInterventions(this.user.id).subscribe(list => {
      //   this.interventions = list;
      //   console.log("AQUI " + this.interventions);
      // });
      if (this.authService.isAdmin()){
        this.isAdmin=true;
      }
    });
  }
}
