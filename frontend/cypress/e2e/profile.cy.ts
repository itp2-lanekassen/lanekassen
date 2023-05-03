export {};

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
    cy.contains('Avbryt').should('not.exist');
    cy.contains('Lagre').should('not.exist');
    cy.get('input').should('not.exist');
    cy.contains('Rediger').click();
    cy.contains('Rediger').should('not.exist');
    cy.contains('Avbryt');
    cy.contains('Lagre');
    cy.get('input');
  });
  it('Test the normal text input field', () => {
    cy.visit('http://localhost:3000/profil');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.contains('Rediger').click();
    cy.get('input[placeholder="Virksomhetstilhørighet"]').should('have.value', 'Lånekassen');
    cy.get('input[placeholder="Virksomhetstilhørighet"]').clear();
    cy.get('input[placeholder="Virksomhetstilhørighet"]').should('have.value', '');
    cy.get('input[placeholder="Virksomhetstilhørighet"]').type('Tester');
    cy.get('input[placeholder="Virksomhetstilhørighet"]').should('have.value', 'Tester');
  });
});
