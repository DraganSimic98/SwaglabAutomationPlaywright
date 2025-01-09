import{Page, Locator} from "@playwright/test";

class LoginPage {
    page: Page;
    usernameBox: Locator;
    passwordField: Locator;
    loginBtn: Locator;
    lockedOutErrorMsg: Locator;
    productPicture: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameBox = page.locator('//input[@type = "text"]');
        this.passwordField = page.locator('//input[@type = "password"]');
        this.loginBtn = page.locator('//input[@type = "submit"]');
        this.lockedOutErrorMsg = page.locator('//h3[@data-test = "error"]');
        this.productPicture = page.locator('//img[@class="inventory_item_img"]');
    }

    async loginWithAnyTypeOfUser(username: string, password: string){
        await this.usernameBox.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async navigation(){
        await this.page.goto('/')
    }
}

export default LoginPage; 