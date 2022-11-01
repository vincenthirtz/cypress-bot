Cypress.Commands.add("selectImg", (key) => {
  cy.get("main")
    .find("img")
    .each(($img, k) => {
      cy.then(() => {
        cy.wrap($img)
          .click({ force: true })
          .then((n) => {
            cy.elementExists(key);
          });
      });
    })
    .should("have.length", 21);
});

Cypress.Commands.add("selectA", (key) => {
  cy.get("article")
    .find("a")
    .each(($img, k) => {
      cy.then(() => {
        cy.wrap($img)
          .click({ force: true })
          .then((n) => {
            cy.elementExists(key);
          });
      });
    })
    .should("have.length", 21);
});

Cypress.Commands.add("elementExists", (key) => {
  cy.waitrandom();
  cy.get("body").then(($body) => {
    cy.waitrandom();
    if(key === "follow") {
      if ($body.find("button").length) {
        cy.get("button").contains("Suivre").first().click({
          force: true,
        });
      } else {
        return;
      }
    } else {
      if ($body.find('svg[aria-label="J’aime"]').length) {
        cy.get(`svg[aria-label="J’aime"]`).first().click({
          force: true,
        });
      } else {
        cy.get(`svg[aria-label="Je n\’aime plus"]`).first().click({
          force: true,
        });
      }
    }
   
  });
  cy.waitrandom();
});

Cypress.Commands.add("godiscover", () => {
  cy.waitrandom();
  cy.get(`svg[aria-label="Découvrir"]`).should("be.visible").click({
    force: true,
  });
  cy.waitrandom();
});

Cypress.Commands.add("gosearch", () => {
  const env = Cypress.env();
  cy.waitrandom();
  cy.get(`svg[aria-label="Recherche"]`).should("be.visible").click({
    force: true,
  });
  cy.waitrandom();
  cy.get('input[aria-label="Saisie de la recherche"]')
    .should("be.visible")
    .type(env.INSTAGRAM_SEARCH)
    .should("have.value", env.INSTAGRAM_SEARCH);
  cy.waitrandom();
  cy.get('svg[aria-label="Hashtag"]').should("be.visible").first().click({
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

Cypress.Commands.add("launchliking", (key) => {
  if (key === "choose") {
    cy.gosearch();
    cy.selectA();
    cy.reload(true);
  } else {
    cy.godiscover();
    cy.selectImg();
    cy.reload(true);
  }
});

Cypress.Commands.add("launchfollow", (key) => {
  if (key === "choose") {
    cy.gosearch();
    cy.selectA("follow");
    cy.reload(true);
  } else {
    cy.godiscover();
    cy.selectImg("follow");
    cy.reload(true);
  }
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
