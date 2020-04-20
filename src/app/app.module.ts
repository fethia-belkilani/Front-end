import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData, CommonModule } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './login';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeBackendProvider } from './_helpers';
import { LayoutModule } from './layout/layout.module';


registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    ],
  imports: [
    AppRoutingModule,
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
