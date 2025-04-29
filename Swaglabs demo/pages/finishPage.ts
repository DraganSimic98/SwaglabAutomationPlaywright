import {Page, Locator, expect} from "@playwright/test";
import { BasePage } from "./basePage";

export class FinishPage extends BasePage{

    readonly page: Page;
    readonly lbl_title: Locator;
    readonly lbl_completeHeader: Locator;
    readonly lbl_completeText: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;
        this.lbl_title = page.locator("//div[@class='subheader']");
        this.lbl_completeHeader = page.locator("//h2[@class='complete-header']");
        this.lbl_completeText = page.locator("//div[@class='complete-text']");
    }
}