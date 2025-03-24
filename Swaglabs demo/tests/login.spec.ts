import { LoginPage } from "../pages/loginPage";
import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/productsPage";
import { SingleProductPage } from "../pages/singleProductPage";

test.describe('Log in', () =>{
    let loginpage: LoginPage;
    let productPage: ProductsPage;
    let singleProductPage: SingleProductPage;
    let password = 'secret_sauce';

    test.beforeEach(async ({page}) =>{
        loginpage = new LoginPage(page);
        productPage = new ProductsPage(page);
        singleProductPage = new SingleProductPage(page);
        await loginpage.navigation();
    });

    test('Login with standard user', async ({}) => {
        await loginpage.loginWithAnyTypeOfUser('standard_user', password);
    });

    test('Login with locked out user', async ({}) => {
        await loginpage.loginWithAnyTypeOfUser('locked_out_user', password);   
    });

    test('Login with problem user', async ({}) => {
        await loginpage.loginWithAnyTypeOfUser('problem_user', password);        
    });  
});