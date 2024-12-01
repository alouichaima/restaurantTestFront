const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('add_categoryFailed', function() {
  this.timeout(30000);
  let driver;
  let vars;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    vars = {};
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('add_categoryFailed', async function() {
    // Step 1: Open the categories page
    await driver.get("http://localhost:4200/admin/categories");

    // Step 2: Set browser window size
    await driver.manage().window().setRect({ width: 1552, height: 840 });

    // Step 3: Click on "Add Category" button
    await driver.findElement(By.css(".col-md-12 > button")).click();

    // Step 4: Enter "name" field but leave "description" empty
    await driver.findElement(By.id("name")).sendKeys("cuisine tunisienne");

    // Step 5: Click the "Add" button to submit the form
    await driver.findElement(By.css("div:nth-child(3) > button")).click();

    // Step 6: Wait for and assert that the error message for the "description" field is displayed
    const descriptionError = await driver.wait(
      until.elementLocated(By.css("#description ~ .error")),
      5000
    );
    const errorText = await descriptionError.getText();
    assert.strictEqual(errorText, "Description is required", "Le message d'erreur spécifique à la description n'est pas affiché correctement.");

    // Step 7: Dismiss the SweetAlert (if triggered)
    try {
      const swalConfirm = await driver.wait(until.elementLocated(By.css(".swal2-confirm")), 5000);
      await swalConfirm.click();
    } catch (err) {
      console.log("No SweetAlert confirmation dialog displayed.");
    }
  });
});
