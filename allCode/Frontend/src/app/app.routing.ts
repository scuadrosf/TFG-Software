import { RouterModule } from "@angular/router"
import { LoginComponent } from "./components/login/login.component"
import { DashboardsComponent } from "./components/dashboards/dashboards.component"
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
import { AppointmentComponent } from "./components/appointment/appointment.component"
import { AddAppointmentMainComponent } from "./components/appointment/add-appointment-main/add-appointment-main.component"
import { EditAppointmentComponent } from "./components/appointment/edit-appointment/edit-appointment.component"
import { InterventionComponent } from "./components/intervention/intervention.component"
import { AddInterventionComponent } from "./components/intervention/add-intervention/add-intervention.component"
import { EditInterventionComponent } from "./components/intervention/edit-intervention/edit-intervention.component"
import { ForgotPasswordComponent } from "./components/login/forgot-password/forgot-password.component"
import { RegisterDoctorComponent } from "./components/login/register-doctor/register-doctor.component"

const appRoutes = [
    {path: 'dashboard', component: DashboardsComponent},
    {path: 'auth', component: LoginComponent},
    {path: 'profile', component: MyprofileComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'editprofile/:id', component: EditProfileComponent},
    {path: 'editprofile', component: EditProfileComponent},
    {path: 'patient-list', component: PatientComponent},
    {path: 'add-patient', component: AddPatientComponent},
    {path: 'edit-patient/:id', component: EditPatientComponent},
    // Show all documents of ONE patient
    {path: 'documents/user/:idUser', component: DocumentsComponent},
    // Show all documents of THAT intervention
    {path: 'documents/:idIntervention', component: DocumentsOfInterventionComponent},
    {path: 'add-appointment/:id', component: AddAppointmentComponent},
    {path: 'appointment-list', component: AppointmentComponent},
    {path: 'add-appointment', component: AddAppointmentMainComponent},
    {path: 'edit-appointment/:id', component: EditAppointmentComponent},
    {path: 'appointment-list/:id', component: InterventionComponent},
    {path: 'appointment-list/:idUser/add-intervention/:idAppointment', component: AddInterventionComponent},
    {path: 'user/:idUser/edit-intervention/:idIntervention', component: EditInterventionComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'register-doctor', component: RegisterDoctorComponent},


    {path: '', component: LoginComponent},
    {path: '**', component: ErrorPageComponent}
]

export const routing = RouterModule.forRoot(appRoutes)