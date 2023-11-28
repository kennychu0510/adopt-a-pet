import { FORM_ERRORS } from '../../src/constants';
import { createClient } from '@supabase/supabase-js';

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

describe('Contact Us Form', () => {
  it('contact us form to work properly', () => {
    cy.visit(`${Cypress.env('rootURL')}/contact`);
    cy.get('[type="submit"]').click();

    cy.contains(FORM_ERRORS.NAME).should('exist');
    cy.contains(FORM_ERRORS.CONTACT).should('exist');
    cy.contains(FORM_ERRORS.DESCRIPTION).should('exist');

    cy.get('#name').type('John');
    cy.contains(FORM_ERRORS.NAME).should('not.exist');

    cy.get('#contact').type('johnchan@gmail.com');
    cy.contains(FORM_ERRORS.CONTACT).should('not.exist');

    cy.get('#description').type('Nice Website!');
    cy.contains(FORM_ERRORS.DESCRIPTION).should('not.exist');

    cy.get('[type="submit"]').click();

    cy.contains('Message sent successfully!').should('exist');

    cy.location('pathname', { timeout: 5000 }).should('eq', '/');
  });
});
