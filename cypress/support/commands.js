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
  cy.get("main")
    .find("img")
    .then(($els) => {
      cy.wait(waiting);
      cy.wrap($els).click({ multiple: true, force: true });
      cy.wait(waiting);
      cy.get(`svg[aria-label="J’aime"]`).click({
        multiple: true,
        force: true,
      });
      cy.log($els);
    });
});

Cypress.Commands.add("godiscover", (waiting) => {
    const env = Cypress.env();
  cy.wait(waiting);
  cy.get(`svg[aria-label="Découvrir"]`).click({
    force: true,
  });
  cy.wait(waiting);
});

Cypress.Commands.add("waitrandom", (waiting) => {
    const time = Math.floor(Math.random() * 10000) + 1;
    cy.wait(time);
});

Cypress.Commands.add("scrollrandom", (waiting) => {
    const y = Math.floor(Math.random() * 10000) + 1;
    cy.scrollTo(0, y);
});

Cypress.Commands.add("launchliking", () => {
    cy.godiscover(5000);
    cy.likeimg(5000);
    cy.reload(true);
  });

  Cypress.Commands.add("connexion", () => {
  const env = Cypress.env();
    cy.visit("https://instagram.com/" + env.INSTAGRAM_USERNAME);
    cy.wait(2000);
    cy.get("body").contains("Allow essential and optional cookies").click();
    cy.wait(2000);
    cy.get("body").contains("Log In").click();
    cy.wait(2000);
    cy.get('input[name="username"]')
      .type(env.INSTAGRAM_USERNAME)
      .should("have.value", env.INSTAGRAM_USERNAME);
    cy.wait(2000);
    cy.get('input[name="password"]')
      .type(env.INSTAGRAM_MDP)
      .should("have.value", env.INSTAGRAM_MDP);
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
});