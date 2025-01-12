import {Page, Locator} from "@playwright/test"

export class ProductsPage {
    page: Page;
    firstProduct: Locator;

constructor(page: Page){
    this.page = page;
    this.firstProduct = page.locator('//div[text() = "Sauce Labs Backpack"]');
    }
}