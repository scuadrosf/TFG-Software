import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html'
})
export class DashboardsComponent implements OnInit {
  isAdmin: boolean = false
  currentUser!: User

  constructor(public authService: AuthService) {
    this.currentUser = this.authService.currentUser()


  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    // if (this.currentUser.roles.indexOf('ADMIN')) {
    //   this.isAdmin = true
    // } else {
    //   this.isAdmin = false;
    // }
    console.log(this.isAdmin)
  }


}
