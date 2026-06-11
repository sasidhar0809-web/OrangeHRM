import { Page, expect } from '@playwright/test';
import { ElementActions } from '../utils/Elements';

export class LoginPage {

  private actions: ElementActions;

  constructor(private page: Page) {
    this.actions = new ElementActions(page);
  }

  username = this.page.getByPlaceholder('Username');
  password = this.page.getByPlaceholder('Password');
  loginBtn = this.page.getByText('Login', { exact: true }).nth(1);
  errorMessage = this.page.locator('.oxd-input-field-error-message, [role="alert"]');
  dashboardText = this.page.locator('text=Dashboard');
  profileIcon = this.page.locator('#profile');
  logoutBtn = this.page.locator('text=Logout');


async goToLoginPage() {
  await this.page.goto('/');
}


  async login(user: string, pass: string) {
    await this.actions.fill(this.username, user);
    await this.actions.fill(this.password, pass);
    await this.actions.click(this.loginBtn);
  }

  async verifyLoginSuccess() {
    await this.page.waitForSelector('text=Dashboard');
    //await expect(this.dashboardText).toBeVisible();
    await this.actions.takeScreenshot('Dashboard');
  }


  async validateErrorMessage(msg: string) {
    await this.actions.validateText(this.errorMessage, msg);
  }

  async logout() {
    await this.actions.click(this.profileIcon);
    await this.actions.click(this.logoutBtn);
    await expect(this.username).toBeVisible();
    await this.actions.takeScreenshot('Logout');
  }
}
