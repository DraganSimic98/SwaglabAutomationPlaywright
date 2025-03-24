import {Page, Locator, expect} from'@playwright/test';

export class YourCartPage{
    page: Page;
    btn_checkout: Locator;
    btn_remove: Locator;
    btn_continueShopping: Locator;
    lbl_subheader: Locator;

    constructor(page: Page){
        this.page = page;
        this.btn_checkout = page.locator("//a[@class = 'btn_action checkout_button']");
        this.btn_remove = page.locator("//button[@class = 'btn_secondary cart_button']");
        this.btn_continueShopping = page.locator("//div[@class = 'cart_footer']/a[@class = 'btn_secondary']");
        this.lbl_subheader = page.locator("//div[@class = 'subheader']");
    }

    async navigation(){
        await this.page.goto("https://www.saucedemo.com/v1/cart.html");
    }

    async verifyPageLink(){
        await expect(this.page).toHaveURL(/.*cart/);
    }

    async verifyPageTitle(){
        await expect(this.lbl_subheader).toHaveText("Your Cart");
    }
}