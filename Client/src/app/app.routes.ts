import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EspecificoComponent } from './especifico/especifico.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'especifico/:username', component: EspecificoComponent},
    {path:'user/edit', canActivate:[authGuard], component:EditCardComponent},
    {path: 'admin/edit/:username',canActivate:[adminGuard], component: EditAdminComponent},
    {path: 'admin/register',canActivate:[adminGuard], component: RegisterComponent},
];
