import BasePage from "../basePage";

export default class LoginPage extends BasePage {
  private readonly usernameField = this.page.locator('[id="user-name"]');
  private readonly passwordField = this.page.locator('[id="password"]');
  private readonly loginBtn = this.page.locator('[id="login-button"]');

  async enterUsername() {
    await this.enterTextToElement(this.usernameField, "standard_user");
  }

  async enterPassword() {
    await this.enterTextToElement(this.passwordField, "secret_sauce");
  }

  async clickOnLoginButton() {
    await this.clickOnElement(this.loginBtn);
  }
}
