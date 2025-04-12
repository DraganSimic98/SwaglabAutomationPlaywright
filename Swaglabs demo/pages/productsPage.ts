import {Page, Locator, expect} from "@playwright/test"
import { BasePage } from "./basePage";

type NameValue =  "az" | "za";
type PriceValue =  'lohi' | 'hilo';
type DataValue = 'itemListByName' | 'itemListByPrice';

export class ProductsPage extends BasePage{
   
    readonly page: Page;
    readonly firstProduct: Locator;
    readonly itemListByName: Locator;
    readonly itemListByPrice: Locator;
    readonly btn_burger: Locator;
    readonly btn_sort: Locator;
    readonly btn_cross: Locator;
    readonly btn_remove: Locator;
    readonly left_menu: Locator;
    readonly btnBack: Locator;
    readonly productName: Locator;
    readonly itemNamesList: Locator;
    readonly btn_shopingCart: Locator;
    originalData: string[];
    sortFn: (desc?: boolean) => (a: string, b: string) => number;

    constructor(page: Page){
        super(page);
        this.page = page;
        this.firstProduct = page.locator('//div[text() = "Sauce Labs Backpack"]');
        this.btn_sort = page.locator('//select[@class = "product_sort_container"]');
        this.btnBack = this.page.locator('//button[@class = "inventory_details_back_button"]');
        this.btn_shopingCart = this.page.locator('#shopping_cart_container'); 
        this.btn_remove = page.locator("//button[text() = 'REMOVE']");
        this.itemListByName = page.locator('//div[@class = "inventory_item_name"]');
        this.itemListByPrice = page.locator('//div[@class = "inventory_item_price"]');
        this.itemNamesList = page.locator('//div[@class = "inventory_item_name"]');
        this.productName = this.page.locator('//div[@class = "inventory_details_name"]');
        
        this.originalData = [];
    
        this.sortFn = (desc: boolean = false) => (a: string, b: string) => {
            console.log("ProductsPage, sortFn()");
            const priceA = parseFloat(a.replace('$', ''));
            const priceB = parseFloat(b.replace('$', ''));
            return !desc ? priceA - priceB : priceB - priceA;
            } 
        }

    async prepareData<T extends string>(data: DataValue, value: T){
        console.log("ProductsPage, prepareData()");
        this.originalData = await this[data].allTextContents();
        await this.page.selectOption('.product_sort_container', {value});
    }

    async sortByName(value: NameValue){
        console.log("ProductsPage, sortByName()");
        await this.prepareData<NameValue>('itemListByName', value);

        const newProducNames = await this.itemListByName.allTextContents();      
       
       const names = {
        'az': [...this.originalData.sort()],
        'za': [...this.originalData.sort().reverse()],
       }
       
        expect(newProducNames).toEqual(names[value]);
    }

    async sortByPrice(value: PriceValue){
        console.log("ProductsPage, sortByPrice()");
        await this.prepareData<PriceValue>('itemListByPrice', value);

        const newProductPrices = await this.itemListByPrice.allTextContents();

        const values = {
            'lohi': [...this.originalData.sort(this.sortFn())],
            'hilo': [...this.originalData.sort(this.sortFn(true))]
        }
        
        expect(newProductPrices).toEqual(values[value]);
    }

    async openProduct(){
        console.log("ProductsPage, openProduct()");
        const singleItemName = await this.itemNamesList.allTextContents();

        for(const name of singleItemName){
            const firstProduct = this.page.locator(`//div[contains(text(), '${name}')]`);
            await firstProduct.click();
            await expect(this.productName).toHaveText(name);         
            await this.btnBack.click();
            await expect(this.page).toHaveURL(/.*v1/);       
        }
    }

    async verifyPageLink(){
        console.log("ProductsPage, verifyPageLink()");
        await expect(this.page).toHaveURL(/.*inventory/);
    }

    async openCart(){
        console.log("ProductsPage, openCart()");
        await this.btn_shopingCart.click();
    }

    async addProductToCart(addItem: number){
        console.log("ProductsPage, addProductToCart");
        for(let i = 1; i <= addItem; i++)
            await this.page.locator(`//div[@id="inventory_container"]/div/div[${i}]/div[3]/button`).click();   
    }
}