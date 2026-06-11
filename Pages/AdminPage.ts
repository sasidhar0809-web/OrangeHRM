import { Page, expect } from '@playwright/test';
import { ElementActions } from '../utils/Elements';
import { assert } from 'node:console';

export class AdminPage {

  private actions: ElementActions;

  constructor(private page: Page) {
    this.actions = new ElementActions(page);
  }

  adminMenu = this.page.locator('text=Admin').nth(0);
  addBtn = this.page.getByRole('button', { name: 'Add' });

  userRoleDropdown = this.page.locator('.oxd-select-text-input').nth(0);
  adminOption = this.page.locator('text=Admin').nth(2);

  employeeName = this.page.locator('input[placeholder="Type for hints..."]');
  usernameField = this.page.locator('(//input[@class="oxd-input oxd-input--active"])[2]');

  statusDropdown = this.page.locator('.oxd-select-text-input').nth(1);
  enabledOption = this.page.locator('text=Enabled');

  passwordField = this.page.locator('(//input[@type="password"])[1]');
  confirmPasswordField = this.page.locator('(//input[@type="password"])[2]');

  saveBtn = this.page.getByRole('button', { name: 'Save' });

  successMsg = this.page.locator('text=Successfully');
  duplicateMsg = this.page.locator('.oxd-input-field-error-message, [role="alert"]');


  searchUsername = this.page.locator('(//input[@class="oxd-input oxd-input--active"])[2]');
  searchBtn = this.page.getByRole('button', { name: 'Search' });
  resetBtn = this.page.getByRole('button', { name: 'Reset' });


  deleteIcon = this.page.locator('.oxd-icon.bi-trash').nth(0);
  confirmDeleteBtn = this.page.getByRole('button', { name: 'Yes, Delete' });


  async selectEmployeeName(name: string) {
    await this.employeeName.pressSequentially(name);
    await this.employeeName.press('Backspace');
    await this.page.waitForTimeout(2000); // Wait for suggestions to load

    await this.page.waitForSelector('.oxd-autocomplete-dropdown');

    await this.employeeName.press('ArrowDown');
    await this.employeeName.press('Enter');
  }

  async goToAdmin() {
    await this.actions.click(this.adminMenu);
  }

  async clickAdd() {
    await this.actions.click(this.addBtn);
  }

  async fillAdminForm(data: any) {

    await this.actions.click(this.userRoleDropdown);
    await this.actions.click(this.adminOption);

    await this.selectEmployeeName(data.employeeName);

    await this.actions.fill(this.usernameField, data.username);

    await this.actions.click(this.statusDropdown);
    await this.actions.click(this.enabledOption);

    await this.actions.fill(this.passwordField, data.password);
    await this.actions.fill(this.confirmPasswordField, data.password);
  }

  async saveUser() {
    await this.actions.click(this.saveBtn);
  }

  async verifySuccess() {
    await expect(this.successMsg).toBeVisible();
    await this.actions.takeScreenshot('UserCreated');
  }

  async verifyDuplicate() {
    await expect(this.duplicateMsg).toBeVisible();
    await this.actions.takeScreenshot('DuplicateError');
  }

  async searchUser(username: string) {
    await this.searchUsername.waitFor({ state: 'visible' });
    await this.actions.fill(this.searchUsername, username);
    await this.actions.click(this.searchBtn);
  }

  async validateSearchResult(username: string) {
    await expect(this.page.locator('.oxd-table-body')).toContainText(username);
    assert((await this.page.locator('.oxd-table-body').innerText()).includes(username), 'Search result does not contain the expected username');
    await this.actions.takeScreenshot('SearchResult');
    await this.deleteIcon.waitFor({ state: 'visible' });
  }

  async resetSearch() {
    await this.actions.click(this.resetBtn);
    await expect(this.searchUsername).toHaveValue('');
  }

  async deleteUser() {
    await this.deleteIcon.waitFor({ state: 'visible' });
    await this.deleteIcon.scrollIntoViewIfNeeded();
    await this.actions.click(this.deleteIcon);
    await this.confirmDeleteBtn.waitFor({ state: 'visible' });
    await this.actions.click(this.confirmDeleteBtn);

    await this.page.waitForSelector('text=Successfully Deleted');
    await this.actions.takeScreenshot('UserDeleted');
  }
}