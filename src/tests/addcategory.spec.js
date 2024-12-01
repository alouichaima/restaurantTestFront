const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('add_category', function () {
  this.timeout(40000); // Timeout de 40 secondes
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should add a new category', async function () {
    console.log("Accès à la page des catégories...");
    await driver.get("http://localhost:4200/admin/categories");
    assert.strictEqual(
      await driver.getCurrentUrl(),
      "http://localhost:4200/admin/categories",
      "URL incorrecte ou page non chargée"
    );

    console.log("Cliquer sur le bouton 'Add Category'...");
    const addButton = await driver.wait(until.elementLocated(By.css("button")), 15000);
    assert.ok(addButton, "Le bouton 'Add Category' est introuvable.");
    await addButton.click();

    console.log("Remplir le champ 'name'...");
    const nameField = await driver.wait(until.elementLocated(By.id("name")), 15000);
    assert.ok(nameField, "Le champ 'name' est introuvable.");
    await nameField.sendKeys("Pizza");

    console.log("Remplir le champ 'description'...");
    const descriptionField = await driver.wait(until.elementLocated(By.id("description")), 15000);
    assert.ok(descriptionField, "Le champ 'description' est introuvable.");
    await descriptionField.sendKeys("Pizza neptune");

    console.log("Cliquer sur le bouton 'Submit'...");
    const submitButton = await driver.wait(until.elementLocated(By.css("div:nth-child(3) > button")), 15000);
    assert.ok(submitButton, "Le bouton 'Submit' est introuvable.");
    await submitButton.click();

    console.log("Vérifier si la catégorie a été ajoutée...");
    const newCategory = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Pizza')]")),
      15000
    );
    assert.ok(newCategory, "La catégorie 'Pizza' n'a pas été ajoutée.");
    console.log("Test réussi : catégorie ajoutée avec succès.");
  });
});
