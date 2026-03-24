import reducer, { getUserOrders } from './userOrdersSlice';

describe('userOrdersSlice', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    error: null
  };

  test('pending — начало загрузки', () => {
    const state = reducer(initialState, getUserOrders.pending(''));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fulfilled — заказы пользователя загружены', () => {
    const orders = [
      {
        _id: 'uo1',
        status: 'done',
        name: 'Заказ #1',
        createdAt: '2024-03-01',
        updatedAt: '2024-03-01',
        number: 42,
        ingredients: ['ing1']
      }
    ];
    const state = reducer(initialState, getUserOrders.fulfilled(orders, ''));
    expect(state.orders).toEqual(orders);
    expect(state.isLoading).toBe(false);
  });

  test('rejected — ошибка при загрузке', () => {
    const state = reducer(
      initialState,
      getUserOrders.rejected(new Error('Нет доступа'), '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Нет доступа');
  });
});
