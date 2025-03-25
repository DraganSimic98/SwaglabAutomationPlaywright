import {Page, Locator, expect} from "@playwright/test"

class BasePage {
    page: Page

    constructor(page: Page){
        this.page = page;
    }

}