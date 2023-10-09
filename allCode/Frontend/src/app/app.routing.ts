import { RouterModule } from "@angular/router"
import { LoginComponent } from "./components/login/login.component"
import { DashboardsComponent } from "./components/dashboards/dashboards.component"
import { SettingsComponent } from "./components/settings/settings.component"
import { ProfileComponent } from "./components/profile/profile.component"

const appRoutes = [
    {path: 'dashboard', component: DashboardsComponent},
    {path: 'auth', component: LoginComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'profile', component: ProfileComponent},
    

    {path: '', component: LoginComponent}
]

export const routing = RouterModule.forRoot(appRoutes)