import {
  JsonpModule,
  Jsonp,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http
} from "@angular/http";
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend } from "@angular/http/testing";
import { RestService } from "./rest.service";

describe('Service: RestService', () => {

  let service: RestService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonpModule],
      providers: [
        RestService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Jsonp,
          useFactory: (backend, options) => new Jsonp(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    backend = TestBed.get(MockBackend);

    service = TestBed.get(RestService);

  });

  describe('getAccountOptions()',()=>{

    it('should return Observable<AccountOptions>', () => {

      let response = {
        "statusCode": 200,
        "accountOptions":
          {
            "allowUnverifiedLogin": false,
            "defaultLanguage":"pingvenglish",
            "loginIdentifierConflict":"failOnAnyConflictingIdentity",
            "loginIdentifiers": "email",
            "preventLoginIDHarvesting": false,
            "sendAccountDeletedEmail": false,
            "sendWelcomeEmail": false,
            "verifyEmail": true,
            "verifyProviderEmail": false
        }
      };

      // When the request subscribes for results on a connection, return a fake response
      backend.connections.subscribe(connection => {
        connection.mockRespond(new Response(<ResponseOptions>{
          body: JSON.stringify(response)
        }));
      });


      // Perform a request and make sure we get the response we expect
      service.getAccountOptions().subscribe(accountOptions => {

        expect(accountOptions["allowUnverifiedLogin"]).toBe(false);
        expect(accountOptions["defaultLanguage"]).toBe("pingvenglish");
        expect(accountOptions["loginIdentifierConflict"]).toBe("failOnAnyConflictingIdentity");

      });

    });

  });


  describe('setAccountOptions()', () => {

    it('should return Observable<any>', () => {

      let accountOptions = {
        "allowUnverifiedLogin": false,
        "defaultLanguage": "pingvenglish",
        "loginIdentifierConflict": "failOnAnyConflictingIdentity",
        "loginIdentifiers": "email",
        "preventLoginIDHarvesting": false,
        "sendAccountDeletedEmail": false,
        "sendWelcomeEmail": false,
        "verifyEmail": true,
        "verifyProviderEmail": false
      };

      let response = {
        "ok":true,
        "status":200,
        "statusText":"Ok"
      };
      backend.connections.subscribe(connection => {

        expect(connection.request.url.includes("accountOptions=")).toBe(true);

        connection.mockRespond(new Response(<ResponseOptions>{
          body: JSON.stringify(response)
        }));

      });


      service.setAccountOptions(accountOptions).subscribe(response => {

        expect(response["ok"]).toBe(true);
        expect(response["status"]).toBe(200);
        expect(response["statusText"]).toBe("Ok");

      });

    });

  });

});
