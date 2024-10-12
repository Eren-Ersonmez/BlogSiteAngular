import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AdminLayoutComponent, NavbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AdminLayoutComponent
  ]
})
export class AdminLayoutModule { }
