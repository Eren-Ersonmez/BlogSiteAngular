import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UiModule } from './ui/ui.module';
import { AdminModule } from './admin/admin.module';
import { LayoutModule } from "./ui/layout/layout.module";
import {  provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    AdminModule,
    LayoutModule,
    RouterModule,
    NgxSpinnerModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), // HttpClient'i fetch API'si ile yapılandır
    {
      provide: "baseUrl",
      useValue: "https://localhost:7013/api", // API base URL'sini burada tanımla
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
