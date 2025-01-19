import {Page, Locator, expect} from "@playwright/test"

export class ProductsPage {
    page: Page;
    firstProduct: Locator;
    sortbtn: Locator;
    sortOption: Locator;

constructor(page: Page){
    this.page = page;
    this.firstProduct = page.locator('//div[text() = "Sauce Labs Backpack"]');
    this.sortbtn = page.locator('//select[@class = "product_sort_container"]');
   
    }
    
    async sortItems(){
        const productElement = this.page.locator('//div[@class="inventory_item_name"]');
        const productNames = await productElement.allTextContents();

        const sortednames = [...productNames].sort();
        expect(productNames).toEqual(sortednames);
    }
}