import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Sort } from '@angular/material/sort';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { UtilService } from 'src/app/services/util.service';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, filter, forkJoin, map, of, startWith, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  loading: boolean = false;
  patientsList: User[] = [];
  profileAvatarUrls: string[] = [];
  page!: number;
  

  control = new FormControl();
  noResults: boolean = false


  constructor(public patientService: UserService, private router: Router, private utilService: UtilService) { }

  ngOnInit(): void {

    this.getAllUsers();

    this.observerChangeSearch();

  }

  getAllUsers(): void {
    this.loading = true;
    this.patientService.getUserList().subscribe((list) => {
      this.patientsList = list;
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

  goToProfile(id: number): any {
    this.router.navigate(['/profile/' + id])
  }

  deleteUser(user: User) {
    this.patientService.deleteUser(user);
    console.log("Usuario eliminado")
    this.ngOnInit();
  }

  exportPDF() {
    this.utilService.exportPatientsPDF().subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Pacientes_" + format(Date.now(), "yyyy-MM-dd") + ".pdf";
      link.click();
    });
  }

  exportExcel() {
    this.utilService.exportPatientsExcel().subscribe((data) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Pacientes_" + format(Date.now(), "yyyy-MM-dd") + ".xlsx";
      link.click();
    });
  }

  reload() {
    window.location.reload();
  }

  observerChangeSearch() {
    this.control.valueChanges
      .pipe(
        // startWith(''),
        debounceTime(500),
        switchMap(query => {
          this.loading = true;
          if (query.trim().length === 0) {
            this.noResults = false;
            return this.patientService.getUserList();
          } else {
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

  showModalDelete(user: User) {
    Swal.fire({
      title: "Vas a eliminar el paciente",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(user);
        Swal.fire("Eliminado", "", "success");
        this.ngOnInit();
        this.ngOnInit();
      } else if (result.isDenied) {
      }
    });
  }


}
