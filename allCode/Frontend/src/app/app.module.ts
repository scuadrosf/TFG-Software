import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { HeaderComponent } from './components/common-components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/common-components/sidebar/sidebar.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { PatientComponent } from './components/patient/patient.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { EditPatientComponent } from './components/patient/edit-patient/edit-patient.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { MyprofileComponent } from './components/profile/myprofile/myprofile.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentsOfInterventionComponent } from './components/documents/documents-of-intervention/documents-of-intervention.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AddAppointmentComponent } from './components/appointment/add-appointment/add-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardsComponent,
    HeaderComponent,
    SidebarComponent,
    ProfileComponent,
    SettingsComponent,
    EditProfileComponent,
    PatientComponent,
    AddPatientComponent,
    EditPatientComponent,
    ErrorPageComponent,
    MyprofileComponent,
    DocumentsComponent,
    DocumentsOfInterventionComponent,
    AppointmentComponent,
    AddAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
