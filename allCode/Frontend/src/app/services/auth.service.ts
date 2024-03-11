import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


const BASE_URL = environment.baseUrl+'/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId!: number;
  user: User | undefined;
  userAux!: User;
  logged: boolean = false;
  profileAvatarUrls!: string;

  constructor(private httpClient: HttpClient, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.userId = activatedRoute.snapshot.params['id'];
    this.reqIsLogged();
  }

  private loggedIn = new BehaviorSubject<boolean>(false);

  reqIsLogged() {
    this.httpClient.get(environment.baseUrl+'/users/me', { withCredentials: true }).subscribe(
      response => {
        this.user = response as User;
        this.userAux = response as User;
        this.logged = true
      },
      _ => {
        throw new Error('Something bad happened');
      });
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  register(userData: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl+"/users/", userData)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          return throwError('Register Error');
        })
      );
  }

  registerDoctor(userData: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "/users/doctor", userData)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          return throwError('Register Error');
        })
      );
  }
  registerEntity(userData: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "/users/admin", userData)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          return throwError('Register Error');
        })
      );
  }

  logIn(user: string, pass: string): Observable<any> {
    return this.httpClient.post(BASE_URL + "login", { username: user, password: pass }, { withCredentials: true })
      .pipe(
        map((response: any) => {
          this.reqIsLogged();
          return response;
        }),
        catchError((error: any) => {
          return throwError('user not exist');
        })
      );
  }

  logOut() {
    return this.httpClient.post(BASE_URL + 'logout', { withCredentials: true })
      .subscribe((response: any) => {
        console.log(this.user);
        this.loggedIn.next(false);
        this.user = undefined;
        console.log(this.user);
        window.location.reload();
      });
  }

  isLogged() {
    return this.logged;
  }

  isAdmin() {
    return this.isLogged() && this.user?.roles.indexOf('ADMIN') !== -1;
  }
  isSuperAdmin() {
    return this.isLogged() && this.user?.roles.indexOf('ADMIN') !== -1 && this.user?.roles.length === 1;
  }
  isDoctor(){
    return this.isLogged() && this.user?.roles.indexOf('DOCTOR') !== -1;
  }

  isUser() {
    return !this.userService.checkAdmin(this.userId);
    // CheckAdmin returns false if is USER and returns true if is ADMIN
  }

  currentUser() {
    return this.userAux;
  }


}
