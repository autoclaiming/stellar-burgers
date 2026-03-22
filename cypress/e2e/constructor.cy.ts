const INGREDIENT_BUN = 'Краторная булка N-200i';
const INGREDIENT_MAIN = 'Биокотлета из марсианской Магнолии';

beforeEach(() => {
  cy.intercept('GET', '**/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');

  cy.intercept('GET', '**/api/auth/user', {
    body: {
      success: true,
      user: { email: 'test@test.com', name: 'Test User' }
    }
  });

  cy.intercept('POST', '**/api/orders', {
    body: {
      success: true,
      name: 'Space флюоресцентный бургер',
      order: { number: 12345 }
    }
  }).as('createOrder');

  cy.setCookie('accessToken', 'Bearer test-token');
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'test-refresh');
  });

  cy.visit('/');
  cy.wait('@getIngredients');
});

afterEach(() => {
  cy.clearCookies();
  cy.window().then((win) => {
    win.localStorage.removeItem('refreshToken');
  });
});

describe('Конструктор бургера', () => {
  it('добавление ингредиента в конструктор', () => {
    cy.contains(INGREDIENT_MAIN)
      .closest('li')
      .find('button')
      .click();
    cy.get('[class*=burger_constructor]').should('contain', INGREDIENT_MAIN);
  });

  it('добавление булки в конструктор', () => {
    cy.contains(INGREDIENT_BUN)
      .closest('li')
      .find('button')
      .click();
    cy.get('[class*=burger_constructor]').should(
      'contain',
      `${INGREDIENT_BUN} (верх)`
    );
    cy.get('[class*=burger_constructor]').should(
      'contain',
      `${INGREDIENT_BUN} (низ)`
    );
  });

  it('открытие модального окна ингредиента', () => {
    cy.contains(INGREDIENT_MAIN).click();
    cy.get('[class*=modal]').should('exist');
    cy.get('[class*=modal]').should('contain', 'Детали ингредиента');
    cy.get('[class*=modal]').should('contain', INGREDIENT_MAIN);
  });

  it('закрытие модалки по крестику', () => {
    cy.contains(INGREDIENT_MAIN).click();
    cy.get('[class*=modal]').should('exist');
    cy.get('[class*=modal] button[type=button]').first().click();
    cy.get('[class*=modal]').should('not.exist');
  });

  it('закрытие модалки по клику на оверлей', () => {
    cy.contains(INGREDIENT_MAIN).click();
    cy.get('[class*=modal]').should('exist');
    cy.get('[class*=overlay]').click({ force: true });
    cy.get('[class*=modal]').should('not.exist');
  });

  it('оформление заказа', () => {
    cy.contains(INGREDIENT_BUN).closest('li').find('button').click();
    cy.contains(INGREDIENT_MAIN).closest('li').find('button').click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[class*=modal]').should('contain', '12345');

    cy.get('[class*=modal] button[type=button]').first().click();
    cy.get('[class*=modal]').should('not.exist');

    cy.get('[class*=burger_constructor]').should('contain', 'Выберите булки');
    cy.get('[class*=burger_constructor]').should('contain', 'Выберите начинку');
  });
});
