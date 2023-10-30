import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const baseUrl = '/api/email/';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }


  sendEmail(email: string, pass: string){
    const formData = new FormData();
    formData.append('emailTo', email || '');
    formData.append('pass', pass || '');
    this.httpClient.post(baseUrl+"send", formData).subscribe();
  }
  sendEmailRecovery(email: string, pass: string){
    const formData = new FormData();
    formData.append('emailTo', email || '');
    formData.append('pass', pass || '');
    this.httpClient.post(baseUrl+"recovery", formData).subscribe();
  }
}
