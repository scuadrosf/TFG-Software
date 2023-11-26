import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../models/document.model';
import { Intervention } from '../models/intervention.model';


const baseUrl = '/api/documents/';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) { }

  downloadDocument(documentId: number): Observable<Blob>{
    return this.httpClient.get(baseUrl+documentId, {responseType: 'blob'});
  }

  getAllDocumentsByUserId(userId: number): Observable<Document[]>{
    return this.httpClient.get<Document[]>(baseUrl+"all/"+userId);
  }

  deleteDocument(document: Document){
    return this.httpClient.delete(baseUrl + 'delete/' + document.id).subscribe();
  }

  getInterventionByDocumentId(documentId: number): Observable<Intervention>{
    return this.httpClient.get<Intervention>(baseUrl+documentId+"/intervention")
  }
}
