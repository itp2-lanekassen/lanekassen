export {};

// Because localStorage is emptied between each test, the tests will always visit the login page
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
  it('Test editing user', () => {
    cy.visit('http://localhost:3000/profil');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.contains('Rediger').click();
    cy.get('input[placeholder="Virksomhetstilhørighet"]').should('have.value', 'Lånekassen');
    cy.get('input[placeholder="Virksomhetstilhørighet"]').clear();
    cy.get('input[placeholder="Virksomhetstilhørighet"]').should('have.value', '');
    cy.get('input[placeholder="Virksomhetstilhørighet"]').type('Tester');
    cy.get('input[placeholder="Virksomhetstilhørighet"]').should('have.value', 'Tester');
    cy.contains('Lagre').click();
    cy.contains('Tester');
    cy.contains('Lånekassen').should('not.exist');
  });
  it('Reset information so that test can run again', () => {
    cy.visit('http://localhost:3000/profil');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.contains('Rediger').click();
    cy.get('input[placeholder="Virksomhetstilhørighet"]').should('have.value', 'Tester');
    cy.get('input[placeholder="Virksomhetstilhørighet"]').clear();
    cy.get('input[placeholder="Virksomhetstilhørighet"]').type('Lånekassen');
    cy.contains('Lagre').click();
    cy.contains('Lånekassen');
    cy.contains('Tester').should('not.exist');
  });
});
