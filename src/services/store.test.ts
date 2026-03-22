import { rootReducer } from './store';

describe('rootReducer', () => {
  test('инициализация rootReducer', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('userOrders');
  });
});
