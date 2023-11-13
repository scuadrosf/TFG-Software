import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const baseUrl = '/api/documents/';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) { }

  downloadDocument(documentId: number): Observable<Blob>{
    return this.httpClient.get(baseUrl+documentId, {responseType: 'blob'});
  }
}
