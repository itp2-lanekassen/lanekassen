describe('Login', () => {
  it('Logs in', () => {
    cy.visit('http://localhost:3000/profil');
    cy.get('button').contains('Logg inn med Microsoft Azure').click();
  });
});
describe('Test profile URL', () => {
  it('Check that profile page is displayed', () => {
    cy.get('h1').contains('Profil');
  });
});
