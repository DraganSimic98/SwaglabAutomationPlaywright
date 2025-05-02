import test from "@playwright/test";
import { MyHelper } from "../helper";
import { CheckoutOverviewPage } from "../pages/checkoutOverviewPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { SideMenu } from "../pages/sideMenu";
import { YourCartPage } from "../pages/yourCartPage";
import { FinishPage } from "../pages/finishPage";

test.describe('Checkout Overview page tests', () => {
    let loginPage: LoginPage;
    let productPage: ProductsPage;
    let yourCartPage: YourCartPage;
    let checkoutPage: CheckoutPage;
    let checkoutOverviewPage: CheckoutOverviewPage;
    let sideMenu: SideMenu;
    let myHelper: MyHelper;
    let finishPage: FinishPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductsPage(page);
        yourCartPage = new YourCartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);
        finishPage = new FinishPage(page);
        sideMenu = new SideMenu(page);
        myHelper = new MyHelper();

        loginPage.navigate('https://www.saucedemo.com/v1/index.html');
        loginPage.loginWithAnyTypeOfUser(myHelper.standardUsername, myHelper.password);     
    });

    test.afterEach(async () => {
            await sideMenu.logOut();
            await sideMenu.verifyLogOut();
        });
    
    test('Finish ordering', async () => {
        await productPage.addProductToCart(2);
        await productPage.openCart();
        await yourCartPage.verifyPopulatedCart();
        await yourCartPage.goToChekcout();
        await checkoutPage.verifyPageLink(/.*checkout-step-one/);
        await checkoutPage.fillTheForm("Miki", "Simic", "35000");
        await checkoutPage.verifyFilledForm();
        await checkoutPage.continueWithOrdering();
        await checkoutOverviewPage.verifyPageLink(/.*checkout-step-two/);
        await checkoutOverviewPage.verifyPageTitle("Checkout: Overview", checkoutOverviewPage.lbl_title);
        await checkoutOverviewPage.finishOrdering();
        await finishPage.verifyPageLink(/.*checkout-complete/);
        await finishPage.verifyPageTitle("Finish", finishPage.lbl_title);
    });

    test('Cancel ordering', async () => {
        await productPage.addProductToCart(2);
        await productPage.openCart();
        await yourCartPage.verifyPopulatedCart();
        await yourCartPage.goToChekcout();
        await checkoutPage.verifyPageLink(/.*checkout-step-one/);
        await checkoutPage.fillTheForm("Miki", "Simic", "35000");
        await checkoutPage.verifyFilledForm();
        await checkoutPage.continueWithOrdering();
        await checkoutOverviewPage.verifyPageLink(/.*checkout-step-two/);
        await checkoutOverviewPage.verifyPageTitle("Checkout: Overview", checkoutOverviewPage.lbl_title);
        await checkoutOverviewPage.cancelOrdering();
        await productPage.verifyPageLink(/.*inventory/);
        await productPage.verifyPageTitle('Products', productPage.lbl_products);
    });  

    test('Check sum of items', async () => {
        await productPage.addProductToCart(6);
        await productPage.openCart();
        await yourCartPage.verifyPopulatedCart();
        await yourCartPage.goToChekcout();
        await checkoutPage.verifyPageLink(/.*checkout-step-one/);
        await checkoutPage.fillTheForm("Miki", "Simic", "35000");
        await checkoutPage.verifyFilledForm();
        await checkoutPage.continueWithOrdering();
        await checkoutOverviewPage.verifyPageLink(/.*checkout-step-two/);
        await checkoutOverviewPage.verifyPageTitle("Checkout: Overview", checkoutOverviewPage.lbl_title);
        await checkoutOverviewPage.verifyItemTotal(checkoutOverviewPage.lbl_itemTotal, await checkoutOverviewPage.sumOfItems());
        await checkoutOverviewPage.verifyItemTotal(checkoutOverviewPage.lbl_total, await checkoutOverviewPage.sumOfTaxandItemTotal());
    });
});
