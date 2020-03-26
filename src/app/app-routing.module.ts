import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
