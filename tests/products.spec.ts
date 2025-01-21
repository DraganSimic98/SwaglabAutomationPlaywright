import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";

test.describe('Products', () => {
    let loginpage: LoginPage;
    let productPage: ProductsPage;
    let password = 'secret_sauce';

    test.beforeEach(async ({page})=>{
        loginpage = new LoginPage(page);
        productPage = new ProductsPage(page);
        await loginpage.navigation();
        await loginpage.loginWithAnyTypeOfUser('standard_user', password);
    });

    test('Sorting by name', async ({}) => {
      await productPage.sortByName('az');
      await productPage.sortByName('za');
    });

    test('Sorting by price high to low', async ({}) => {      
        await productPage.sortByPrice('hilo');
    });

    test('Sorting by price low to high', async ({}) => {
        await productPage.sortByPrice('lohi');  
    });
    
});
