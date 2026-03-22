import reducer, { getFeeds } from './feedSlice';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  test('pending — ставит isLoading', () => {
    const state = reducer(initialState, getFeeds.pending(''));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fulfilled — записывает ленту заказов', () => {
    const feedData = {
      orders: [
        {
          _id: 'feed1',
          status: 'done',
          name: 'Марсианский бургер',
          createdAt: '2024-02-10',
          updatedAt: '2024-02-10',
          number: 777,
          ingredients: ['ing1', 'ing2']
        }
      ],
      total: 150,
      totalToday: 12
    };
    const state = reducer(initialState, getFeeds.fulfilled(feedData, ''));
    expect(state.orders).toEqual(feedData.orders);
    expect(state.total).toBe(150);
    expect(state.totalToday).toBe(12);
    expect(state.isLoading).toBe(false);
  });

  test('rejected — записывает ошибку', () => {
    const state = reducer(
      initialState,
      getFeeds.rejected(new Error('Сервер недоступен'), '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Сервер недоступен');
  });
});
