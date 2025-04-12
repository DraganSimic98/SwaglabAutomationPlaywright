import { LoginPage } from "../pages/loginPage";
import { test } from "@playwright/test";
import { ProductsPage } from "../pages/productsPage";
import { SingleProductPage } from "../pages/singleProductPage";
import { MyHelper } from "../helper";

test.describe('Log in', () =>{
    let loginpage: LoginPage;
    let productPage: ProductsPage;
    let singleProductPage: SingleProductPage;
    let myHelper: MyHelper;

    test.beforeEach(async ({page}) =>{
        loginpage = new LoginPage(page);
        productPage = new ProductsPage(page);
        singleProductPage = new SingleProductPage(page);
        myHelper = new MyHelper();
        await loginpage.navigation();
    });

    test('Login with standard user', async ({}) => {
        await loginpage.loginWithAnyTypeOfUser(myHelper.standardUsername, myHelper.password);
    });

    test('Login with locked out user', async ({}) => {
        await loginpage.loginWithAnyTypeOfUser(myHelper.lockedOutUsername, myHelper.password);   
    });

    test('Login with problem user', async ({}) => {
        await loginpage.loginWithAnyTypeOfUser(myHelper.problemUsername, myHelper.password);        
    });  

    test('Login with wrong user', async () => {
        await loginpage.loginWithAnyTypeOfUser(myHelper.wrongUsername, myHelper.wrongPassword);
    });

    test('Login without username', async () => {
        await loginpage.loginWithAnyTypeOfUser(myHelper.noUsernameUser, myHelper.noUsernamePassword);
    });

    test('Login without password', async () => {
        await loginpage.loginWithAnyTypeOfUser(myHelper.noPasswordUser, myHelper.noPassword);
    });
});