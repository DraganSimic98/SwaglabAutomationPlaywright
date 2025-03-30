import {Page, Locator, expect} from "@playwright/test"

export class BasePage {
    
    readonly page: Page
    readonly btn_remove: Locator;

    constructor(page: Page){
        this.page = page;
        this.btn_remove = page.locator("//button[text() = 'REMOVE']");
    }

    async removeOneProduct(product: number){
        await this.btn_remove.nth(product).click();
    }

    async removeAllProductsFromCart(){
        console.log("YourCartPage, removeProductFromCart()");
        const count = await this.btn_remove.count();
        
        for(let i = 0; i < count; i++){
            await this.btn_remove.nth(0).click();
        }
    }
}