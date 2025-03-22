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
    btnBack: Locator;
    productName: Locator;
    itemNamesList: Locator;
    btn_shopingCart: Locator;
    btn_logout: Locator;

constructor(page: Page){
    this.page = page;
    this.firstProduct = page.locator('//div[text() = "Sauce Labs Backpack"]');
    this.btn_sort = page.locator('//select[@class = "product_sort_container"]');
    this.btn_burger = page.locator('//div[@class = "bm-burger-button"]');
    this.btn_cross = page.locator('//div[@class = "bm-cross-button"]');
    this.left_menu = page.locator('//div[@class = "bm-menu"]');
    this.itemListByName = page.locator('//div[@class = "inventory_item_name"]');
    this.itemListByPrice = page.locator('//div[@class = "inventory_item_price"]');
    this.itemNamesList = page.locator('//div[@class = "inventory_item_name"]');
    this.btnBack = this.page.locator('//button[@class = "inventory_details_back_button"]');
    this.productName = this.page.locator('//div[@class = "inventory_details_name"]');
    this.btn_shopingCart = this.page.locator('#shopping_cart_container');
    this.btn_logout = this.page.locator('[id="logout_sidebar_link"]')
    
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

    async openProduct(){
        const singleItemName = await this.itemNamesList.allTextContents();

        for(const name of singleItemName){
            const firstProduct = this.page.locator(`//div[contains(text(), '${name}')]`);
            await firstProduct.click();
            await expect(this.productName).toHaveText(name);         
            await this.btnBack.click();
            await expect(this.page).toHaveURL(/.*v1/);       
        }
    }

    async logOut(){
        await this.openLeftMenu();
        await this.verifyOpenMenu();
        await this.btn_logout.click();
    }

    async verifyLogOut(){
        await expect(this.page).toHaveURL(/.*index/)
    }

    async openLeftMenu(){
        console.log("productsPage, openLeftMenu()");
        await this.btn_burger.click();
    }

    async verifyOpenMenu(){
        console.log("productsPage, verifyOpenMenu()");
        await expect(this.left_menu).toBeVisible();
    }

    async closeLeftMenu(option: 'cross' | 'randomClick'){
        console.log("productsPage, closeLeftMenu()");
        if(option === 'cross'){
            await this.btn_cross.click();
        }
        else{
            await this.btn_sort.click({force: true})
        }
    }
 
    async verifyClosedMenu(){
        console.log("productsPage, verifyClosedMenu()");
        await expect(this.left_menu).not.toBeInViewport();
    }

}