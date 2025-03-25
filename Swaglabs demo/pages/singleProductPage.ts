import{Page,Locator} from '@playwright/test';

export class SingleProductPage{
    
    readonly page: Page
    readonly productName: Locator;

    constructor(page:Page){
        this.page = page;
        this.productName = page.locator('//div[@class="inventory_details_name"]');
    }
 }