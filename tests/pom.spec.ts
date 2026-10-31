import { Expect, Page, test } from "@playwright/test";
import LoginPage from "./pages/loginPage/loginPage";
import ProductPage from "./pages/ProductPage/productPage";

test("E2E", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);

  await page.goto("https://www.saucedemo.com/");
  await loginPage.enterUsername();
  await loginPage.enterPassword();
  await loginPage.clickOnLoginButton();
  await productPage.clickOnAddToCartBtn();
  await productPage.clickOnCartBtn();
  await page.waitForTimeout(3000);
  page.close();
});
