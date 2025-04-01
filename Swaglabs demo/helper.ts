export class MyHelper{
    readonly standardUsername: string;
    readonly lockedOutUsername:string; 
    readonly problemUsername: string;
    readonly password: string;

    constructor(){
        this.standardUsername = "standard_user";
        this.lockedOutUsername = "locked_out_user";
        this.problemUsername = "problem_user";
        this.password = "secret_sauce";
    } 
}