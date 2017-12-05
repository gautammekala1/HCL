import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'add', component: AddComponent },
	{ path: '', pathMatch: 'full', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);