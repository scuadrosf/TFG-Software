import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {

  userId!: number;
  user!: User;
  profileAvatarUrls!: string
  address!: string
  city!: string
  country!: string
  postalCode!: string
  phone!: string
  avatarFile!: File;
  newPassword!: string;
  confirmNewPassword!: string;
  currentPassword!: string;
  currentPasswordInDB!: string;

  constructor(private router: Router, private userService: UserService, public authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getMe().subscribe((response) => {
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

  changePassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      Swal.fire("Las contraseñas no coinciden", "", "warning");
      return;
    } else {
      this.userService.checkCurrentPassword(this.currentPassword, this.user).subscribe(isCorrect => {
        if (!isCorrect) {
          Swal.fire("La contraseña actual es incorrecta", "", "error");
          return;
        } else {
          this.user.encodedPassword = this.newPassword;
          console.log(this.user.encodedPassword)
          this.userService.updatePassword(this.user).subscribe(
            (_) => {
              Swal.fire("Contraseña actualizada", "", "success")
              window.history.back();
            },
            (error) => {
              Swal.fire("Error al actualizar la contraseña", "", "error");
            }
          );
        }
      });
    }
  }



  editUser() {
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
  }

}
