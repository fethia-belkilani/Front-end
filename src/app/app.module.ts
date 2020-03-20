import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import {NgZorroAntdModule, NZ_I18N, en_US, fr_FR} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { RolesComponent } from './pages/admin/roles/roles.component';
import { RelationsComponent } from './pages/admin/relations/relations.component';
import { CalendarComponent } from './pages/admin/calendar/calendar.component';
import { HomeComponent } from './pages/user/home/home.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { ImputComponent } from './pages/user/imput/imput.component';
import { LoginComponent } from './login';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeBackendProvider } from './_helpers';
import { HelloComponent } from './pages/hello/hello.component';


registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    RelationsComponent,
    CalendarComponent,
    HomeComponent,
    ImputComponent,
    LoginComponent,
    HelloComponent],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR },
          fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
