context("First launch", () => {
  beforeEach(() => {
    cy.connexion();
  });

  it("Profile OK", () => {
    cy.waitrandom();
    cy.launchfollow("choose");
  });
});
