import { RouterModule } from "@angular/router"
import { LoginComponent } from "./components/login/login.component"
import { DashboardsComponent } from "./components/dashboards/dashboards.component"
import { SettingsComponent } from "./components/settings/settings.component"
import { ProfileComponent } from "./components/profile/profile.component"
import { EditProfileComponent } from "./components/profile/edit-profile/edit-profile.component"
import { PatientComponent } from "./components/patient/patient.component"
import { AddPatientComponent } from "./components/patient/add-patient/add-patient.component"
import { EditPatientComponent } from "./components/patient/edit-patient/edit-patient.component"
import { ErrorPageComponent } from "./components/error-page/error-page.component"
import { MyprofileComponent } from "./components/profile/myprofile/myprofile.component"

const appRoutes = [
    {path: 'dashboard', component: DashboardsComponent},
    {path: 'auth', component: LoginComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'profile', component: MyprofileComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'editprofile', component: EditProfileComponent},
    {path: 'patient-list', component: PatientComponent},
    {path: 'add-patient', component: AddPatientComponent},
    {path: 'edit-patient/:id', component: EditPatientComponent},
    

    {path: '', component: LoginComponent},
    {path: '**', component: ErrorPageComponent}
]

export const routing = RouterModule.forRoot(appRoutes)