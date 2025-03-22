import test from "playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { YourCartPage } from "../pages/yourCartPage";

test.describe('Cart', () => {
        let loginpage: LoginPage;
        let productPage: ProductsPage;
        let cartPage: YourCartPage;
        let password = 'secret_sauce';
    
        test.beforeEach(async ({page})=>{
            loginpage = new LoginPage(page);
            productPage = new ProductsPage(page);
            cartPage = new YourCartPage(page);
            await loginpage.navigation();
            await loginpage.loginWithAnyTypeOfUser('standard_user', password);
        });
    test('Open cart and verify title', async () => {
        await productPage.btn_shopingCart.click();
        await cartPage.verifyPageLink();
        await cartPage.verifyPageTitle();
    });    
});
