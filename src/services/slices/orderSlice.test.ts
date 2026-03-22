import reducer, { createOrder } from './orderSlice';

describe('orderSlice', () => {
  const initialState = {
    order: null,
    orderRequest: false,
    error: null
  };

  test('экшен pending — orderRequest = true', () => {
    const state = reducer(initialState, createOrder.pending('', []));
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('экшен fulfilled — заказ записывается в стор', () => {
    const order = {
      _id: 'order1',
      status: 'done',
      name: 'Space бургер',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      number: 54321,
      ingredients: ['id1', 'id2']
    };
    const state = reducer(initialState, createOrder.fulfilled(order, '', []));
    expect(state.order).toEqual(order);
    expect(state.orderRequest).toBe(false);
  });

  test('экшен rejected — ошибка записывается', () => {
    const state = reducer(
      initialState,
      createOrder.rejected(new Error('Ошибка сервера'), '', [])
    );
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка сервера');
  });
});
