import { NgModule } from '@angular/core';
import { NotificationsService } from 'angular4-notify';
import { RestService } from './rest.service';

@NgModule({
  providers: [
    RestService,
    NotificationsService]
})
export class ServicesModule { }
