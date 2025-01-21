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

    test('Are the product sorted', async ({}) => {
      await productPage.sortItems();
    });

    test('Reverse sorting check', async ({}) => {
        await productPage.sortItemsReverse();
    });

    test('Sorting by price', async ({}) => {
        await productPage.sortByPriceLoHI();
    });
    
    test('Reverce sorting price', async ({}) => {
        await productPage.sortByPriceHiLo();
    });
    
});
