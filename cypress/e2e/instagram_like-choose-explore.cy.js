context("First launch", () => {
  beforeEach(() => {
    cy.connexion();
  });

  it("Profile OK", () => {
    cy.waitrandom();
    cy.launchliking("choose");
  });
});
