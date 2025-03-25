import {Page, Locator, expect} from '@playwright/test'

export class SideMenu{
    
    page: Page;
    btn_logout: Locator;
    btn_burger: Locator;
    btn_sort: Locator;
    btn_cross: Locator;
    left_menu: Locator;
    btn_allItems: Locator;

    constructor(page: Page){
        this.page = page;
        this.btn_logout = page.locator('[id="logout_sidebar_link"]');
        this.btn_burger = page.locator('//div[@class="bm-burger-button"]');
        this.btn_sort = page.locator('//select[@class="product_sort_container"]');
        this.btn_cross = page.locator('//div[@class="bm-cross-button"]');
        this.btn_allItems = page.locator('#inventory_sidebar_link');
        this.left_menu = page.locator('//div[@class="bm-menu"]');
    }

    async logOut(){
        await this.openLeftMenu();
        await this.verifyOpenMenu();
        await this.btn_logout.click();
    }
    
    async verifyLogOut(){
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
        await this.openLeftMenu();
        await this.verifyOpenMenu();
        await this.btn_allItems.click();
    }
}