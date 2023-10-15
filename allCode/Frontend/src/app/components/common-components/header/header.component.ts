import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  nameUser: string | undefined;
  isAdmin!: boolean;
  user: User | undefined;

  profileAvatarUrls: string | undefined;
  avatarFile: File[] = [];

  constructor(public authService: AuthService, private router: Router, public userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getMe().subscribe((response) => {
      this.user = response;
      this.nameUser = response.name;


      this.userService.getProfileAvatar(response.id).subscribe(blob => {
        const objectUrl = URL.createObjectURL(blob);
        this.profileAvatarUrls = objectUrl;
      });
    });
  }

  currentUser() {
    return this.authService.currentUser();
  }


  logout() {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

  myProfile() {
    this.router.navigate(['/profile'])
  }
  settings() {
    this.router.navigate(['/settings'])
  }

  // onToggleSideBar(): void {
  //   this.sidebarService.toggleSidebar();
  // }
}
