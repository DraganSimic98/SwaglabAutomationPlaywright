import test from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { YourCartPage } from "../pages/yourCartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { MyHelper } from "../helper";
import { SideMenu } from "../pages/sideMenu";

test.describe('Checkout page tests', () => {
    let loginPage: LoginPage;
    let productPage: ProductsPage;
    let yourCartPage: YourCartPage;
    let checkoutPage: CheckoutPage;
    let sideMenu: SideMenu;
    let myHelper: MyHelper;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductsPage(page);
        yourCartPage = new YourCartPage(page);
        checkoutPage = new CheckoutPage(page);
        sideMenu = new SideMenu(page);
        myHelper = new MyHelper();

        loginPage.navigation();
        loginPage.loginWithAnyTypeOfUser(myHelper.standardUsername, myHelper.password);
    });

    test.afterEach(async () => {
        await sideMenu.logOut();
        await sideMenu.verifyLogOut();
    });

    test('Fill the form and go to next page', async () => {
        await productPage.addProductToCart(2);
        await productPage.openCart();
        await yourCartPage.verifyPopulatedCart();
        await yourCartPage.goToChekcout();
        await checkoutPage.verifyPageLink();
        await checkoutPage.fillTheForm("Miki", "Simic", "35000");
        await checkoutPage.verifyFilledForm();
        await checkoutPage.continueWithOrdering();
        //verify that user is on next page
    });

    test('Fill the form without last name and verify error message', async () => {
        await productPage.addProductToCart(2);
        await productPage.openCart();
        await yourCartPage.verifyPopulatedCart();
        await yourCartPage.goToChekcout();
        await checkoutPage.verifyPageLink();
        await checkoutPage.fillTheForm("Miki", "", "35000");
        await checkoutPage.continueWithOrdering();
        await checkoutPage.verifyErrorMesseege();
    });
});
