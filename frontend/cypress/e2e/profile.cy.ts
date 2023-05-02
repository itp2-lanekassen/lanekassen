/*beforeEach(() => {
  cy.visit('http://localhost:3000/profil');
  cy.get('button').contains('Logg inn med Microsoft Azure').click();
})*/

describe('Navigate to profile from calendar', () => {
  it('Navigate and validate that the page is correct', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.get('h1').contains('Kalender');
    cy.get('button').contains('Profil').click({ force: true });
    cy.get('h1').contains('Profil');
  });
});

describe('Edit user', () => {
  it('Check that edit button works', () => {
    cy.visit('http://localhost:3000/profil');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.get('button').contains('Rediger').click();
  });
});
