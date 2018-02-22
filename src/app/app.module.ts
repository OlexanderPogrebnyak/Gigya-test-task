import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {JsonpModule} from '@angular/http';
import { AccountOptionsService } from './services/account-options.service';
import { AccountOptionsFormComponent } from './components/account-options-form/account-options-form.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NotificationsModule, NotificationsService} from 'angular4-notify';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountOptionsFormComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: AccountOptionsFormComponent, data: {readonly:false}},
      { path: 'readonly', component: AccountOptionsFormComponent, data: {readonly:true}},
      { path: '**', redirectTo: '/'}
    
    ]),
    JsonpModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    NotificationsModule,

  ],
  providers: [
    AccountOptionsService,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
