// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("likeimg", (waiting) => {
  let shouldStop = false;
  cy.get("main")
    .find("img")
    .each(($img, k) => {
      cy.then(() => {
        if (shouldStop) {
          return;
        }
        console.log("img", k);
        cy.wrap($img)
          .click({ force: true })
          .then((n) => {
            cy.waitrandom();
            if (n === 10) {
              shouldStop = true;
            }
            cy.get(`svg[aria-label="J’aime"]`).click({
              multiple: true,
              force: true,
            });
            cy.waitrandom();
          });
      });
    })
    // cy.each yields the original subject
    // even if you stop the iteration early
    .should("have.length", 21);
});

Cypress.Commands.add("godiscover", () => {
  cy.waitrandom();
  cy.get(`svg[aria-label="Découvrir"]`).should("be.visible").click({
    force: true,
  });
  cy.waitrandom();
});

Cypress.Commands.add("waitrandom", () => {
  const time = Math.floor(Math.random() * 10000) + 1;
  cy.wait(time);
});

Cypress.Commands.add("scrollrandom", () => {
  const y = Math.floor(Math.random() * 10000) + 1;
  cy.scrollTo(0, y);
});

Cypress.Commands.add("launchliking", () => {
  cy.godiscover();
  cy.likeimg();
  cy.reload(true);
});

Cypress.Commands.add("connexion", () => {
  const env = Cypress.env();
  cy.visit("https://instagram.com/" + env.INSTAGRAM_USERNAME);
  cy.waitrandom();
  cy.get("body")
    .contains("Allow essential and optional cookies")
    .should("be.visible")
    .click();
  cy.waitrandom();
  cy.get("body").contains("Log In").should("be.visible").click();
  cy.waitrandom();
  cy.get('input[name="username"]')
    .should("be.visible")
    .type(env.INSTAGRAM_USERNAME)
    .should("have.value", env.INSTAGRAM_USERNAME);
  cy.waitrandom();
  cy.get('input[name="password"]')
    .should("be.visible")
    .type(env.INSTAGRAM_MDP)
    .should("have.value", env.INSTAGRAM_MDP);
  cy.waitrandom();
  cy.get('button[type="submit"]').should("be.visible").click();
  cy.wait(9000);
});
