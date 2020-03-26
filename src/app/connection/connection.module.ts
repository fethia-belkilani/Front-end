import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionRoutingModule } from './connection-routing.module';
import { ConnectionComponent } from './connection.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ConnectionComponent],
  imports: [
    CommonModule,
    ConnectionRoutingModule, FormsModule
  ]
})
export class ConnectionModule { }
