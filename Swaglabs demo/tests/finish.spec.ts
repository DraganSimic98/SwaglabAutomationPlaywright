import { test } from "@playwright/test";
import { MyHelper } from "../helper";
import { CheckoutOverviewPage } from "../pages/checkoutOverviewPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { SideMenu } from "../pages/sideMenu";
import { YourCartPage } from "../pages/yourCartPage";
import { FinishPage } from "../pages/finishPage";

test.describe('Finish page tests', () => {
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
    
            await loginPage.navigate('https://www.saucedemo.com/v1/index.html');
            await loginPage.loginWithAnyTypeOfUser(myHelper.standardUsername, myHelper.password);     
        });

        test.afterEach(async () => {
            await sideMenu.logOut();
            await sideMenu.verifyLogOut();
        });

        test('Return to landing page', async () => {
            await productPage.addProductToCart(2);
            await productPage.openCart();
            await yourCartPage.verifyPopulatedCart();
            await yourCartPage.goToChekcout();
            await checkoutPage.verifyPageLink(/.*checkout-step-one/);
            await checkoutPage.fillTheForm(myHelper.user.first_name, myHelper.user.last_name, myHelper.user.zip);
            await checkoutPage.verifyFilledForm();
            await checkoutPage.continueWithOrdering();
            await checkoutOverviewPage.verifyPageLink(/.*checkout-step-two/);
            await checkoutOverviewPage.verifyPageTitle("Checkout: Overview", checkoutOverviewPage.lbl_title);
            await checkoutOverviewPage.finishOrdering();
            await finishPage.verifyPageLink(/.*checkout-complete/);
            await finishPage.verifyPageTitle("Finish", finishPage.lbl_title);
            await sideMenu.returnToAllItems();
            await productPage.verifyPageLink(/.*v1/);
        });        
});
