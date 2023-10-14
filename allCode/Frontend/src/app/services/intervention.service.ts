import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Intervention } from '../models/intervention.model';
import { Observable } from 'rxjs';

const baseUrl = '/api/interventions/';


@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(private httpClient: HttpClient) { }

  getUserInterventions(id: number): Observable<Intervention[]>{
    return this.httpClient.get<Intervention[]>(baseUrl + id)
  }
}
