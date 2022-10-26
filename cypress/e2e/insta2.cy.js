context("First launch", () => {
  beforeEach(() => {
    cy.connexion();
  });

  it("Profile OK", () => {
    const env = Cypress.env();
    cy.waitrandom();
    cy.get(`img[alt="Photo de profil de ${env.INSTAGRAM_USERNAME}"]`).click({
      force: true,
    });
    cy.waitrandom();
    cy.visit('https://www.instagram.com/juliet.sierra/').should('be.visible')
    cy.waitrandom();
    cy.scrollrandom().should('be.visible');
    cy.click(300, 500);



  });
});