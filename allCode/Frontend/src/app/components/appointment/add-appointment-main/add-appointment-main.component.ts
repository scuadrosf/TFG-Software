import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { PatientComponent } from '../../patient/patient.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-appointment-main',
  templateUrl: './add-appointment-main.component.html',
  styleUrls: ['./add-appointment-main.component.scss']
})
export class AddAppointmentMainComponent implements OnInit {

  patientsList: User[] = [];
  profileAvatarUrls: string[] = [];

  constructor(private patientService: UserService){}

  ngOnInit(): void {
    this.patientService.getUserList().subscribe((list) => {
      this.patientsList = list;
      this.patientsList.forEach(patient => {
        this.patientService.getProfileAvatar(patient.id).subscribe(blob => {
          const objectUrl = URL.createObjectURL(blob);
          this.profileAvatarUrls[patient.id] = objectUrl;
        });
      });
    });
    
}
}
