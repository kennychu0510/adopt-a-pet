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

describe('Post Missing Form', () => {
  it('post missing form to work properly', () => {
    cy.visit(`${Cypress.env('rootURL')}/post/missing`);
    cy.get('[type="submit"]').click()

    cy.contains(FORM_ERRORS.NAME).should('exist');
    cy.contains(FORM_ERRORS.CONTACT).should('exist');
    cy.contains(FORM_ERRORS.PET_TYPE).should('exist');
    cy.contains(FORM_ERRORS.PET_NAME).should('exist');
    cy.contains(FORM_ERRORS.DESCRIPTION).should('exist');
    cy.contains(FORM_ERRORS.DATE).should('exist');
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

    cy.get('.ant-picker-input > input').type('2023-11-16 11:14:11', {
      force: true,
    });
    cy.get('.ant-picker-ok > button').click();
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

    cy.location('pathname', { timeout: 5000 }).should('eq', '/');
    cy.contains('Mew').should('exist');

    cy.get('[itemid="nav-Missing"]').click();
    cy.location('pathname', { timeout: 5000 }).should('eq', '/missing');
    cy.contains('Mew').should('exist');

    cy.visit(`${Cypress.env('rootURL')}/post/missing`);

    cy.get('#name').type('Jake');

    cy.get('#contact').type('jake@gmail.com');

    cy.get('[itemid="animal-type-select"]').click();
    cy.get('[itemid="animal-type-turtle"]').click();

    cy.get('#petName').type('Jojo');

    cy.get('#description').type('A cool turtle!');

    cy.get('.ant-picker-input > input').type('2023-11-16 11:14:11', {
      force: true,
    });
    cy.get('.ant-picker-ok > button').click();

    cy.get('input[type=file]').selectFile('cypress/e2e/photos/turtle1.jpg', {
      action: 'drag-drop',
      force: true,
    });
    cy.contains('Submit').click();
    cy.contains('Form posted successfully!').should('exist');

    cy.location('pathname', { timeout: 5000 }).should('eq', '/');
    cy.contains('Mew').should('exist');
    cy.contains('Jojo').should('exist');

    cy.get('[itemid="nav-Missing"]').click();
    cy.location('pathname', { timeout: 5000 }).should('eq', '/missing');
    cy.contains('Mew').should('exist');
    cy.contains('Jojo').should('exist');
  });
});
