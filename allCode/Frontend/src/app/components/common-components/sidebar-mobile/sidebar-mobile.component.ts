import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar-mobile',
  templateUrl: './sidebar-mobile.component.html',
  styleUrls: ['./sidebar-mobile.component.scss']
})
export class SidebarMobileComponent implements OnInit{

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.stopPropagation();
  }
  
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
      
  }
}
