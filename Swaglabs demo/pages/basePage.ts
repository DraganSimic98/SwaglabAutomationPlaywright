import {Page, Locator, expect} from "@playwright/test"

export class BasePage {
    
    readonly page: Page
    readonly btn_remove: Locator;

    constructor(page: Page){
        this.page = page;
    }

    /** 
     *  @param url - destination that user should be redirected.
    */ 
    async navigate(url: string){
        await this.page.goto(url);
    }

    /**
     * @param title - title text.
     * @param selector - locator of title element
     */
    async verifyPageTitle(title: string, selector: Locator){
        await expect(selector).toHaveText(title);
    }

    /**
     * @param link link that should be verified.
     */
    async verifyPageLink(link: string | RegExp){
        await expect(this.page).toHaveURL(link);
    }

    async removeOneProduct(selector:Locator, product: number){
        await selector.nth(product).click();
    }

    /**
     * 
     * @param selector used to target item that should be removed.
     * Method is used to delete all products from cart.
     */
    async removeAllProductsFromCart(selector: Locator){
        console.log("YourCartPage, removeProductFromCart()");
        const count = await selector.count();
        
        for(let i = 0; i < count; i++){
            await selector.nth(0).click();
        }
    }
}