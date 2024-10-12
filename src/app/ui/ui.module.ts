import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutModule } from './components/about/about.module';
import { ContactModule } from './components/contact/contact.module';
import { HomeModule } from './components/home/home.module';
import { ComponentModule } from './components/component.module';
import { LayoutModule } from './layout/layout.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentModule,
    LayoutModule
  ]
})
export class UiModule { }
