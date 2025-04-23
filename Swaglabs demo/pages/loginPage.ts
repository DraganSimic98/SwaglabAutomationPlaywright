import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage{
    
    readonly page: Page;
    readonly usernameBox: Locator;
    readonly passwordField: Locator;
    readonly loginBtn: Locator;
    readonly errorMsg: Locator;
    readonly productPicture: Locator;
    readonly firstProduct: Locator;
    readonly productName: Locator;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.usernameBox = page.locator('//input[@type = "text"]');
        this.passwordField = page.locator('//input[@type = "password"]');
        this.loginBtn = page.locator('//input[@type = "submit"]');
        this.errorMsg = page.locator('//h3[@data-test = "error"]');
        this.productPicture = page.locator('//img[@class="inventory_item_img"]'); 
        this.firstProduct = page.locator('//div[text() = "Sauce Labs Backpack"]');
        this.productName = page.locator('//div[@class="inventory_details_name"]');
    }

    async loginWithAnyTypeOfUser(username: string, password: string){
        console.log("LoginPage, loginWithAnyTypeOfUser()");
               
        await this.usernameBox.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
        await this.expectedResult(username);   
    }

    async expectedResult(username: string){
        console.log("LoginPage, expectedResult()");
        
        switch (username){
            case 'standard_user' :
                await expect(this.page).toHaveURL(/.*inventory/);
                break;
            case 'locked_out_user':
                await expect(this.errorMsg).toContainText('Epic sadface: Sorry, this user has been locked out.');
                break;
            case 'problem_user':
                await this.firstProduct.click();
                await expect(this.productName).not.toHaveText('Sauce Labs Backpack');     
                break;
            case 'wrong_user':
                await expect(this.errorMsg).toContainText('Epic sadface: Username and password do not match any user in this service');
                break;
            case '':
                await expect(this.errorMsg).toContainText('Epic sadface: Username is required');
                break;
            case 'no_password_user':
                await expect(this.errorMsg).toContainText('Epic sadface: Password is required');
                break;
            default:
                throw new Error('Something went wrong!'); 
            }            
    }
}

