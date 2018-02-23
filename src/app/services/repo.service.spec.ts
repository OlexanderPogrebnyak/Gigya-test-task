import { RepoService } from "./repo.service";
import { RestService } from "./rest.service";
import { AccountOptions } from "../model/account-options.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

class MockAuthService  {
  getAccountOptions(): Observable<any> {
    return Observable.of({
      "hello":"world"
    });
  }

}

describe('Unit testing of Repo Service:', () => {
  let service: RepoService;
  let rest: MockAuthService;

  beforeEach(() => {
    rest = new MockAuthService();
    service = new RepoService(<RestService>rest);

  });


  it('fetchAccountOptions should execute accountOptionsUpdated emition', () => {

    service.accountOptionsUpdated.subscribe(accountOptions=>{
      expect(accountOptions["hello"]).toBe("world");
    })

    service.fetchAccountOptions();
  });


  it('setRepoAccountOptions should set accountOptions property', () => {
    service.setRepoAccountOptions({"hello":"world"});

    expect(service["accountOptions"]["hello"]).toBe("world");

  });


});


