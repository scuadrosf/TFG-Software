import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Intervention } from '../models/intervention.model';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { Document } from '../models/document.model';
import { environment } from 'src/environments/environment.prod';

const baseUrl = environment.baseUrl+'/interventions/';


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

  getDocumentByIntervention(interventionId: number): Observable<Document> {
    return this.httpClient.get<Document>(baseUrl + interventionId + '/document')
  }

  getAppointmentList(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(environment.baseUrl + '/appointments/all')
  }

  getAllAppointmentsByUser(id: number): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(environment.baseUrl + '/appointments/all/' + id);
  }

  addIntervention(idAppointment: number, idUser: number, formData: FormData): Observable<any> {
    return this.httpClient.post(baseUrl + idAppointment + "/user=" + idUser, formData);
  }

  updateIntervention(interventionId: number, userId: number, formData: FormData): Observable<any> {
    return this.httpClient.put(baseUrl + 'update/' + interventionId + "/user=" + userId, formData);
  }

  deleteIntervention(intervention: Intervention) {
    return this.httpClient.delete(baseUrl + 'delete/' + intervention.id).subscribe();
  }

  getAllInterventions(): Observable<Intervention[]> {
    return this.httpClient.get<Intervention[]>(baseUrl + "all")
  }

}
