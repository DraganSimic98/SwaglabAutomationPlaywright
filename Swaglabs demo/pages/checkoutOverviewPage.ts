import {Page, Locator, expect} from "@playwright/test"

export class CheckoutOverviewPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page;
    }
}