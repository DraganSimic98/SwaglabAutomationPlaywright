import {Page, Locator} from "@playwright/test"

class BasePage {
    page: Page

    constructor(page: Page){
        this.page = page;
    }

}