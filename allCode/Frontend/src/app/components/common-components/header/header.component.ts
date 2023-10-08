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
export class HeaderComponent implements OnInit{

  currentUser: User | undefined;
  isAdmin: boolean | undefined;
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router, private userService: UserService){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  
}
