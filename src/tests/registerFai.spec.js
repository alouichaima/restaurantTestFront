// const { Builder, By, Key, until } = require('selenium-webdriver');
// const assert = require('assert');

// describe('RegisterFai', function() {
//   this.timeout(30000);
//   let driver;
//   let vars;

//   beforeEach(async function() {
//     driver = await new Builder().forBrowser('chrome').build();
//     vars = {};
//   });

//   afterEach(async function() {
//     await driver.quit();
//   });

//   it('RegisterFai', async function() {
//     // Naviguer vers la page d'inscription
//     await driver.get("http://localhost:4200/registre");

//     // Vérifier que le formulaire d'inscription est affiché
//     const usernameField = await driver.findElement(By.name("username"));
//     const emailField = await driver.findElement(By.name("email"));
//     const passwordField = await driver.findElement(By.name("password"));
//     assert(await usernameField.isDisplayed(), "Le champ username n'est pas affiché.");
//     assert(await emailField.isDisplayed(), "Le champ email n'est pas affiché.");
//     assert(await passwordField.isDisplayed(), "Le champ password n'est pas affiché.");

//     // Saisir un nom d'utilisateur
//     await usernameField.click();
//     await usernameField.sendKeys("alouich");

//     // Saisir un email invalide
//     await emailField.click();
//     await emailField.sendKeys("invalid-email");

//     // Saisir un mot de passe valide
//     await passwordField.click();
//     await passwordField.sendKeys("12@gjcggsd");

//     // Soumettre le formulaire d'inscription
//     await driver.findElement(By.css(".btn")).click();

//     // Attendre l'apparition du message d'erreur
//     try {
//       // Attendre jusqu'à ce que l'élément .alert.alert-warning avec le message "Signup failed!" apparaisse
//       await driver.wait(until.elementLocated(By.css(".alert.alert-warning")), 5000);

//       // Vérifier que le message d'erreur attendu est affiché
//       const errorMessage = await driver.findElement(By.css(".alert.alert-warning")).getText();
//       assert.strictEqual(errorMessage, "Signup failed!", "Le message d'erreur n'est pas affiché correctement.");
//     } catch (error) {
//       // Si l'erreur n'est pas trouvée dans les 5 secondes, échouer le test
//       assert.fail("L'inscription a échoué.");
//     }
//   });
// });
