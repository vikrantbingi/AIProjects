import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginTestData } from '../test-data/loginTestData';

async function runTestCase(
  name: string,
  operation: () => Promise<void>,
): Promise<void> {
  try {
    await operation();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Test case "${name}" failed: ${detail}`, { cause: error });
  }
}

test.describe('Wingify login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('displays the login form and Remember me is initially unchecked', async () => {
    await runTestCase('login form display', async () => {
      await expect(loginPage.email).toBeVisible();
      await expect(loginPage.password).toBeVisible();
      await expect(loginPage.signInButton).toBeVisible();
      await expect(loginPage.rememberMe).not.toBeChecked();
    });
  });

  test('toggles Remember me', async () => {
    await runTestCase('Remember me toggle', async () => {
      await loginPage.toggleRememberMe();
      await expect(loginPage.rememberMe).toBeChecked();
      await loginPage.toggleRememberMe();
      await expect(loginPage.rememberMe).not.toBeChecked();
    });
  });

  test('toggles password visibility', async () => {
    await runTestCase('password visibility toggle', async () => {
      await loginPage.enterPassword('PasswordForVisibilityCheck');
      await loginPage.togglePasswordVisibility();
      await expect(loginPage.password).toHaveAttribute('type', 'text');
      await loginPage.togglePasswordVisibility();
      await expect(loginPage.password).toHaveAttribute('type', 'password');
    });
  });

  test('rejects invalid credentials with the displayed error message', async () => {
    await runTestCase('invalid credentials', async () => {
      await loginPage.signIn(
        loginTestData.invalid.email,
        loginTestData.invalid.password,
      );
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(
        loginTestData.invalidCredentialsMessage,
      );
    });
  });

  test('signs in with valid credentials', async ({ page }) => {
    test.skip(
      !loginTestData.valid.email || !loginTestData.valid.password,
      'Set VWO_USERNAME and VWO_PASSWORD to run the valid-credentials test.',
    );

    await runTestCase('valid credentials', async () => {
      await loginPage.signIn(
        loginTestData.valid.email,
        loginTestData.valid.password,
      );
      await expect(loginPage.email).toBeHidden();
      await expect(page).not.toHaveURL(/#\/login$/);
    });
  });
});
