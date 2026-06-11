import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import loginData from '../utils/Data.json';

loginData.forEach((data) => {
  test(data.testName, async ({ page }) => {

    const login = new LoginPage(page);

    await login.goToLoginPage();
    await login.login(data.username, data.password);

    if (data.expected === 'success') {
      await login.verifyLoginSuccess();
    } else {
      await login.validateErrorMessage(data.expected);
    }
  });
});