import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';


const baseUrl = '/api/appointments/';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  
  constructor(private httpClient: HttpClient) { }

  bookAppointment(appoitmentData: any, idUser: number): Observable<any>{
    return this.httpClient.post(baseUrl+"user="+idUser, appoitmentData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError('Book Appointment Error');
      })
    );
  }

  
  
}
