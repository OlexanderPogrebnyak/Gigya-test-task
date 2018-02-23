import { Injectable } from "@angular/core"
import { Http, Jsonp } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AccountOptions } from "../model/account-options.model";

//1. repo (in constructor) ===> rest
//2. rest ====> backend
//3. component.get =====> repo
@Injectable()
export class RestService {

    private protocol: string = 'https';
    private apiRoot: string = 'accounts.gigya.com';
    private getMethod:string = 'accounts.getPolicies';
    private setMethod:string = 'accounts.setPolicies';
    private UserKey: string = 'AJA3Cw9XcJZf';
    private UserSecret: string = '1J%2BYxAY47khnuXf4GKSggLpPFBbQv8Hq';
    private APIKey: string = '3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK';
    private format: string = 'jsonp';
    private callback: String = 'JSONP_CALLBACK';

    apiURLGet: string;
    apiURLSet:string;

    constructor(private jsonp: Jsonp) {

        this.apiURLGet = `${this.protocol}://${this.apiRoot}/${this.getMethod}?userkey=${this.UserKey}&secret=${this.UserSecret}&apikey=${this.APIKey}&format=${this.format}&callback=${this.callback}`;
        this.apiURLSet = `${this.protocol}://${this.apiRoot}/${this.setMethod}?userkey=${this.UserKey}&secret=${this.UserSecret}&apikey=${this.APIKey}&format=${this.format}&callback=${this.callback}`;;

    }

    getAccountOptions(): Observable<AccountOptions> {
        return this.jsonp.request(this.apiURLGet)
            .map(res => {
                console.log();
                return res.json().accountOptions
            });
    }


    setAccountOptions(accountOptions:AccountOptions) {

        const serialisedAccountOptions = JSON.stringify(accountOptions);

        return this.jsonp.get(this.apiURLSet+'&accountOptions='+serialisedAccountOptions)
        .map(response => response.json())

    }


}
