import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Util } from '../models/util.model';
import { environment } from 'src/environments/environment.prod';


const baseUrl = environment.baseUrl+"/util/"
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
  exportInterventionsPDF(id: number): Observable<Blob> {
    return this.httpClient.get(baseUrl + 'exportInterventionsPDF/' + id, { responseType: 'blob' });
  }

  exportPatientsExcel(): Observable<Blob> {
    return this.httpClient.get(baseUrl + 'exportPatientsExcel', { responseType: 'blob' });
  }

  getAppointmentsCompletedYesterday(): Observable<number> {
    return this.httpClient.get<number>(baseUrl + "aptComplYest");
  }
  getnumPatientsYesterday(): Observable<number> {
    return this.httpClient.get<number>(baseUrl + "numPatientsYesterday");
  }
  getnumPatientsTotal(): Observable<number> {
    return this.httpClient.get<number>(baseUrl + "numPatientsTotal");
  }

  updateUtil(partialUtil: Util): Observable<Util> {
    return this.httpClient.put<Util>(baseUrl + "update", partialUtil);
  }
}
