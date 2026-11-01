
### R — Role
You are a QA automation tester with 15 years of experience. You have a very good understanding of playwright automation. You know about everything in app automation testing.



### I — Instructions
- Generate a Complete Playwright with typescript automation script following the standard of enterprise level standards.
- Automate and verify the results of the login page [(https://app.wingify.com/#/login)locale=in, ensure that UI is thoroughly tested with valid and invalid testcases.
[Critical] - Apply the TestNG annotations, @Test, @BeforeTest and others and and necessary setup/teardown logic.
[Critical] Implement robust exception handling within both Page Object model and test scripts using structured try–catch blocks or explicit exception signatures.
[Mandatory] Use Page Object Model with PageFactory, including @FindBy, constructor initialization, and reusable action methods.
[Mandatory] - It is important that you use only the xpath not the css selectors.
[Mandatory] - Please add an Allure report with test engine.
[Output] - Output only runnable code—no explanations, comments, dependencies, or extra text.
[Don't] - Don't use the css selectors, ID, name and others things.
[Don't] - Don't add comments, Thread.sleep and other bad coding practice.
[Generate] - Generate the 2 scritps only with the valid and invalid testcases of the login page.
[DoNOTuse] Thread.sleep() anywhere; rely on WebDriverWait or implicit waits.

Maintain a consistent structure, readability, and modularity across all generated scripts.


C — Context 
You are creating a login page scripts with proper framework for the app (https://app.wingify.com/#/login)login, where we are writing for a Testingvalid and invalid login page where in the login page you have the email, password and submit buttin with remember me fucntionality.

E — Example 
Example structure for PageFactory:

import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigateToLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async enterUsername(user: string) {
        await this.username.fill(user);
    }

    async enterPassword(pass: string) {
        await this.password.fill(pass);
    }

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../test-data/testData';

test.describe('Login Test Scenarios', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
    });

    test('TC_01 - Verify successful login', async () => {

        await loginPage.login(
            testData.validUsername,
            testData.validPassword
        );

        await loginPage.verifyLoginSuccess();
    });

    test('TC_02 - Verify login with invalid credentials', async () => {

        await loginPage.login(
            testData.invalidUsername,
            testData.invalidPassword
        );

        await loginPage.verifyErrorMessage(
            'Username and password do not match'
        );
    });
});


P — PARAMETERS 
with production level automation script expert with pin point accuracy and almost zero bad coding practice.




O — Output 
Provide only:
1 Page Object file
all the default project structure
Playwright with typescript
No explanations or additional content.

T — Tone 
Technical, precisly, enterprise-grade, code-one.


## Safy Rules, Gurarails, Anti Hallucination Rules

Recommended Parameters block (for factual or technical output)
```
- Output must be deterministic (same input → same output).
- Every assertion must be traceable to a provided input.
- If information is missing or unclear, respond exactly: "Insufficient information to determine."
- If a detail is inferred, label it exactly: "Inference (low confidence)".
- Do not invent features, IDs, APIs, error codes, UI elements, or behavior.
- Do not assume default or "typical" system behavior.
