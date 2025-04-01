import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage{

    readonly page: Page;
    readonly lbl_subheader: Locator;
    readonly btn_cancel: Locator;
    readonly input_firstName: Locator;
    readonly inpit_lastName: Locator;
    readonly input_postalCode: Locator;
    readonly btn_continue: Locator;
    readonly errMsg_firstName: Locator;
    readonly errMsg_lastName: Locator;
    readonly errMsg_postalCode: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.lbl_subheader = page.locator('//div[@class="subheader"]');
        this.btn_cancel = page.locator('//a[@class="cart_cancel_link btn_secondary"]');
        this.btn_continue = page.locator('//input[@value="CONTINUE"]')
        this.input_firstName = page.locator('#first-name');
        this.inpit_lastName = page.locator('#last-name');
        this.input_postalCode = page.locator('#postal-code');
        this.errMsg_firstName = page.locator('//h3[text()="First Name is required"]');
        this.errMsg_lastName = page.locator('//h3[text()="Last Name is required"]')
        this.errMsg_postalCode = page.locator('//h3[text()="Postal Code is required"]');
    }

    async navigate(){
        console.log("CheckoutPage, navigate()");       
        await this.page.goto('https://www.saucedemo.com/v1/checkout-step-one.html');
    }

    async verifyPageLink(){
        console.log("CheckoutPage, verifyPageLink()");
        await expect(this.page).toHaveURL(/.*checkout-step-one/);
        
    }

    async verifyPageTitle(){
        console.log("CheckoutPage, verifyPageTitle()");
        await expect(this.lbl_subheader).toHaveText('Checkout: Your Information');
    }

    async returnToMyCart(){
        console.log("CheckoutPage, returnToMyCart()");
        await this.btn_cancel.click();
    }

    async fillTheForm(firstName: string, lastName: string, zip: string){
        console.log("CheckoutPage, fillTheForm()");
        await this.input_firstName.fill(firstName);
        await this.inpit_lastName.fill(lastName);
        await this.input_postalCode.fill(zip);
    }

    async continueWithOrdering(){
        console.log("CheckoutPage, continueVithOrdering()");
        await this.btn_continue.click();
    }

    async verifyIfFormIsFilled(){
        await this.btn_continue.click();
        if(!this.input_firstName.textContent()){
            await expect(this.errMsg_firstName).toBeVisible();
        }
        if(!this.inpit_lastName.textContent()){
            await expect(this.errMsg_lastName).toBeVisible();
        }
        if(!this.input_postalCode.textContent()){
            await expect(this.errMsg_postalCode).toBeVisible();
        }
        else{
            await expect(this.page).toHaveURL('https://www.saucedemo.com/v1/checkout-step-two.html');
        }
    }
}