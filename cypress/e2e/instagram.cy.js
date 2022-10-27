context("First launch", () => {
  beforeEach(() => {
    cy.connexion();
  });

  it("Profile OK", () => {
    const env = Cypress.env();
    cy.get(`img[alt="Photo de profil de ${env.INSTAGRAM_USERNAME}"]`)
      .should("be.visible")
      .click({
        force: true,
      });
    cy.waitrandom();
    let n = 0;

    while (n < 10) {
      cy.launchliking();
      n++;
    }
  });
});
