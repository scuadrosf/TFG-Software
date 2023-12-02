import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AddAppointmentMainComponent } from './components/appointment/add-appointment-main/add-appointment-main.component';
import { EditAppointmentComponent } from './components/appointment/edit-appointment/edit-appointment.component';
import { InterventionComponent } from './components/intervention/intervention.component';
import { AddInterventionComponent } from './components/intervention/add-intervention/add-intervention.component';
import { EditInterventionComponent } from './components/intervention/edit-intervention/edit-intervention.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { MatListModule } from '@angular/material/list';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarMobileComponent } from './components/common-components/sidebar-mobile/sidebar-mobile.component';


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
    AddAppointmentComponent,
    AddAppointmentMainComponent,
    EditAppointmentComponent,
    InterventionComponent,
    AddInterventionComponent,
    EditInterventionComponent,
    ForgotPasswordComponent,
    SidebarMobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    NgbModule,
    MatListModule,
    PdfViewerModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
