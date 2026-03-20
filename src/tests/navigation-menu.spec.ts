import { expect, test } from "@playwright/test";

test("Deve navegar pelo menu do cabeçalho e exibir os artigos", async ({
  page,
}) => {
  await page.goto("/");

  const menuItems = [
    "O Agibank",
    "Produtos",
    "Serviços",
    "Suas finanças",
    "Seus benefícios",
    "Sua segurança",
    "Stories",
  ];

  for (const item of menuItems) {
    const initialUrl = page.url();

    await page.getByRole("link", { name: item }).first().click();
    await page.waitForLoadState("domcontentloaded");

    await expect(page.locator("article").first()).toBeVisible();

    if (page.url() !== initialUrl) {
      await page.goBack();
      await page.waitForLoadState("domcontentloaded");
    } else {
      await page.goto("/");
    }
  }
});
