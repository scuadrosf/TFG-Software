import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isSidebarOpen: boolean = true;

  constructor(private sidebarService: SidebarService, public authService: AuthService) { }

  ngOnInit(): void {
    // this.sidebarService.getSidebarState().subscribe(isOpen => {
    //   this.isSidebarOpen = isOpen;
    // });
  }
}
