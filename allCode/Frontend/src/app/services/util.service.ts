import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const baseUrl = "/api/util/"
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private httpClient: HttpClient) { }


  exportPatientsPDF(): Observable<Blob> {
    return this.httpClient.get(baseUrl + 'exportPatientsPDF', { responseType: 'blob' });
  }

  exportAppointmentsPDF(): Observable<Blob> {
    return this.httpClient.get(baseUrl + 'exportAppointmentsPDF', { responseType: 'blob' });
  }
  exportInterventionsPDF(): Observable<Blob> {
    return this.httpClient.get(baseUrl + 'exportInterventionsPDF', { responseType: 'blob' });
  }
}