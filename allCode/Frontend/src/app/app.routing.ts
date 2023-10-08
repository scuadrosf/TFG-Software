import { RouterModule } from "@angular/router"
import { LoginComponent } from "./components/login/login.component"
import { DashboardsComponent } from "./components/dashboards/dashboards.component"

const appRoutes = [
    {path: 'auth', component: LoginComponent},

    {path: '', component: DashboardsComponent}
]

export const routing = RouterModule.forRoot(appRoutes)