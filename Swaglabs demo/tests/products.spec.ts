import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { SideMenu } from "../pages/sideMenu";
import { YourCartPage } from "../pages/yourCartPage";
import { MyHelper } from "../helper";

test.describe('Products', () => {
    let loginpage: LoginPage;
    let productPage: ProductsPage;
    let sideMenu: SideMenu;
    let cartPage: YourCartPage;
    let myHelper: MyHelper;
    let skipAfterEach = false;

    test.beforeEach(async ({page})=>{
        loginpage = new LoginPage(page);
        productPage = new ProductsPage(page);
        sideMenu = new SideMenu(page);
        cartPage = new YourCartPage(page);
        myHelper = new MyHelper();

        await loginpage.navigation();
        await loginpage.loginWithAnyTypeOfUser(myHelper.standardUsername, myHelper.password);
    });

    test.afterEach(async () => {
        if(skipAfterEach) return;
        await sideMenu.logOut();
        await sideMenu.verifyLogOut();
    });
    
    test('Sorting by name az', async () => {
      await productPage.sortByName('az');
    });

    test('Sort by name za', async () => {
        await productPage.sortByName('za');
    });

    test('Sorting by price high to low', async () => {      
        await productPage.sortByPrice('hilo');
    });

    test('Sorting by price low to high', async () => {
        await productPage.sortByPrice('lohi');  
    });

    test('Open all products', async () => {
        await productPage.openProduct();
    });   

    test('Close left side menu clicking on X button', async () => {
        await sideMenu.openLeftMenu();
        await sideMenu.verifyOpenMenu();
        await sideMenu.closeLeftMenu('cross');
        await sideMenu.verifyClosedMenu();
    });

    test('Close left menu clicking out of left menu', async() =>{
        await sideMenu.openLeftMenu();
        await sideMenu.verifyOpenMenu();
        await sideMenu.closeLeftMenu('randomClick');
        await sideMenu.verifyClosedMenu();
    });

    test('Go to About page', async () => {
        skipAfterEach = true;
        await sideMenu.goToAboutAndVerify();
    });

    test('Add product to cart', async () => {
        await productPage.addProductToCart(1);
        await cartPage.navigation();
        await cartPage.verifyPopulatedCart();
    }); 

    test('Remove products from cart', async () => {
        await productPage.addProductToCart(1);
        await cartPage.navigation();
        await cartPage.verifyPopulatedCart();
        await cartPage.continueShopping();
        await productPage.removeOneProduct(productPage.btn_remove, 0);
        await cartPage.navigation();
        await cartPage.verifyEmptyCart();
    }); 
});
