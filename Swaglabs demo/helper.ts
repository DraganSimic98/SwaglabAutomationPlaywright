export class MyHelper{
    readonly standardUsername: string;
    readonly lockedOutUsername:string; 
    readonly problemUsername: string;
    readonly wrongUsername: string;
    readonly noPasswordUser: string;
    readonly noUsernameUser: string;
    readonly password: string;
    readonly wrongPassword: string;
    readonly noPassword: string;
    readonly noUsernamePassword: string;

    constructor(){
        this.standardUsername = "standard_user";
        this.lockedOutUsername = "locked_out_user";
        this.problemUsername = "problem_user";
        this.wrongUsername = "wrong_user";
        this.noPasswordUser = "no_password_user";
        this.noUsernameUser = "";
        this.password = "secret_sauce";
        this.wrongPassword = "wrong_password";
        this.noPassword = "";
        this.noUsernamePassword = "no_username_password_user";
    } 
}