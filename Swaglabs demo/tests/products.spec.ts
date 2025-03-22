import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";

test.describe('Products', () => {
    let loginpage: LoginPage;
    let productPage: ProductsPage;
    let password = 'secret_sauce';

    test.beforeEach(async ({page})=>{
        loginpage = new LoginPage(page);
        productPage = new ProductsPage(page);
        await loginpage.navigation();
        await loginpage.loginWithAnyTypeOfUser('standard_user', password);
    });

    test.afterEach(async () => {
        await productPage.logOut();
        await productPage.verifyLogOut();
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

    test('Close left side menu clicking on X button', async () => {
        await productPage.openLeftMenu();
        await productPage.verifyOpenMenu();
        await productPage.closeLeftMenu('cross');
        await productPage.verifyClosedMenu();
    });

    test('Close left menu clicking out of left menu', async({page}) =>{
        await productPage.openLeftMenu();
        await productPage.verifyOpenMenu();
        await productPage.closeLeftMenu('randomClick');
        await productPage.verifyClosedMenu();
    });

    test('Open all products', async () => {
        await productPage.openProduct();
    });   
});
