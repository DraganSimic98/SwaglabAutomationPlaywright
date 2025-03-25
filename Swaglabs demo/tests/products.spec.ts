import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { SideMenu } from "../pages/sideMenu";

test.describe('Products', () => {
    let loginpage: LoginPage;
    let productPage: ProductsPage;
    let sideMenu: SideMenu;
    let password = 'secret_sauce';

    test.beforeEach(async ({page})=>{
        loginpage = new LoginPage(page);
        productPage = new ProductsPage(page);
        sideMenu = new SideMenu(page);
        await loginpage.navigation();
        await loginpage.loginWithAnyTypeOfUser('standard_user', password);
    });

    test.afterEach(async () => {
        await sideMenu.logOut();
        await sideMenu.verifyLogOut();
    });
    
    test('Sorting by name az', async () => {
      await productPage.sortByName('az');
    });

    test('Sort by name za', async () => {
        await productPage.sortByName('za');
    });

    test('Sorting by price high to low', async () => {      
        await productPage.sortByPrice('hilo');
    });

    test('Sorting by price low to high', async () => {
        await productPage.sortByPrice('lohi');  
    });

    test('Open all products', async () => {
        await productPage.openProduct();
    });   

    test('Close left side menu clicking on X button', async () => {
        await sideMenu.openLeftMenu();
        await sideMenu.verifyOpenMenu();
        await sideMenu.closeLeftMenu('cross');
        await sideMenu.verifyClosedMenu();
    });

    test('Close left menu clicking out of left menu', async({page}) =>{
        await sideMenu.openLeftMenu();
        await sideMenu.verifyOpenMenu();
        await sideMenu.closeLeftMenu('randomClick');
        await sideMenu.verifyClosedMenu();
    });
});
