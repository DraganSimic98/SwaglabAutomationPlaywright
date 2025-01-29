import {Page, Locator, expect} from "@playwright/test"

type NameValue =  "az" | "za";
type PriceValue =  'lohi' | 'hilo';
type DataValue = 'itemListByName' | 'itemListByPrice';

export class ProductsPage {
    page: Page;
    firstProduct: Locator;
    itemListByName: Locator;
    itemListByPrice: Locator;
    originalData: string[];
    sortFn: (desc?: boolean) => (a: string, b: string) => number;
    btn_burger: Locator;
    btn_sort: Locator;
    btn_cross: Locator;
    left_menu: Locator;

constructor(page: Page){
    this.page = page;
    this.firstProduct = page.locator('//div[text() = "Sauce Labs Backpack"]');
    this.btn_sort = page.locator('//select[@class = "product_sort_container"]');
    this.btn_burger = page.locator('//div[@class = "bm-burger-button"]');
    this.btn_cross = page.locator('//div[@class = "bm-cross-button"]');
    this.left_menu = page.locator('//div[@class = "bm-menu"]');
    this.itemListByName = page.locator('//div[@class = "inventory_item_name"]');
    this.itemListByPrice = page.locator('//div[@class = "inventory_item_price"]');
    
    this.originalData = [];
    
    this.sortFn = (desc: boolean = false) => (a: string, b: string) => {
            const priceA = parseFloat(a.replace('$', ''));
            const priceB = parseFloat(b.replace('$', ''));
            return !desc ? priceA - priceB : priceB - priceA;
        }
    }

    async prepareData<T extends string>(data: DataValue, value: T) {
        this.originalData = await this[data].allTextContents();
        await this.page.selectOption('.product_sort_container', {value});
    }

    async sortByName(value: NameValue){
         await this.prepareData<NameValue>('itemListByName', value);

        const newProducNames = await this.itemListByName.allTextContents();      
       
       const names = {
        'az': [...this.originalData.sort()],
        'za': [...this.originalData.sort().reverse()],
       }
       
        expect(newProducNames).toEqual(names[value]);
    }

    async sortByPrice(value: PriceValue){
        await this.prepareData<PriceValue>('itemListByPrice', value);

        const newProductPrices = await this.itemListByPrice.allTextContents();

        const values = {
            'lohi': [...this.originalData.sort(this.sortFn())],
            'hilo': [...this.originalData.sort(this.sortFn(true))]
        }
        
        expect(newProductPrices).toEqual(values[value]);
    }

}