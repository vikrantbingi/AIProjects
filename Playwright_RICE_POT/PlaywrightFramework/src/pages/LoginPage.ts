import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly rememberMe: Locator;
  readonly rememberMeLabel: Locator;
  readonly passwordVisibilityButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.locator(
      "xpath=(//input[@type='email' and @placeholder='Enter email ID'])[1]",
    );
    this.password = page.locator("xpath=//input[@placeholder='Enter password']");
    this.signInButton = page.locator(
      "xpath=(//button[@type='submit' and normalize-space(.)='Sign in'])[1]",
    );
    this.rememberMe = page.locator(
      "xpath=//input[@type='checkbox' and @icon-size='20']",
    );
    this.rememberMeLabel = page.locator(
      "xpath=//label[.//span[normalize-space(.)='Remember me']]",
    );
    this.passwordVisibilityButton = page.locator(
      "xpath=//li[.//input[@placeholder='Enter password']]//button[@aria-label='Toggle password visibility']",
    );
    this.errorMessage = page.locator(
      "xpath=//*[normalize-space(text())='Your email, password, IP address or location did not match']",
    );
  }

  async navigateToLoginPage(): Promise<void> {
    await this.runAction('navigate to the login page', async () => {
      await this.page.goto('/#/login', { waitUntil: 'domcontentloaded' });
      await expect(this.email).toBeVisible();
      await expect(this.password).toBeVisible();
    });
  }

  async enterEmail(email: string): Promise<void> {
    await this.runAction('enter the email address', () => this.email.fill(email));
  }

  async enterPassword(password: string): Promise<void> {
    await this.runAction('enter the password', () => this.password.fill(password));
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.runAction('sign in', async () => {
      await this.email.fill(email);
      await this.password.fill(password);
      await this.signInButton.click();
    });
  }

  async toggleRememberMe(): Promise<void> {
    await this.runAction('toggle Remember me', () => this.rememberMeLabel.click());
  }

  async togglePasswordVisibility(): Promise<void> {
    await this.runAction('toggle password visibility', () =>
      this.passwordVisibilityButton.click(),
    );
  }

  private async runAction<T>(
    action: string,
    operation: () => Promise<T>,
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      throw new Error(`Unable to ${action}: ${detail}`, { cause: error });
    }
  }
}
