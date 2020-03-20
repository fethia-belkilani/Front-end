import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzListModule } from 'ng-zorro-antd/list';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';





@NgModule({
  imports: [WelcomeRoutingModule, NzCalendarModule, NzListModule, CommonModule, NgZorroAntdModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],

})
export class WelcomeModule { }