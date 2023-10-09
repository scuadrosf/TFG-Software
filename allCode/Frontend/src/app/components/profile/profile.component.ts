import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: User | undefined;
  profileAvatarUrls!: string;

  constructor(public authService: AuthService, private userService: UserService){
    this.userService.getMe().subscribe((response) => {
      this.user = response;
    

    this.userService.getProfileAvatar(response.id).subscribe(blob => {
      const objectUrl = URL.createObjectURL(blob);
      this.profileAvatarUrls = objectUrl;
    });
  });
  }
}
