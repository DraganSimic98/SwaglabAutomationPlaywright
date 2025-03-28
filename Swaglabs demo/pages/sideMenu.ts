import {Page, Locator, expect} from '@playwright/test'

export class SideMenu{
    
    readonly page: Page;
    readonly btn_logout: Locator;
    readonly btn_burger: Locator;
    readonly btn_sort: Locator;
    readonly btn_cross: Locator;
    readonly left_menu: Locator;
    readonly btn_allItems: Locator;
    readonly btn_about: Locator;
    readonly btn_resetAppState: Locator;

    constructor(page: Page){
        this.page = page;
        this.btn_logout = page.locator('[id="logout_sidebar_link"]');
        this.btn_burger = page.locator('//div[@class="bm-burger-button"]');
        this.btn_sort = page.locator('//select[@class="product_sort_container"]');
        this.btn_cross = page.locator('//div[@class="bm-cross-button"]');
        this.btn_allItems = page.locator('#inventory_sidebar_link');
        this.left_menu = page.locator('//div[@class="bm-menu"]');
        this.btn_about = page.locator('#about_sidebar_link');
        this.btn_resetAppState = page.locator('#reset_sidebar_link');
    }

    async logOut(){
        console.log("Side Menu, logOut()");
        await this.openLeftMenu();
        await this.verifyOpenMenu();
        await this.btn_logout.click();
    }
    
    async verifyLogOut(){
        console.log("Side Menu, verifyLogOut()");
        await expect(this.page).toHaveURL(/.*index/);
    }
    
    async openLeftMenu(){
        console.log("Side Menu, openLeftMenu()");
        await this.btn_burger.click();
    }
    
    async verifyOpenMenu(){
        console.log("Side Menu, verifyOpenMenu()");
        await expect(this.left_menu).toBeVisible();
    }
    
    async closeLeftMenu(option: 'cross' | 'randomClick'){
        console.log("Side Menu, closeLeftMenu()");
        if(option === 'cross'){
            await this.btn_cross.click();
        }
        else{
            await this.btn_sort.click({force: true});
        }
    }
     
    async verifyClosedMenu(){
        console.log("Side Menu, verifyClosedMenu()");
        await expect(this.left_menu).not.toBeInViewport();
    }

    async returnToAllItems(){
        console.log("Side Menu, returnToAllItems()");
        await this.openLeftMenu();
        await this.verifyOpenMenu();
        await this.btn_allItems.click();
    }

    async goToAboutAndVerify(){
        console.log("Side Menu, goToAbout()");
        await this.openLeftMenu();
        await this.verifyOpenMenu();
        await this.btn_about.click();
        
        await expect(this.page).toHaveURL("https://saucelabs.com/");
    }

    async resetAppState(){
        console.log("Side Menu, resetAppState()");
        await this.openLeftMenu();
        await this.verifyOpenMenu();
        await this.btn_resetAppState.click();     
    }
}