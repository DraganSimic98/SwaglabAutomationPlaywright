import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage{

    readonly page: Page;
    readonly lbl_subheader: Locator;
    readonly btn_cancel: Locator;
    readonly input_firstName: Locator;
    readonly input_lastName: Locator;
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
        this.input_lastName = page.locator('#last-name');
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
        await this.input_lastName.fill(lastName);
        await this.input_postalCode.fill(zip);
    }

    async verifyFilledForm(){
        console.log("CheckoutPage, verifyFilledForm()");     
        try{
            await expect(this.input_firstName).not.toBeEmpty();
            await expect(this.input_lastName).not.toBeEmpty();
            await expect(this.input_postalCode).not.toBeEmpty();
        }catch(e){
            console.log('Error', e);          
        }
    }

    async continueWithOrdering(){
        console.log("CheckoutPage, continueWithOrdering()");
        await this.btn_continue.click();
    }

    async verifyErrorMesseege(){
        console.log("CheckoutPage, verifyErrorMesseege()");
        
        const firstName = await this.input_firstName.inputValue()
        const lastName = await this.input_lastName.inputValue()
        const postalCode = await this.input_postalCode.inputValue()
        console.log(firstName, lastName, postalCode);
        
        if(firstName === ""){
            await expect(this.errMsg_firstName).toBeVisible();
        }
        else if(lastName === ""){
            await expect(this.errMsg_lastName).toBeVisible();
        }
        else if(postalCode === ""){
            await expect(this.errMsg_postalCode).toBeVisible();
        }
    }
}