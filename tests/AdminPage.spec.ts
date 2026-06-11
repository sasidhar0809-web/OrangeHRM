
import { test } from '@playwright/test';
import { AdminPage } from '../Pages/AdminPage';
import { faker } from '@faker-js/faker';

test('Create New Admin User', async ({ page }) => {
  const admin = new AdminPage(page);
    await page.goto('/web/index.php/dashboard/index');

  const data = {
    employeeName: 'Ad',
    username: faker.internet.username(),
    password: 'Password123'
  };

  console.log('User:', data);

  await admin.goToAdmin();
  await admin.clickAdd();
  await admin.fillAdminForm(data);
  await admin.saveUser();
  await admin.verifySuccess();
});



test('Validate Duplicate Username', async ({ page }) => {

  const admin = new AdminPage(page);

  await page.goto('/web/index.php/dashboard/index');

  const username = faker.internet.username();

  const data = {
    employeeName: 'Ad',
    username: username,
    password: 'Password123'
  };

  await admin.goToAdmin();
  await admin.clickAdd();
  await admin.fillAdminForm(data);
  await admin.saveUser();
  await admin.verifySuccess();

  await admin.clickAdd();
  await admin.fillAdminForm(data);
  await admin.saveUser();

  await admin.verifyDuplicate();
});


test('Search Admin User', async ({ page }) => {

  const admin = new AdminPage(page);
  await page.goto('/web/index.php/dashboard/index');

  await admin.goToAdmin();
  await admin.searchUser('Admin');

  await admin.validateSearchResult('Admin');
});


test('Reset Search', async ({ page }) => {

  const admin = new AdminPage(page);
  await page.goto('/web/index.php/dashboard/index');

  await admin.goToAdmin();
  await admin.searchUser('Admin');

  await admin.resetSearch();
});



test('Delete Admin User', async ({ page }) => {

  const admin = new AdminPage(page);
  await page.goto('/web/index.php/dashboard/index');

  const username = faker.internet.username();

  const data = {
    employeeName: 'Ad',
    username,
    password: 'Password123'
  };

  await admin.goToAdmin();
  await admin.clickAdd();
  await admin.fillAdminForm(data);
  await admin.saveUser();
  await admin.verifySuccess();
  await admin.goToAdmin();
  await admin.searchUser(username);
  await admin.deleteUser();
});


