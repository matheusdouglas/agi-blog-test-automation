import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import { BlogPage } from "../pages/BlogPage.js";
import { NewsletterPage } from "../pages/NewsletterPage.js";

test.describe("Newsletter - Blog do Agi", () => {
  let blogPage: BlogPage;
  let newsletterPage: NewsletterPage;

  test.beforeEach(async ({ page }) => {
    blogPage = new BlogPage(page);
    await blogPage.gotoHome();
    await blogPage.goToNoticias();

    newsletterPage = new NewsletterPage(page);
  });

  test("assina newsletter com e-mail válido", async () => {
    const local = faker.internet.userName().replace(/[^a-zA-Z0-9]/g, "");
    const email = `${local}.${Date.now()}@gmail.com`;

    await newsletterPage.subscribe(email);

    await expect(newsletterPage.successMessage).toBeVisible();
    await expect(newsletterPage.successText).toHaveText(
      "Sucesso! Enviamos um e-mail para confirmar a sua assinatura. Encontre o e-mail agora e clique em 'Confirmar' para iniciar a inscrição.",
    );
  });

  test("mostra erro de assinatura cancelada", async () => {
    const local = faker.internet.userName().replace(/[^a-zA-Z0-9]/g, "");
    const email = `${local}.${Date.now()}@gmail.com`;

    await newsletterPage.subscribe(email);
    await expect(newsletterPage.successMessage).toBeVisible();

    await blogPage.goToNoticias();
    await newsletterPage.subscribe(email);

    await expect(newsletterPage.errorMessage).toBeVisible();
    await expect(newsletterPage.errorMessage).toContainText(
      "Ops! Parece que a assinatura com este e-mail foi cancelada. Você pode gerenciar suas preferências no Gerenciador de assinaturas.",
    );

    await expect(
      newsletterPage.errorMessage.getByRole("link", {
        name: /Gerenciador de assinaturas/i,
      }),
    ).toHaveAttribute("href", /subscribe\.wordpress\.com/i);
  });

  test("impede envio para e-mails inválidos", async () => {
    const invalidEmails = [
      "usuario.exemplo.com",
      "usuario@",
      "usuario @example.com",
      "usuario@@example..com",
    ];

    for (const email of invalidEmails) {
      await blogPage.gotoHome();
      await blogPage.goToNoticias();

      await newsletterPage.subscribe(email);

      const validity = await newsletterPage.emailInput.evaluate((el: any) => {
        const input = el as HTMLInputElement;
        return {
          valid: input.checkValidity(),
          message: input.validationMessage ?? "",
        };
      });

      expect(validity.valid).toBe(false);
      expect(validity.message.trim().length).toBeGreaterThan(0);
      await expect(newsletterPage.successMessage).not.toBeVisible();
    }
  });
});
