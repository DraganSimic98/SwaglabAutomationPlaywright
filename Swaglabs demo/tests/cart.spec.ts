import { test}  from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { YourCartPage } from "../pages/yourCartPage";
import { SideMenu } from "../pages/sideMenu";
import { MyHelper } from "../helper";

test.describe('Cart', () => {
        let loginpage: LoginPage;
        let productPage: ProductsPage;
        let sideMenu: SideMenu;
        let cartPage: YourCartPage;
        let myHelper: MyHelper;
    
        test.beforeEach(async ({page})=>{
            loginpage = new LoginPage(page);
            productPage = new ProductsPage(page);
            cartPage = new YourCartPage(page);
            sideMenu = new SideMenu(page);
            myHelper = new MyHelper()
            await loginpage.navigate('https://www.saucedemo.com/v1/index.html');
            await loginpage.loginWithAnyTypeOfUser(myHelper.standardUsername, myHelper.password);
        });
        
        test.afterEach(async () => {
            await sideMenu.logOut();
            await sideMenu.verifyLogOut();
        });
    
        test('Open cart and verify title', async () => {
            await productPage.openCart();
            await cartPage.verifyPageLink(/.*cart/);
            await cartPage.verifyPageTitle("Your Cart", cartPage.lbl_subheader);
        });    

        test('Go to All Items page', async () => {
            await cartPage.navigate('https://www.saucedemo.com/v1/cart.html');
            await sideMenu.returnToAllItems();
            await productPage.verifyPageLink(/.*inventory/);
        });

        test('Check if the cart is empty', async () => {
            await cartPage.navigate('https://www.saucedemo.com/v1/cart.html');
            await cartPage.verifyEmptyCart();
        });

        test('Remove item from cart', async () => {
            await productPage.addProductToCart(4);
            await cartPage.navigate('https://www.saucedemo.com/v1/cart.html');
            await cartPage.verifyPopulatedCart();
            await cartPage.removeAllProductsFromCart(cartPage.btn_remove);
            await cartPage.verifyEmptyCart();
        });  
        
        test('Continue shopping', async () => {
            await cartPage.navigate('https://www.saucedemo.com/v1/cart.html');
            await cartPage.continueShopping();
            await productPage.verifyPageLink(/.*inventory/);
        });
    });
