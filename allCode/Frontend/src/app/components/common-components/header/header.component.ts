import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUserId!: number;
  nameUser: string[] = [];
  lastNameUser: string[] = [];
  isAdmin!: boolean;
  loggedIn: boolean = false;

  profileAvatarUrls!: string;
  avatarFile: File[] = [];

  constructor(public authService: AuthService, private httpClient: HttpClient, private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe((response) => {
      

    //   this.userService.checkAdmin(this.currentUser).subscribe(isAdmin => {
    //     this.isAdmin = isAdmin;
    //   });

    //   this.authService.isLoggedIn.subscribe((isLoggedIn) => {
    //     this.loggedIn = isLoggedIn;
    //   });

      this.userService.getProfileAvatar(response.id).subscribe(blob => {
        this.profileAvatarUrls = URL.createObjectURL(blob);
        // this.profileAvatarUrls[response.id] = objectUrl;
      });
    });


    //   console.log("AQUI " + this.loggedIn);
    // });
  }

  currentUser() {
    return this.authService.currentUser();
  }


  logout() {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }


}
