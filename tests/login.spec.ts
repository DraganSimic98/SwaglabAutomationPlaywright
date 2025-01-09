import{test, expect} from "@playwright/test";
import LoginPage from "../pages/loginPage";

test.describe('Log in', () =>{
    let loginpage: LoginPage;

    test.beforeEach(async ({page}) =>{
        loginpage = new LoginPage(page);
        await loginpage.navigation();
    })

    test('Login with standard user', async ({page}) => {
        await loginpage.loginWithAnyTypeOfUser('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory/);
    });

    test('Login with locked out user', async ({}) => {
        await loginpage.loginWithAnyTypeOfUser('locked_out_user', 'secret_sauce');
        await expect(loginpage.lockedOutErrorMsg).toContainText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Login with problem user', async ({ page }) => {
        
    })
    
    
})