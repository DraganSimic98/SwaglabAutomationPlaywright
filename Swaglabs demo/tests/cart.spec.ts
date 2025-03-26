import test from "playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { YourCartPage } from "../pages/yourCartPage";
import { SideMenu } from "../pages/sideMenu";

test.describe('Cart', () => {
        let loginpage: LoginPage;
        let productPage: ProductsPage;
        let sideMenu: SideMenu;
        let cartPage: YourCartPage;
        let password = 'secret_sauce';
    
        test.beforeEach(async ({page})=>{
            loginpage = new LoginPage(page);
            productPage = new ProductsPage(page);
            cartPage = new YourCartPage(page);
            sideMenu = new SideMenu(page);
            await loginpage.navigation();
            await loginpage.loginWithAnyTypeOfUser('standard_user', password);
        });
        
        test.afterEach(async () => {
            await sideMenu.logOut();
            await sideMenu.verifyLogOut();
        });
    
        test('Open cart and verify title', async () => {
            await productPage.openCart();
            await cartPage.verifyPageLink();
            await cartPage.verifyPageTitle();
        });    

        test('Go to All Items page', async () => {
            await cartPage.navigation();
            await sideMenu.returnToAllItems();
            await productPage.verifyPageLink();
        });

        test('Check if the cart is empty', async () => {
            await cartPage.navigation();
            await cartPage.verifyEmptyCart();
        });

        test.only('Remove item from cart', async () => {
            await productPage.addProductToCart(4);
            await cartPage.navigation();
            await cartPage.verifyPopulatedCart();
            await cartPage.removeAllProductsFromCart();
            await cartPage.verifyEmptyCart();
        });  
        
        test('Continue shopping', async () => {
            await cartPage.navigation();
            await cartPage.continueShopping();
            await productPage.verifyPageLink();
        });
    });
