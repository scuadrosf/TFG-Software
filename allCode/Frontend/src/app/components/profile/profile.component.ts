import { Component, OnInit } from '@angular/core';
import { Intervention } from 'src/app/models/intervention.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  user: User | undefined;
  profileAvatarUrls!: string;

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

      this.interventionService.getUserInterventions(this.user.id).subscribe(list => {
        this.interventions = list;
        console.log("AQUI " + this.interventions);
      });
    });
  }
}
