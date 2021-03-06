/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable spaced-comment */
/* global context, beforeEach, cy, it, Cypress */

/// <reference types="cypress" />

context('Application Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/app');
    cy.get('#onboarding-primary-1').click();
    cy.get('#onboarding-primary-2').click();
    cy.get('#onboarding-primary-3').click();
    cy.get('body').should(
      'contain.text',
      'Upload a csv document to see the sorted applications',
    );
  });

  it('Should handle uploading a correct csv file', () => {
    cy.get('body').should('contain.text', 'colorange');

    cy.percySnapshot();

    cy.fixture('example.csv', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get('input[type=file]').attachFile({
          fileContent,
          filePath: 'example.csv',
          // encoding: 'utf-8',
        });
      });

    cy.get('#upload-button').click({ force: true });

    cy.get('body').should('contain.text', 'LOADING');

    cy.wait(7500);

    cy.get('#application-container').should('exist');
  });

  it('Should display full Nav', () => {
    cy.get('#nav').should('contain.text', 'How It Works');
    // cy.get('#nav').should('contain.text', 'Log In');
  });
});
