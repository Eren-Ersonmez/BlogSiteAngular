import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { AdminComponentsModule } from './admin-components/admin-components.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminLayoutModule,
    AdminComponentsModule
  ]
})
export class AdminModule { }
