import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AccountOptions } from '../../model/account-options.model';
import { AccountOptionsService } from '../../services/account-options.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder } from '@angular/forms';
import { loginIdentifierConflictChoices } from '../../model/login-identifier-conflict-choices.constant';
import { NotificationsService } from 'angular4-notify';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-account-options-form',
  templateUrl: './account-options-form.component.html',
  styleUrls: ['./account-options-form.component.css']
})
export class AccountOptionsFormComponent implements OnInit {

  getAccountOptionsSubscription: Subscription;
  accountOptions:AccountOptions;
  accountOptionsForm: FormGroup;
  loginIdentifierConflictChoices = loginIdentifierConflictChoices;
  readonly:boolean;

  constructor(private accountOptionsService: AccountOptionsService, 
    private fb: FormBuilder,private notificationsService: NotificationsService,private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.readonly = this.route.snapshot.data['readonly'];
    
    this.getAccountOptionsSubscription = this.accountOptionsService.getAccountOptions().subscribe(accountOptions => {
      this.accountOptions = accountOptions;
      this.createForm();
    });
  }

  ngOnDestroy(): void {
    this.getAccountOptionsSubscription.unsubscribe();
  }

  createForm() {
    this.accountOptionsForm = this.fb.group(this.accountOptions);

    if(this.readonly){
      this.accountOptionsForm.disable();
    }
  }

  onSubmit(){
    const formModel = this.accountOptionsForm.value;

    this.accountOptionsService.setAccountOptions(formModel).subscribe((res)=>{

      if(res["errorCode"]!=0) {
        this.notificationsService.addError(res["errorMessage"]);
      } else {
      this.accountOptionsForm.reset(formModel);
      } 
    },(err)=>{
     
    });
  }

  

}
