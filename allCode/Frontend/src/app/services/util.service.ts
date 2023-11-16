import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private httpClient: HttpClient) { }


  exportPatientsPDF(): Observable<Blob>{
    return this.httpClient.get('/api/util/exportPatientsPDF', {responseType:'blob'});
  }
  
  exportAppointmentsPDF(): Observable<Blob>{
    return this.httpClient.get('/api/util/exportAppointmentsPDF', {responseType:'blob'});
  }
}
