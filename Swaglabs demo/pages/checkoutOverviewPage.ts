import {Page, Locator, expect} from "@playwright/test";
import { BasePage } from "./basePage";

export class CheckoutOverviewPage extends BasePage{
    readonly page: Page;
    readonly lbl_title: Locator;
    readonly btn_cancel: Locator;
    readonly btn_finish: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;
        this.lbl_title = this.page.locator('//div[text() = "Checkout: Overview"]');
        this.btn_cancel = this.page.locator('//a[@class="cart_cancel_link btn_secondary"]');
        this.btn_finish = this.page.locator('//a[@class="btn_action cart_button"]');
    }

    async cancelOrdering(){
        console.log("CheckoutOverviewPage, cancelOrdering()");
        await this.btn_cancel.click();
    }

    async finishOrdering(){
        console.log("CheckoutOverviewPage, finishOrdering()");
        await this.btn_finish.click();
    }
}