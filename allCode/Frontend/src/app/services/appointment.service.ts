import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Appointment } from '../models/appointment.model';


const baseUrl = '/api/appointments/';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  constructor(private httpClient: HttpClient) { }

  bookAppointment(appoitmentData: any, idUser: number): Observable<any> {
    return this.httpClient.post(baseUrl + "user=" + idUser, appoitmentData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError('Book Appointment Error');
      })
    );
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(baseUrl + "all");
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(baseUrl + id);
  }

  updateAppointment(id: number, completed: boolean): Observable<Appointment> {
    const params = new HttpParams().set('completed', completed.toString());
    return this.httpClient.put<Appointment>(baseUrl + "update/" + id, null, { params });
  }

  deleteAppointment(id: number) {
    return this.httpClient.delete(baseUrl + "delete/" + id);
  }

  updateFullAppointment(appointment: Appointment): Observable<any> {
    const formData = new FormData();
    formData.append('bookDate', appointment.bookDate || '');
    formData.append('fromDate', appointment.fromDate || '');
    formData.append('toDate', appointment.toDate || '');
    formData.append('description', appointment.description || '');
    formData.append('additionalNote', appointment.additionalNote || '');
    return this.httpClient.put(baseUrl + "fullupdate/" + appointment.id, formData);
  }
}
