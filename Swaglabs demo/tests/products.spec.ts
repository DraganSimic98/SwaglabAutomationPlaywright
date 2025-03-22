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

    test('Sorting by name az', async () => {
      await productPage.sortByName('az');
    });

    test('Sort by name za', async () => {
        await productPage.sortByName('za');
    })

    test('Sorting by price high to low', async () => {      
        await productPage.sortByPrice('hilo');
    });

    test('Sorting by price low to high', async () => {
        await productPage.sortByPrice('lohi');  
    });

    test('Close left side menu clicking on X button', async () => {
        await productPage.btn_burger.click();
        await expect(productPage.left_menu).toBeVisible();
        await productPage.btn_cross.click();
        await expect(productPage.left_menu).not.toBeInViewport();
    });

    test('Close left menu clicking out of left menu', async({page}) =>{
        await productPage.btn_burger.click();
        await expect(productPage.left_menu).toBeVisible();
        await page.locator("body").click({position: {x: 100, y: 50}});
        await expect(productPage.left_menu).not.toBeInViewport(); 

    });

    test('Test', async () => {
        await productPage.openProduct();
    })

});
