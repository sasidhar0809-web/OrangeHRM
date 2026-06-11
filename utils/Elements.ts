import { Page, Locator,expect  } from '@playwright/test';

export class ElementActions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async typeValue(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  
  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  
  async validateText(locator: Locator, text: string) {
    await expect(locator).toHaveText(text);
  }


  async selectDropdownValue(locator: Locator, value: string) {
    await locator.selectOption({ label: value });
  }

    async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `test-results/${name}.png`,
      fullPage: true
    });
  }

  
async hoverOnElement(locator: string) {
    await this.page.hover(locator);
  }

}