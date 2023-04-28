describe('Login', () => {
  it('Logs in', () => {
    cy.visit('http://localhost:3000');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.get('h1').contains('Kalender');
  });
});

describe('Test profile URL', () => {
  it('Navigate to profile', () => {
    cy.visit('http://localhost:3000/profil');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.get('h1').contains('Profil');
  });
});

describe('Test absence page URL', () => {
  it('Navigate to absence page', () => {
    cy.visit('http://localhost:3000/fravaersside');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.get('h1').contains('Mine fravær');
  });
});

describe('Test admin page URL', () => {
  it('Navigate to admin page', () => {
    cy.visit('http://localhost:3000/admin');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.get('h1').contains('Admin');
  });
});
