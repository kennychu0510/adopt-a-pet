import { FORM_ERRORS } from '../../src/constants';
import { createClient } from '@supabase/supabase-js';
import 'cypress-network-idle'

const ROOT_URL = 'http://localhost:3000';

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

describe('Post Adoption Form', () => {
  it('post adoption form to work properly', () => {
    cy.visit(`${ROOT_URL}/post/adoption`);
    cy.waitForNetworkIdle(500)
    cy.get('[type="submit"]').click();
    
    cy.contains('Please check your form!', {timeout: 5000}).should('exist');
    cy.contains(FORM_ERRORS.NAME).should('exist');
    cy.contains(FORM_ERRORS.CONTACT).should('exist');
    cy.contains(FORM_ERRORS.PET_TYPE).should('exist');
    cy.contains(FORM_ERRORS.PET_NAME).should('exist');
    cy.contains(FORM_ERRORS.DESCRIPTION).should('exist');
    cy.contains(FORM_ERRORS.IMAGE).should('exist');

    cy.get('#name').type('John');
    cy.contains(FORM_ERRORS.NAME).should('not.exist');

    cy.get('#contact').type('johnchan@gmail.com');
    cy.contains(FORM_ERRORS.CONTACT).should('not.exist');

    cy.get('[itemid="animal-type-select"]').click();
    cy.get('[itemid="animal-type-cat"]').click();
    cy.contains(FORM_ERRORS.PET_TYPE).should('not.exist');

    cy.get('#petName').type('Mew');
    cy.contains(FORM_ERRORS.PET_NAME).should('not.exist');

    cy.get('#description').type('adopt me!');
    cy.contains(FORM_ERRORS.DESCRIPTION).should('not.exist');

    cy.get('input[type=file]').selectFile('cypress/e2e/photos/cat1.jpg', {
      action: 'drag-drop',
      force: true,
    });

    // cy.intercept(
    //   {
    //     method: 'POST',
    //     url: `${ROOT_URL}/api/*`,
    //   },
    //   { message: 'update to database success' }
    // );

    cy.contains('Submit').click();

    cy.contains('Form posted successfully!').should('exist');

    cy.location('pathname').should('eq', '/');
    cy.contains('Mew', { timeout: 5000 }).should('exist');

    cy.get('#hor-sec-link-all').click();
    cy.contains('Adopt a pet', { timeout: 5000 }).should('exist');
    cy.contains('Mew').should('exist');

    /* Second Adoption Data */

    cy.visit(`${ROOT_URL}/post/adoption`);

    cy.get('#name').type('David');
    cy.get('#contact').type('davidchan@gmail.com');
    cy.get('[itemid="animal-type-select"]').click();
    cy.get('[itemid="animal-type-dog"]').click();
    cy.get('#petName').type('Jack');
    cy.get('#description').type("Jacky Chan's best friend!");

    cy.get('input[type=file]').selectFile('cypress/e2e/photos/dog1.jpeg', {
      action: 'drag-drop',
      force: true,
    });

    cy.contains('Submit').click();

    cy.contains('Form posted successfully!').should('exist');

    cy.location('pathname').should('eq', '/');
    cy.contains('Jack', { timeout: 5000 }).should('exist');

    cy.get('#hor-sec-link-all').click();
    cy.contains('Adopt a pet', { timeout: 5000 }).should('exist');
    cy.contains('Mew').should('exist');
    cy.contains('Jack').should('exist');
  });
});
