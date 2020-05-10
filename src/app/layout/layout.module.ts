import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzListModule } from 'ng-zorro-antd/list';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NzSelectModule, NzTableModule } from 'ng-zorro-antd';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { RolesComponent } from './admin/roles/roles.component';
import { RelationsComponent } from './admin/relations/relations.component';
import { CalendarComponent } from './admin/calendar/calendar.component';
import { HomeComponent } from './user/home/home.component';
import { IconsProviderModule } from '../icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TableComponent } from '../table/table.component';
registerLocaleData(localeFr);





@NgModule({
  imports: [LayoutRoutingModule, NzCalendarModule,NzSelectModule, IconsProviderModule,
    NgZorroAntdModule, NzListModule, CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,


    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })],
  declarations: [LayoutComponent,
    DashboardComponent,
    RolesComponent,
    RelationsComponent,
    CalendarComponent,
    HomeComponent,
    TestComponent,
    TableComponent,
   ],
   
  exports: [LayoutComponent],

})
export class LayoutModule { }