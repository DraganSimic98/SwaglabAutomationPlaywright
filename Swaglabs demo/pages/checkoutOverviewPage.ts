import {Page, Locator, expect} from "@playwright/test";
import { BasePage } from "./basePage";

export class CheckoutOverviewPage extends BasePage{
    readonly page: Page;
    readonly lbl_title: Locator;
    readonly btn_cancel: Locator;
    readonly btn_finish: Locator;
    readonly itemsList: Locator;
    readonly lbl_itemTotal: Locator;
    readonly lbl_itemTax: Locator;
    readonly lbl_total: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;
        this.lbl_title = this.page.locator('//div[text() = "Checkout: Overview"]');
        this.btn_cancel = this.page.locator('//a[@class="cart_cancel_link btn_secondary"]');
        this.btn_finish = this.page.locator('//a[@class="btn_action cart_button"]');
        this.itemsList = this.page.locator('//div[@class="inventory_item_price"]');
        this.lbl_itemTotal = this.page.locator('//div[@class="summary_subtotal_label"]');
        this.lbl_itemTax = this.page.locator('//div[@class="summary_tax_label"]');
        this.lbl_total = this.page.locator('//div[@class="summary_total_label"]');
    }

    async cancelOrdering(){
        console.log("CheckoutOverviewPage, cancelOrdering()");
        await this.btn_cancel.click();
    }

    async finishOrdering(){
        console.log("CheckoutOverviewPage, finishOrdering()");
        await this.btn_finish.click();
    }

    async sumOfItems(){
     console.log("Sum of items");     
     const list = await  this.itemsList.allTextContents();
     
     let sum = 0;
        for (const it of list){
            const cleaned = parseFloat(it.replace('$', ''));   
            sum = sum + cleaned;
        }
        return sum;
      }

    async sumOfTaxandItemTotal(){
        console.log("Sum of tax and item total");
        
        const tax = await this.lbl_itemTax.allTextContents();
        let value = 0;

        for(const it  of tax){
        const clenaed = parseFloat(it.replace('Tax: $', ''));
        value = value+clenaed;
      }
      return value + parseFloat((await this.sumOfItems()).toFixed(2));
    }

    async verifyItemTotal(selector: Locator , sum: number){
        console.log("Verify item total");
        const total = await selector.allTextContents();
        let value = 0;

        for(const it  of total){
        const clenaed = parseFloat(it.replace(/[^0-9.-]+/g, ''));
        value = value+clenaed;
      }
      expect(value).toEqual(sum);
    }
}
