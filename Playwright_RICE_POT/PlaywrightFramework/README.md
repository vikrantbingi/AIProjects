# Wingify Playwright Framework

## Requirements

- Node.js 22.18 or later
- npm
- Java installed and available on `PATH` to generate an Allure HTML report

## Install

From this directory, run:

```powershell
npm install
npx playwright install chromium
```

## Run tests

```powershell
npm test
npm run test:headed
```

The valid-credentials test is skipped unless both environment variables are set.
In PowerShell, provide an authorized test account before running it:

```powershell
$env:VWO_USERNAME = "your-test-account-email"
$env:VWO_PASSWORD = "your-test-account-password"
npm run test:headed:valid
```

The tests use XPath locators for the login page. The invalid-credentials test
checks the message observed on the login page. Do not use a production account
for automated authentication tests.

## Allure report

The Playwright Allure adapter writes test results to `allure-results` on each
test run. Generate and open the HTML report with:

```powershell
npm run report:allure
npm run open:allure
```
