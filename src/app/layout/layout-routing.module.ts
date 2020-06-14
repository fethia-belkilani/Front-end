import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { RolesComponent } from './admin/roles/roles.component';
import { RelationsComponent } from './admin/relations/relations.component';
import { CalendarComponent } from './admin/calendar/calendar.component';
import { HomeComponent } from './user/home/home.component';
import { Role } from './../_models';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { ValidationComponent } from './manager/validation/validation.component';
const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'user', component: DashboardComponent , data: { roles: [Role.User ] }},
      { path: 'home', component: HomeComponent , data: { roles: [Role.User] }},
      { path: 'admin', component: CalendarComponent, data: { roles: [Role.Admin] } },
      { path: 'relations', component: RelationsComponent, data: { roles: [Role.Admin] } },
      { path: 'calendar', component: CalendarComponent, data: { roles: [Role.Admin] } },
      { path: 'roles', component: RolesComponent, data: { roles: [Role.Admin] } },
      { path: 'test', component: TestComponent,  },
      { path: 'validation', component: ValidationComponent,  },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class LayoutRoutingModule { }
