import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { SingleProductPage } from "../pages/singleProductPage";

test.describe('Log in', () =>{
    let loginpage: LoginPage;
    let productPage: ProductsPage;
    let singleProductPage: SingleProductPage;
    let password = 'secret_sauce';

    test.beforeEach(async ({page}) =>{
        loginpage = new LoginPage(page);
        productPage = new ProductsPage(page);
        singleProductPage = new SingleProductPage(page);
        await loginpage.navigation();
    })

    test('Login with standard user', async ({page}) => {
        await loginpage.loginWithAnyTypeOfUser('standard_user', password);
        await expect(page).toHaveURL(/.*inventory/);
    });

    test('Login with locked out user', async ({}) => {
        await loginpage.loginWithAnyTypeOfUser('locked_out_user', password);
        await expect(loginpage.lockedOutErrorMsg).toContainText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Login with problem user', async ({}) => {
        await loginpage.loginWithAnyTypeOfUser('problem_user', password);
        await productPage.firstProduct.click();
        await expect(singleProductPage.productName).not.toHaveText('Sauce Labs Backpack');      
    });

    test('Login with performance glitch user', async ({ page }) => {
        await loginpage.loginWithAnyTypeOfUser('performance_glitch_user', password);

    });
   
});