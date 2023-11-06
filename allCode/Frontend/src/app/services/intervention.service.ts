import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Intervention } from '../models/intervention.model';
import { Observable, catchError, throwError } from 'rxjs';
import { Appointment } from '../models/appointment.model';

const baseUrl = '/api/interventions/';


@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(private httpClient: HttpClient) { }

  getIntervention(id: number): Observable<Intervention> {
    return this.httpClient.get<Intervention>(baseUrl + 'each/' + id)
  }

  getUserInterventions(id: number): Observable<Intervention[]> {
    return this.httpClient.get<Intervention[]>(baseUrl + id)
  }

  getAppointmentList(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>('/api/appointments/all')
  }

  getAllAppointmentsByUser(id: number): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>("/api/appointments/all/" + id);
  }

  addIntervention(idAppointment: number, idUser: number, formData: FormData): Observable<any> {
    // const formData = new FormData();
    // formData.append('type', type || '');
    return this.httpClient.post(baseUrl + idAppointment + "/user=" + idUser, formData);
  }

  updateIntervention(intervention: Intervention): Observable<any> {
    const formData = new FormData();
    formData.append('type', intervention.type || '');
    return this.httpClient.put(baseUrl + 'update/' + intervention.id, formData);
  }

  deleteIntervention(intervention: Intervention) {
    return this.httpClient.delete(baseUrl + 'delete/' + intervention.id).subscribe();
  }
}
