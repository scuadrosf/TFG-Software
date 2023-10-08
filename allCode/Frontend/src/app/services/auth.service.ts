import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';


const BASE_URL = '/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | undefined;

  constructor(private httpClient: HttpClient) {
  }

  private loggedIn = new BehaviorSubject<boolean>(false);

  reqIsLogged() {
    try {
      this.httpClient.get('/api/users/me').subscribe(
        response => {
          this.user = response as User;
          this.loggedIn.next(true);
        },
        error => {
          console.error('Error occurred during request:', error);
          alert('No se pudo iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
        }
      );
    } catch (error) {
      console.error('Something went wrong:', error);
      alert('No se pudo iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  register(userData: any): Observable<any> {
    return this.httpClient.post("/api/users/", userData)
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
        this.loggedIn.next(false);
        this.user = undefined;
      });
  }

}
