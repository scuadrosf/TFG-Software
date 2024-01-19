import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { debounceTime, forkJoin, map, of, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-appointment-main',
  templateUrl: './add-appointment-main.component.html'
})
export class AddAppointmentMainComponent implements OnInit {

  loading: boolean = false;
  patientsList: User[] = [];
  profileAvatarUrls: string[] = [];
  noResults: boolean = false
  page!: number;
  showingAllUsers!: boolean;
  doctorAsignated!: number;
  control = new FormControl();


  constructor(private patientService: UserService) { }

  ngOnInit(): void {
    this.showingAllUsers = false;

    this.patientService.getMe().subscribe((response) => {
      this.doctorAsignated = response.id;
      this.getAllUsersByDoctor(this.doctorAsignated);
    });

    this.observerChangeSearch();
  }

  getAllUsers(): void {
    this.loading = true;
    this.patientService.getUserList().subscribe((list) => {
      this.patientsList = list.filter(patient =>
        patient.roles.length === 1 && patient.roles.includes('USER'));
      // Usar forkJoin para esperar todas las llamadas a getProfileAvatar
      forkJoin(
        this.patientsList.map(patient =>
          this.patientService.getProfileAvatar(patient.id).pipe(
            switchMap(blob => {
              const objectUrl = URL.createObjectURL(blob);
              this.profileAvatarUrls[patient.id] = objectUrl;
              return of(patient); // Devuelve el usuario después de manejar el avatar
            })
          )
        )
      ).subscribe(
        () => {
          this.loading = false;
        },
        (error) => {
          console.error('Error:', error);
          this.loading = false;
        }
      );
    });
  }

  getAllUsersByDoctor(doctorId: number): void {
    this.loading = true;

    this.patientService.getUserListByDoctor(doctorId).subscribe((list) => {
      this.patientsList = list.filter(patient =>
        patient.roles.length === 1 && patient.roles.includes('USER'));
      // Usar forkJoin para esperar todas las llamadas a getProfileAvatar
      forkJoin(
        this.patientsList.map(patient =>
          this.patientService.getProfileAvatar(patient.id).pipe(
            switchMap(blob => {
              const objectUrl = URL.createObjectURL(blob);
              this.profileAvatarUrls[patient.id] = objectUrl;
              return of(patient); // Devuelve el usuario después de manejar el avatar
            })
          )
        )
      ).subscribe(
        () => {
          this.loading = false;
        },
        (error) => {
          console.error('Error:', error);
          this.loading = false;
        }
      );
    });
  }

  togglePatientView(): void {
    if (this.showingAllUsers) {
      this.getAllUsersByDoctor(this.doctorAsignated);
    } else {
      this.getAllUsers();
    }
    this.showingAllUsers = !this.showingAllUsers;
  }

  observerChangeSearch() {
    this.control.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(query => {
          this.loading = true;

          // Si la longitud de la consulta es 0
          if (query.trim().length === 0) {
            this.noResults = false;

            // Si 'showingAllUsers' es true, muestra todos los usuarios; de lo contrario, muestra usuarios por doctor
            if (this.showingAllUsers) {
              return this.patientService.getUserList().pipe(
                map(list => list.filter(patient =>
                  patient.roles.length === 1 && patient.roles.includes('USER'))
                )
              );
            } else {
              return this.patientService.getUserListByDoctor(this.doctorAsignated).pipe(
                map(list => list.filter(patient =>
                  patient.roles.length === 1 && patient.roles.includes('USER'))
                )
              );
            }
          } else {
            // Si la consulta tiene contenido, realiza una búsqueda por nombre, apellido o username
            this.noResults = false;
            return this.patientService.getUsersByNameOrLastNameOrUsername(query);
          }
        })
      )
      .subscribe(result => {
        if (result.length === 0) {
          this.noResults = true;
        }
        this.patientsList = result;
        this.loading = false;
      });
  }

}
