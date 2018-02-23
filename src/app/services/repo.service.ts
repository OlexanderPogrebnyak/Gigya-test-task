import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";
import { AccountOptions } from "../model/account-options.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RepoService {

  public accountOptionsUpdated:Subject<any>;
  private accountOptions: AccountOptions;

  constructor(private restService: RestService){
    this.accountOptionsUpdated = new Subject();
  }

getAccountOptions(){

    if (this.accountOptions) {
      this.accountOptionsUpdated.next(this.accountOptions);
    } else {
      this.fetchAccountOptions();
    }
  }

  fetchAccountOptions(){
    this.restService.getAccountOptions().subscribe(accountOptions => {
      this.accountOptions = accountOptions;
      this.accountOptionsUpdated.next(this.accountOptions);
    });
  }

  public setRepoAccountOptions(accountOptions) {
    this.accountOptions = accountOptions;
  }

}
