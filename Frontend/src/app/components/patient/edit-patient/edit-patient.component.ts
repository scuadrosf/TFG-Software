import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html'
})

export class EditPatientComponent {

  userId!: number;
  user!: User;
  profileAvatarUrls!: string
  address!: string
  city!: string
  country!: string
  postalCode!: string
  phone!: string
  avatarFile!: File;

  constructor(private router: Router, private userService: UserService, public authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(this.userId).subscribe((response) => {
      this.user = response;


      this.userService.getProfileAvatar(response.id).subscribe(blob => {
        const objectUrl = URL.createObjectURL(blob);
        this.profileAvatarUrls = objectUrl;
      });
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.avatarFile = event.target.files[0];
    }

  }

  editUser() {
    const confirm = window.confirm("¿Desea confirmar los cambios?")
    if (confirm) {
      if (this.user) {
        if (this.address)
          this.user.address = this.address;
        if (this.city)
          this.user.city = this.city;
        if (this.country)
          this.user.country = this.country;
        if (this.postalCode)
          this.user.postalCode = this.postalCode;
        if (this.phone)
          this.user.phone = this.phone;
        this.userService.updateUser(this.user, this.avatarFile).subscribe(
          (_) => {
            console.log(this.user);
            this.ngOnInit();
            window.history.back();
          },
        );
      }
    } else {
      console.log("Cancelado por el usuario");
    }
  }

}

