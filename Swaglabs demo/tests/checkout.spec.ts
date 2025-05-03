import test from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { YourCartPage } from "../pages/yourCartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { MyHelper } from "../helper";
import { SideMenu } from "../pages/sideMenu";
import { CheckoutOverviewPage } from "../pages/checkoutOverviewPage";

test.describe('Checkout page tests', () => {
    let loginPage: LoginPage;
    let productPage: ProductsPage;
    let yourCartPage: YourCartPage;
    let checkoutPage: CheckoutPage;
    let checkoutOverviewPage: CheckoutOverviewPage;
    let sideMenu: SideMenu;
    let myHelper: MyHelper;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductsPage(page);
        yourCartPage = new YourCartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);
        sideMenu = new SideMenu(page);
        myHelper = new MyHelper();

        await loginPage.navigate('https://www.saucedemo.com/v1/index.html');
        await loginPage.loginWithAnyTypeOfUser(myHelper.standardUsername, myHelper.password);
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
        await checkoutPage.verifyPageLink(/.*checkout-step-one/);
        await checkoutPage.fillTheForm("Miki", "Simic", "35000");
        await checkoutPage.verifyFilledForm();
        await checkoutPage.continueWithOrdering();
        await checkoutOverviewPage.verifyPageLink(/.*checkout-step-two/);
        await checkoutOverviewPage.verifyPageTitle('Checkout: Overview', checkoutOverviewPage.lbl_title);
    });

    test('Fill the form without first name and verify error message', async () => {
        await productPage.addProductToCart(2);
        await productPage.openCart();
        await yourCartPage.verifyPopulatedCart();
        await yourCartPage.goToChekcout();
        await checkoutPage.verifyPageLink(/.*checkout-step-one/);
        await checkoutPage.verifyPageTitle('Checkout: Your Information', checkoutPage.lbl_subheader);
        await checkoutPage.fillTheForm("", "Simic", "35000");
        await checkoutPage.continueWithOrdering();
        await checkoutPage.verifyErrorMesseege();
    });

    test('Fill the form without last name and verify error message', async () => {
        await productPage.addProductToCart(2);
        await productPage.openCart();
        await yourCartPage.verifyPopulatedCart();
        await yourCartPage.goToChekcout();
        await checkoutPage.verifyPageLink(/.*checkout-step-one/);
        await checkoutPage.verifyPageTitle('Checkout: Your Information', checkoutPage.lbl_subheader);
        await checkoutPage.fillTheForm("Miki", "", "35000");
        await checkoutPage.continueWithOrdering();
        await checkoutPage.verifyErrorMesseege();
    });

    test('Fill the form without postal code name and verify error message', async () => {
        await productPage.addProductToCart(2);
        await productPage.openCart();
        await yourCartPage.verifyPopulatedCart();
        await yourCartPage.goToChekcout();
        await checkoutPage.verifyPageLink(/.*checkout-step-one/);
        await checkoutPage.fillTheForm("Miki", "Simic", "");
        await checkoutPage.continueWithOrdering();
        await checkoutPage.verifyErrorMesseege();
    });
});
