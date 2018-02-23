import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AccountOptions } from '../../model/account-options.model';
import { RestService } from '../../services/rest.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LOGIN_CHOICES } from '../../model/choices.constant';
import { NotificationsService } from 'angular4-notify';
import { ActivatedRoute } from '@angular/router';
import { RepoService } from '../../services/repo.service';



@Component({
  selector: 'app-account-options-form',
  templateUrl: './account-options-form.component.html',
  styleUrls: ['./account-options-form.component.css']
})
export class AccountOptionsFormComponent implements OnInit {

  accountOptionsForm: FormGroup;
  loginIdentifierConflictChoices = LOGIN_CHOICES;
  readonly:boolean;
  accountOptions: AccountOptions;


  constructor(private restService: RestService, private repoService: RepoService,
    private fb: FormBuilder,private notificationsService: NotificationsService,private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.readonly = this.route.snapshot.data['readonly'];

    this.repoService.accountOptionsUpdated.subscribe((accountOptions)=>{
      this.accountOptions = accountOptions;
      this.createForm();
    })

    this.repoService.getAccountOptions();

  }
  createForm() {

    this.accountOptionsForm = this.fb.group(this.accountOptions);

    this.accountOptionsForm.valueChanges.subscribe(value=>{
      this.repoService.setRepoAccountOptions(value);
    });

    if(this.readonly){
      this.accountOptionsForm.disable();
    }
  }

  onSubmit(){
    const formModel = this.accountOptionsForm.value;

    this.restService.setAccountOptions(formModel).subscribe((res)=>{

      if(res["errorCode"]!=0) {
        this.notificationsService.addError(res["errorMessage"]);
      } else {
        this.accountOptionsForm.reset(formModel);
      }
    },(err)=>{

    });
  }

}
