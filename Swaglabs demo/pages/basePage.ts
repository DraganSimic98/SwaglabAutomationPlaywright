import {Page, Locator, expect} from "@playwright/test"

export class BasePage {
    
    readonly page: Page
    readonly btn_remove: Locator;

    constructor(page: Page){
        this.page = page;
    }

    async removeOneProduct(selector:Locator, product: number){
        await selector.nth(product).click();
    }

    async removeAllProductsFromCart(selector: Locator){
        console.log("YourCartPage, removeProductFromCart()");
        const count = await selector.count();
        
        for(let i = 0; i < count; i++){
            await selector.nth(0).click();
        }
    }

    async navigate(url: string){
        await this.page.goto(url);
    }

    async verifyPageTitle(text: string, title: Locator){
        await expect(title).toHaveText(text);
    }

    async verifyPageLink(link: RegExp){
        await expect(this.page).toHaveURL(link);
    }
}