import{Page,Locator} from '@playwright/test';

export class SingleProductPage{
    page:Page
    productName: Locator;


    constructor(page:Page){
        this.page = page;
        this.productName = page.locator('//div[@class="inventory_details_name large_size"]');
    }
 }