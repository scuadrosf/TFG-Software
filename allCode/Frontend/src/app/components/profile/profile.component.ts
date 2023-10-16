import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  user!: User;
  idUser!: number;
  profileAvatarUrls!: string;
  isAdmin: boolean = false;

  interventions: Intervention[] = [];

  constructor(public authService: AuthService, private interventionService: InterventionService, private userService: UserService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.params['id'];
    // console.log(this.authService.isUser())
    this.userService.getUser(this.idUser).subscribe((response) => {
      this.user = response;

      this.userService.getProfileAvatar(response.id).subscribe(blob => {
        const objectUrl = URL.createObjectURL(blob);
        this.profileAvatarUrls = objectUrl;
      });

      this.userService.checkAdmin(this.idUser).subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      })

      // this.interventionService.getUserInterventions(this.user.id).subscribe(list => {
      //   this.interventions = list;
      //   console.log("AQUI " + this.interventions);
      // });
      // if (this.userService.checkAdmin(this.idUser)){
      //   this.isAdmin=true;
      // }
    });
    console.log(this.isAdmin);
  }
}
