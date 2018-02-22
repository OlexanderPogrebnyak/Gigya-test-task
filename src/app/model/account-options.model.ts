export class AccountOptions {
    constructor(
        public verifyEmail:boolean,
        public verifyProviderEmail:boolean,
        public allowUnverifiedLogin:boolean,
        public preventLoginIDHarvesting:boolean,
        public sendWelcomeEmail:boolean,
        public sendAccountDeletedEmail:boolean,
        public defaultLanguage: string,
        public loginIdentifierConflict:string,
        public loginIdentifiers: string) { }
}

