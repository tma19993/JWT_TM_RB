import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { InfoComponent } from './info/info.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
