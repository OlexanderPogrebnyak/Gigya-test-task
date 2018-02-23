import { NgModule } from '@angular/core';
import { NotificationsService } from 'angular4-notify';
import { RestService } from './rest.service';
import { RepoService } from './repo.service';

@NgModule({
  providers: [
    RepoService,
    RestService,
    NotificationsService]
})
export class ServicesModule { }
