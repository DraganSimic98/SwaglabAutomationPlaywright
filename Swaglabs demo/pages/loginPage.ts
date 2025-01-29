import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    page: Page;
    usernameBox: Locator;
    passwordField: Locator;
    loginBtn: Locator;
    lockedOutErrorMsg: Locator;
    productPicture: Locator;
    firstProduct: Locator;
    productName: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.usernameBox = page.locator('//input[@type = "text"]');
        this.passwordField = page.locator('//input[@type = "password"]');
        this.loginBtn = page.locator('//input[@type = "submit"]');
        this.lockedOutErrorMsg = page.locator('//h3[@data-test = "error"]');
        this.productPicture = page.locator('//img[@class="inventory_item_img"]'); 
        this.firstProduct = page.locator('//div[text() = "Sauce Labs Backpack"]');
        this.productName = page.locator('//div[@class="inventory_details_name"]');
    }

    async loginWithAnyTypeOfUser(username: string, password: string){
        await this.usernameBox.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
        await this.expectedResult(username);
        
    }

    async expectedResult(username: string){
        switch (username){
            case 'standard_user' :
                await expect(this.page).toHaveURL(/.*inventory/);
                break;
            case 'locked_out_user':
                await expect(this.lockedOutErrorMsg).toContainText('Epic sadface: Sorry, this user has been locked out.');
                break;
            case 'problem_user':
                await this.firstProduct.click();
                await expect(this.productName).not.toHaveText('Sauce Labs Backpack');     
                break;
            }
    }

    async navigation(){
        await this.page.goto('/v1')
    }
}

