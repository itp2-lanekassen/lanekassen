describe('Navigate to profile from calendar', () => {
  it('Navigate and validate that the page is correct', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.get('h1').contains('Kalender');
    cy.get('button').contains('Mine fravær').click({ force: true });
    cy.get('h1').contains('Mine fravær');
  });
});

describe('Test absence form', () => {
  /*
    it('Add absence', () => {
        cy.visit('http://localhost:3000/fravaersside');
        cy.get('button').contains('Logg inn med Microsoft Azure').click();
        cy.get('#startDate').type('10.10.2023').wait(1000);
        cy.get('#endDate').type('16.10.2023');
        cy.get('#comment').type('Going on vacation');
        cy.contains('Lagre').click();
    });*/
  it('Edit absence', () => {
    cy.visit('http://localhost:3000/fravaersside');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
    cy.contains('10.10.2023 - 16.10.2023').click();
  });
});
