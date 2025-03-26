import {Page, Locator, expect} from'@playwright/test';

export class YourCartPage{
    
    readonly page: Page;
    readonly btn_checkout: Locator;
    readonly btn_remove: Locator;
    readonly btn_continueShopping: Locator;
    readonly lbl_subheader: Locator;
    readonly lbl_cartItem: Locator;

    constructor(page: Page){
        this.page = page;
        this.btn_checkout = page.locator("//a[@class = 'btn_action checkout_button']");
        this.btn_remove = page.locator("//button[@class = 'btn_secondary cart_button']");
        this.btn_continueShopping = page.locator("//div[@class = 'cart_footer']/a[@class = 'btn_secondary']");
        this.lbl_subheader = page.locator("//div[@class = 'subheader']");
        this.lbl_cartItem = page.locator("//div[@class='cart_item']");
    }

    async navigation(){
        console.log("YourCartPage, navigation()");
        await this.page.goto("https://www.saucedemo.com/v1/cart.html");
    }

    async verifyPageLink(){
        console.log("YourCartPage, verifyPageLink()");
        await expect(this.page).toHaveURL(/.*cart/);
    }

    async verifyPageTitle(){
        console.log("YourCartPage, verifyPageTitle()");
        await expect(this.lbl_subheader).toHaveText("Your Cart");
    }

    async verifyEmptyCart(){
        console.log("YourCartPage, verifyEmptyCart()");
        await expect(this.lbl_cartItem).not.toBeVisible();
    }

    async verifyPopulatedCart(){
        console.log("YourCartPage, verifyPopulatedCart()");
        await expect(this.lbl_cartItem).toBeVisible();
    }

    async removeProductFromCart(){
        console.log("YourCartPage, removeProductFromCart()");
        await this.btn_remove.click();
    }

    async continueShopping(){
        console.log("YourCartPage, continueShopping()");     
        await this.btn_continueShopping.click();
    }
}