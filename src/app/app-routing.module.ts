import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RolesComponent} from './pages/admin/roles/roles.component';
import {RelationsComponent} from './pages/admin/relations/relations.component';
import {CalendarComponent} from './pages/admin/calendar/calendar.component';
import {HomeComponent} from './pages/user/home/home.component';
import { ImputComponent } from './pages/user/imput/imput.component';
import { LoginComponent } from './login';

import { AuthGuard } from './_helpers';
import { HelloComponent } from './pages/hello/hello.component';
import { Role } from './_models';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'login',component: LoginComponent},
  { path: '', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule), canActivate: [AuthGuard] },
   {path: 'hello',component: HelloComponent,canActivate: [AuthGuard]},
   { path: 'admin/roles', component: RolesComponent,canActivate: [AuthGuard],data: { roles: [Role.Admin]}},
   { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
   { path: 'admin/relations', component: RelationsComponent,canActivate: [AuthGuard],data: { roles: [Role.Admin]}},
   { path: 'admin/calendar', component: CalendarComponent,canActivate: [AuthGuard],data: { roles: [Role.Admin]}},
   { path: 'user/home', component: HomeComponent,canActivate: [AuthGuard]},
   { path: 'user/imput', component: ImputComponent,canActivate: [AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
