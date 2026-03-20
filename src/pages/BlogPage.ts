import { expect, type Locator, type Page } from "@playwright/test";

export class BlogPage {
  readonly page: Page;
  readonly agibankMenu: Locator;
  readonly noticiasOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.agibankMenu = page.getByRole("link", { name: /agibank/i }).first();
    this.noticiasOption = page
      .getByRole("link", { name: /^Notícias$/i })
      .first();
  }

  async gotoHome() {
    await this.page.goto("/");
  }

  async goToNoticias() {
    await expect(this.agibankMenu).toBeVisible();
    await this.agibankMenu.click();

    await expect(this.noticiasOption).toBeVisible();
    await this.noticiasOption.click();
  }
}
