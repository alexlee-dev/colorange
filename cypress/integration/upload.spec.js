/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable spaced-comment */
/* global context, beforeEach, cy, it, Cypress */

/// <reference types="cypress" />

context('Upload', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should handle uploading a correct csv file', () => {
    cy.get('body').should('contain.text', 'colorange');

    cy.fixture('example.csv', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get('input[type=file]').attachFile({
          fileContent,
          filePath: 'example.csv',
          // encoding: 'utf-8',
        });
      });

    cy.get('button[type=button]').click({ force: true });

    cy.get('body').should('contain.text', 'LOADING');

    cy.wait(10000);

    cy.get('#application-container').should('exist');
  });
});