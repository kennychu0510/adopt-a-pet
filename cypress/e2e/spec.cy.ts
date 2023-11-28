import { FORM_ERRORS } from '../../src/constants';

const ROOT_URL = 'http://localhost:3000';

describe('Post Adoption Form', () => {
  it('post adoption form to work properly', () => {
    cy.visit(`${ROOT_URL}/post/adoption`);
    cy.contains('Submit').click();

    cy.contains(FORM_ERRORS.NAME).should('exist')
    cy.contains(FORM_ERRORS.CONTACT).should('exist')
    cy.contains(FORM_ERRORS.PET_TYPE).should('exist')
    cy.contains(FORM_ERRORS.PET_NAME).should('exist')
    cy.contains(FORM_ERRORS.DESCRIPTION).should('exist')
    cy.contains(FORM_ERRORS.IMAGE).should('exist')

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

    cy.get('input[type=file]').selectFile('cypress/e2e/adopt.png', {
      action: 'drag-drop',
      force: true,
    });

    cy.intercept(
      {
        method: 'POST',
        url: `${ROOT_URL}/api/*`,
      },
      { message: 'update to database success' }
    );

    cy.contains('Submit').click();

    cy.contains('Form posted successfully!').should('exist')

    cy.location('pathname').should('eq', '/')
  });
});

describe('Post Missing Form', () => {
  it('post missing form to work properly', () => {
    cy.visit(`${ROOT_URL}/post/missing`);
    cy.contains('Submit').click();

    cy.contains(FORM_ERRORS.NAME).should('exist')
    cy.contains(FORM_ERRORS.CONTACT).should('exist')
    cy.contains(FORM_ERRORS.PET_TYPE).should('exist')
    cy.contains(FORM_ERRORS.PET_NAME).should('exist')
    cy.contains(FORM_ERRORS.DESCRIPTION).should('exist')
    cy.contains(FORM_ERRORS.DATE).should('exist')
    cy.contains(FORM_ERRORS.IMAGE).should('exist')

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

    cy.get('.ant-picker-input > input').type('2023-11-16 11:14:11', { force: true });
    cy.get('.ant-picker-ok > button').click();
    cy.contains(FORM_ERRORS.DESCRIPTION).should('not.exist');

    cy.get('input[type=file]').selectFile('cypress/e2e/adopt.png', {
      action: 'drag-drop',
      force: true,
    });

    cy.intercept(
      {
        method: 'POST',
        url: `${ROOT_URL}/api/*`,
      },
      { message: 'update to database success' }
    );

    cy.contains('Submit').click();

    cy.contains('Form posted successfully!').should('exist')

    cy.location('pathname').should('eq', '/')
  });
});


describe('Post Wish Form', () => {
  it('post wish form to work properly', () => {
    cy.visit(`${ROOT_URL}/post/wish`);
    cy.get('[type="submit"]').click();

    cy.contains(FORM_ERRORS.NAME).should('exist')
    cy.contains(FORM_ERRORS.CONTACT).should('exist')
    cy.contains(FORM_ERRORS.PET_TYPE).should('exist')
    cy.contains(FORM_ERRORS.DESCRIPTION).should('exist')

    cy.get('#name').type('John');
    cy.contains(FORM_ERRORS.NAME).should('not.exist');

    cy.get('#contact').type('johnchan@gmail.com');
    cy.contains(FORM_ERRORS.CONTACT).should('not.exist');

    cy.get('[itemid="animal-type-select"]').click();
    cy.get('[itemid="animal-type-cat"]').click();
    cy.contains(FORM_ERRORS.PET_TYPE).should('not.exist');

    cy.get('#description').type('adopt me!');
    cy.contains(FORM_ERRORS.DESCRIPTION).should('not.exist');

    cy.intercept(
      {
        method: 'POST',
        url: `${ROOT_URL}/api/*`,
      },
      { message: 'update to database success' }
    );

    cy.get('[type="submit"]').click();

    cy.contains('Form posted successfully!').should('exist')

    cy.location('pathname').should('eq', '/')
  });
});