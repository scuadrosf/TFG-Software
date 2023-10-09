import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  // styles: ['.sidebar{display:block;}']

})
export class SidebarComponent implements OnInit {
  isSidebarOpen: boolean = true;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.getSidebarState().subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }
}
