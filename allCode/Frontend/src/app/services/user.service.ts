import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, catchError, map, throwError } from 'rxjs';


const baseUrl = '/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) { }

  getMe(): Observable<User> {
    return this.httpClient.get<User>(baseUrl + "/me") as Observable<User>
  }

  getProfileAvatar(userId: number): Observable<Blob> {
    return this.httpClient.get((baseUrl + '/profileAvatarFile/' + userId), { responseType: 'blob' });
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(baseUrl + '/userList');
  }

  editUser(user: User, profileAvatarFile?: File): Observable<any> {

    const formData = new FormData();
    formData.append('name', user.name || '');
    formData.append('lastName', user.lastName || '');
    if (profileAvatarFile) {
      formData.append('profileAvatarFile', profileAvatarFile);
    }

    return this.httpClient.post('/api/users/' + user.id, formData).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteUser(user: User) {
    return this.httpClient.delete('/api/users/' + user.id).subscribe();
  }

  checkAdmin(user: User): Observable<boolean> {
    return this.httpClient.get<boolean>('/api/users/rol/' + user.id);
  }
}
