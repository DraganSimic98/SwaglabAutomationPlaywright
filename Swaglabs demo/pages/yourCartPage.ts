import {Page, Locator, expect} from'@playwright/test';
import { BasePage } from './basePage';

export class YourCartPage extends BasePage{
    
    readonly page: Page;
    readonly btn_checkout: Locator;
    readonly btn_remove: Locator;
    readonly btn_continueShopping: Locator;
    readonly lbl_subheader: Locator;
    readonly lbl_cartItem: Locator;

    constructor(page: Page){
        super(page);
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
        await expect(this.lbl_cartItem.first()).not.toBeVisible();
    }

    async verifyPopulatedCart(){
        console.log("YourCartPage, verifyPopulatedCart()");     
        expect(this.lbl_cartItem.first()).toBeVisible();        
        }

    async removeAllProductsFromCart(){
        console.log("YourCartPage, removeProductFromCart()");
        const count = await this.btn_remove.count();
        
        for(let i = 0; i < count; i++){
            await this.btn_remove.nth(0).click();
        }
    }

    async continueShopping(){
        console.log("YourCartPage, continueShopping()");     
        await this.btn_continueShopping.click();
    }
}