import store, { rootReducer } from './store';

describe('rootReducer', () => {
  test('инициализация rootReducer', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(store.getState());
  });
});
