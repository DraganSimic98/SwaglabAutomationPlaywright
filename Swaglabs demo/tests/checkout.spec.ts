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

    test('Test', async () => {
        await productPage.addProductToCart(2);
        await productPage.openCart();
        await yourCartPage.verifyPopulatedCart();
        await yourCartPage.goToChekcout();
        await checkoutPage.verifyPageLink();
        await checkoutPage.fillTheForm("Milorad", "", "35000");
        await checkoutPage.verifyIfFormIsFilled();

    })
    
    
});
