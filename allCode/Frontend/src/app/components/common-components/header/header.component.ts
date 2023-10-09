import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/side-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  isSideBarOpen: boolean = false;

  currentUserId!: number;
  nameUser: string[] = [];
  lastNameUser: string[] = [];
  isAdmin!: boolean;

  profileAvatarUrls!: string;
  avatarFile: File[] = [];

  constructor(public authService: AuthService, private sidebarService: SidebarService, private router: Router, public userService: UserService) { }

  ngOnInit(): void {

    this.userService.getMe().subscribe((response) => {
      this.userService.getProfileAvatar(response.id).subscribe(blob => {
        this.profileAvatarUrls = URL.createObjectURL(blob);
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

  onToggleSideBar(): void {
    this.sidebarService.toggleSidebar();
  }

}
