import { expect, type Locator, type Page } from "@playwright/test";

export class NewsletterPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly successText: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = this.page.locator('input[type="email"]').first();
    this.submitButton = page.getByRole("button", { name: "Assinar" });

    this.successMessage = page.locator("div.success");
    this.successText = page.locator("div.success > p");

    this.errorMessage = page.locator("p[class='error']");
  }

  async subscribe(email: string) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}
