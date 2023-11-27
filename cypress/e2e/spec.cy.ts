import { FORM_ERRORS } from "../../src/constants";

describe('Post Adoption Form', () => {
  it('contact us page error working properly', () => {
    cy.visit('http://localhost:3000/post/adoption');
    cy.contains('Submit').click();
    
    cy.contains(FORM_ERRORS.NAME)
    cy.contains(FORM_ERRORS.CONTACT)
    cy.contains(FORM_ERRORS.PET_TYPE)
    cy.contains(FORM_ERRORS.PET_NAME)
    cy.contains(FORM_ERRORS.DESCRIPTION)
    cy.contains(FORM_ERRORS.IMAGE)

    cy.get('#name').type('John')
    cy.contains(FORM_ERRORS.NAME).should('not.exist')

    cy.get('#contact').type('johnchan@gmail.com')
    cy.contains(FORM_ERRORS.CONTACT).should('not.exist')

  });
});
