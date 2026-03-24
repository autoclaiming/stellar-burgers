const INGREDIENT_BUN = 'Краторная булка N-200i';
const INGREDIENT_MAIN = 'Биокотлета из марсианской Магнолии';

describe('Конструктор бургера', () => {
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

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh');
      }
    });

    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });

  it('добавление ингредиента в конструктор', () => {
    cy.contains(INGREDIENT_MAIN)
      .closest('li')
      .contains('Добавить')
      .click();
    cy.contains('Оформить заказ')
      .closest('section')
      .should('contain', INGREDIENT_MAIN);
  });

  it('добавление булки в конструктор', () => {
    cy.contains(INGREDIENT_BUN)
      .closest('li')
      .contains('Добавить')
      .click();
    cy.contains(`${INGREDIENT_BUN} (верх)`).should('exist');
    cy.contains(`${INGREDIENT_BUN} (низ)`).should('exist');
  });

  it('открытие модального окна ингредиента', () => {
    cy.contains(INGREDIENT_MAIN).click();
    cy.get('#modals').should('contain', 'Детали ингредиента');
    cy.get('#modals').should('contain', INGREDIENT_MAIN);
  });

  it('закрытие модалки по крестику', () => {
    cy.contains(INGREDIENT_MAIN).click();
    cy.get('#modals').children().should('exist');
    cy.get('#modals button[type=button]').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('закрытие модалки по клику на оверлей', () => {
    cy.contains(INGREDIENT_MAIN).click();
    cy.get('#modals').children().should('have.length.above', 0);
    cy.get('#modals').children().last().click({ force: true });
    cy.get('#modals').children().should('have.length', 0);
  });

  it('оформление заказа', () => {
    cy.contains(INGREDIENT_BUN).closest('li').contains('Добавить').click();
    cy.contains(INGREDIENT_MAIN).closest('li').contains('Добавить').click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('#modals').should('contain', '12345');

    cy.get('#modals button[type=button]').click();
    cy.get('#modals').children().should('have.length', 0);

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
