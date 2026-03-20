import { expect, test } from "@playwright/test";

test.describe("Busca - Blog do Agi", () => {
  test("Deve exibir resultados de busca ao digitar um termo válido", async ({
    page,
  }) => {
    await page.goto("/?s=FGTS");

    await expect(page).toHaveURL(/s=FGTS/);

    const results = page.locator("text=/FGTS/i");
    await expect(results.first()).toBeVisible();
  });
});
