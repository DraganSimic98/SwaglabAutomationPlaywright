import {Page, Locator, expect} from "@playwright/test"

export class ProductsPage {
    page: Page;
    firstProduct: Locator;
    sortBtn: Locator;
    itemListByName: Locator;
    itemListByPrice: Locator;

constructor(page: Page){
    this.page = page;
    this.firstProduct = page.locator('//div[text() = "Sauce Labs Backpack"]');
    this.sortBtn = page.locator('//select[@class = "product_sort_container"]');
    this.itemListByName = page.locator('//div[@class = "inventory_item_name"]');
    this.itemListByPrice = page.locator('//div[@class = "inventory_item_price"]');

    }
    
    async sortItems(){
        const productNames = await this.itemListByName.allTextContents();
        const sortedNames = [...productNames].sort();
        
        expect(productNames).toEqual(sortedNames);
    }

    async sortItemsReverse(){
        const productName = await this.itemListByName.allTextContents();
        await this.page.selectOption('.product_sort_container', {value: 'za'})
        const newProducNames = await this.itemListByName.allTextContents();      
        const sortedNames = [...productName].sort().reverse();
        
        expect(newProducNames).toEqual(sortedNames);
    }

    async sortByPriceLoHI(){
        const productPrices = await this.itemListByPrice.allTextContents();
        await this.page.selectOption('.product_sort_container', {value: 'lohi'});
       
        const newProductPrices = await this.itemListByPrice.allTextContents();
        
        const sortedPrices =  productPrices.sort((a, b) => {
            const priceA = parseFloat(a.replace('$', ''));
            const priceB = parseFloat(b.replace('$', ''));
            return priceA-priceB;
        })        
        console.log(newProductPrices);
        console.log(sortedPrices);
  
        expect(newProductPrices).toEqual(sortedPrices);
    }

    async sortByPriceHiLo(){
        const productPrice = await this.itemListByPrice.allTextContents();

        await this.page.selectOption('.product_sort_container', {value: 'hilo'});
        const newProductPrice = await this.itemListByPrice.allTextContents();

        const sortedPrices = productPrice.sort((a, b) => {
            const priceA = parseFloat(a.replace('$', ''));
            const priceB = parseFloat(b.replace('$', ''));

            return priceA-priceB;
        }).reverse();
        
        expect(newProductPrice).toEqual(sortedPrices);
    }
}