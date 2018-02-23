import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {JsonpModule} from '@angular/http';
import { AccountOptionsService } from './services/account-options.service';
import { AccountOptionsFormComponent } from './components/account-options-form/account-options-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NotificationsModule} from 'angular4-notify';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountOptionsFormComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JsonpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NotificationsModule,
    ServicesModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
