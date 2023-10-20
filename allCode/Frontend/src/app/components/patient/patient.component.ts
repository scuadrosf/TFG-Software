import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Sort } from '@angular/material/sort';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit{

  patientsList: User[] = [];
  profileAvatarUrls: string[] = [];


  constructor(private patientService: UserService, private router: Router){}

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

  public sortData(sort: Sort) {
    const data = this.patientsList.slice();

    if (!sort.active || sort.direction === '') {
      this.patientsList = data;
    } else {
      this.patientsList = data.sort((a, b) => {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  goToProfile(id:number): any {
    this.router.navigate(['/profile/'+id])
  }

}
