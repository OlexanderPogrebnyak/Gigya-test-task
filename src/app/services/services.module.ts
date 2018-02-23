import { NgModule } from '@angular/core';
import { NotificationsService } from 'angular4-notify';
import { AccountOptionsService } from './account-options.service';

@NgModule({
  providers: [
    AccountOptionsService,
    NotificationsService]
})
export class ServicesModule { }
