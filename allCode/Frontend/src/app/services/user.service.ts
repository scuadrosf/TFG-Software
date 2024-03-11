import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


const baseUrl = environment.baseUrl+'/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) { }

  getMe(): Observable<User> {
    return this.httpClient.get<User>(baseUrl + "me") as Observable<User>
  }

  getProfileAvatar(userId: number): Observable<Blob> {
    return this.httpClient.get((baseUrl + 'profileAvatarFile/' + userId), { responseType: 'blob' });
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(baseUrl + 'userList');
  }

  getUserListByDoctor(doctorId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(baseUrl + 'userList/doctor='+doctorId);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(baseUrl + id);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(baseUrl + "email/" + email);
  }

  getUserByName(name: string): Observable<User> {
    return this.httpClient.get<User>(baseUrl + "name/" + name);
  }

  updateUser(updatedUser: User, profileAvatarFile?: File): Observable<any> {
    const formData = new FormData();
    formData.append('address', updatedUser.address || '');
    formData.append('city', updatedUser.city || '');
    formData.append('country', updatedUser.country || '');
    formData.append('postalCode', updatedUser.postalCode || '');
    formData.append('phone', updatedUser.phone || '');
    if (profileAvatarFile) {
      formData.append('profileAvatarFile', profileAvatarFile);
    }

    return this.httpClient.put(baseUrl + updatedUser.id, formData).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updatePassword(updatedUser: User): Observable<any> {
    const formData = new FormData();
    formData.append('password', updatedUser.encodedPassword || '');
    console.log(formData.get("password"))
    return this.httpClient.put(baseUrl + "pass/" + updatedUser.id, formData).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  checkCurrentPassword(currentPassword: string, user: User): Observable<boolean> {
    const formData = new FormData();
    formData.append('password', currentPassword);
    return this.httpClient.post<boolean>(baseUrl + "check-password/"+ user.id, formData);
  }

  deleteUser(user: User) {
    return this.httpClient.delete(baseUrl + user.id).subscribe();
  }

  checkAdmin(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(baseUrl + 'rol/' + id);
  }

  checkDoctor(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(baseUrl + 'rolD/' + id);
  }


  getUsersByNameOrLastNameOrUsername(query: string): Observable<User[]> {
    return this.httpClient.get<User[]>(baseUrl + "search?query=" + query);
  }
  
  getDoctorAsignated(id: number){
    return this.httpClient.get<User>(baseUrl+"doctorAsignated/"+id);
  }

  getUsersByCodEntity(codEntity: number): Observable<User[]> {
    return this.httpClient.get<User[]>(baseUrl+"cod/"+codEntity)
  }


}
