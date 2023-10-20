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
import { DocumentsComponent } from "./components/documents/documents.component"
import { DocumentsOfInterventionComponent } from "./components/documents/documents-of-intervention/documents-of-intervention.component"
import { AddAppointmentComponent } from "./components/appointment/add-appointment/add-appointment.component"

const appRoutes = [
    {path: 'dashboard', component: DashboardsComponent},
    {path: 'auth', component: LoginComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'profile', component: MyprofileComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'editprofile/:id', component: EditProfileComponent},
    {path: 'editprofile', component: EditProfileComponent},
    {path: 'patient-list', component: PatientComponent},
    {path: 'add-patient', component: AddPatientComponent},
    {path: 'edit-patient/:id', component: EditPatientComponent},
    // Show all documents of ONE patient
    {path: 'documents/:id', component: DocumentsComponent},
    // Show all documents of THAT intervention
    {path: 'documents/:idUser/:idIntervention', component: DocumentsOfInterventionComponent},
    {path: 'add-appointment/:id', component: AddAppointmentComponent},


    {path: '', component: LoginComponent},
    {path: '**', component: ErrorPageComponent}
]

export const routing = RouterModule.forRoot(appRoutes)