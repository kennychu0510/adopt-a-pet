import { FORM_ERRORS } from '../../src/constants';
import { createClient } from '@supabase/supabase-js';
import 'cypress-network-idle'


beforeEach(async () => {
  const supabase = createClient(
    Cypress.env('SUPABASE_URL'),
    Cypress.env('SUPABASE_ANON_KEY')
  );
  await supabase.from('Adoption').delete().gte('id', 0);
  await supabase.from('Missing').delete().gte('id', 0);
  await supabase.from('Wish').delete().gte('id', 0);
  await supabase.from('Contact Us').delete().gte('id', 0);
  cy.log('reset DB done');
});

describe('Post Wish Form', () => {
  it('post wish form to work properly', () => {
    cy.visit(`${Cypress.env('rootURL')}/post/wish`);
    cy.get('[type="submit"]').click();

    cy.contains(FORM_ERRORS.NAME).should('exist');
    cy.contains(FORM_ERRORS.CONTACT).should('exist');
    cy.contains(FORM_ERRORS.PET_TYPE).should('exist');
    cy.contains(FORM_ERRORS.DESCRIPTION).should('exist');

    cy.get('#name').type('John');
    cy.contains(FORM_ERRORS.NAME).should('not.exist');

    cy.get('#contact').type('johnchan@gmail.com');
    cy.contains(FORM_ERRORS.CONTACT).should('not.exist');

    cy.get('[itemid="animal-type-select"]').click();
    cy.get('[itemid="animal-type-cat"]').click();
    cy.contains(FORM_ERRORS.PET_TYPE).should('not.exist');

    cy.get('#description').type('adopt me!');
    cy.contains(FORM_ERRORS.DESCRIPTION).should('not.exist');

    cy.get('[type="submit"]').click();

    cy.contains('Form posted successfully!').should('exist');

    cy.location('pathname', {timeout: 5000}).should('eq', '/')
    cy.get('[itemid="nav-Wish List"]').click();
    cy.location('pathname', {timeout: 5000}).should('eq', '/wish');
    cy.contains('Cat').should('exist')
  });
});

