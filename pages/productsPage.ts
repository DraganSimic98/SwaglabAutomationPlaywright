import {Page, Locator, expect} from "@playwright/test"

export class ProductsPage {
    page: Page;
    firstProduct: Locator;
    sortbtn: Locator;
    sortOption: Locator;
    itemlist: Locator;
    sortAZ: Locator;
    sortZA: Locator;
    sortLoHi: Locator;
    sortHiLo: Locator;

constructor(page: Page){
    this.page = page;
    this.firstProduct = page.locator('//div[text() = "Sauce Labs Backpack"]');
    this.sortbtn = page.locator('//select[@class = "product_sort_container"]');
    this.itemlist = page.locator('//div[@class = "inventory_item_name"]');
    this.sortAZ = page.locator('//option[contains(text(), "Name (A to Z)")]');
    this.sortZA = page.locator('//option[contains(text(), "Name (Z to A)")]');
    this.sortLoHi = page.locator('//option[contains(text(), "Price (low to high)")]');
    this.sortHiLo = page.locator('//option[contains(text(), "Price (high to low)")]');

    }

    async sortItems(){
        const productNames = await this.itemlist.allTextContents();
        const sortedNames = [...productNames].sort();
        
        expect(productNames).toEqual(sortedNames);
    }

    async sortItemsReverse(){
        const productName = await this.itemlist.allTextContents();
        await this.page.selectOption('.product_sort_container', {value: 'za'})
        const newProducNames = await this.itemlist.allTextContents();      
        const sortedNames = [...productName].sort().reverse();
        
        expect(newProducNames).toEqual(sortedNames);
    }
}