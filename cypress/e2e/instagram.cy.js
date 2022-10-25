context("First launch", () => {
  beforeEach(() => {
    cy.connexion();
  });

  it("Profile OK", () => {
    const env = Cypress.env();
    cy.wait(9000);
    cy.get(`img[alt="Photo de profil de ${env.INSTAGRAM_USERNAME}"]`).click({
      force: true,
    });
    cy.wait(5000);
    let n = 0;

    while (n < 100) {
      cy.launchliking();
      n++;
    }
  });
});
