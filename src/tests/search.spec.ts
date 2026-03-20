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

  test("Deve exibir mensagem de erro quando a busca não retorna resultados", async ({
    page,
  }) => {
    const termoInvalido = "QKEDWOPQKEOPWQKEPWQ";

    await page.goto(`/?s=${termoInvalido}`);

    await expect(page).toHaveURL(/s=/);

    await expect(
      page.getByText(`Resultados encontrados para: ${termoInvalido}`),
    ).toBeVisible();

    await expect(
      page.getByText(/nada foi encontrado para sua pesquisa/i),
    ).toBeVisible();
  });
});
