import reducer, { getIngredients } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: true,
    error: null
  };

  test('обработка экшена pending', () => {
    const state = reducer(initialState, getIngredients.pending(''));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('обработка экшена fulfilled', () => {
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
      }
    ];
    const state = reducer(
      initialState,
      getIngredients.fulfilled(ingredients, '')
    );
    expect(state.ingredients).toEqual(ingredients);
    expect(state.isLoading).toBe(false);
  });

  test('обработка экшена rejected', () => {
    const state = reducer(
      initialState,
      getIngredients.rejected(new Error('Ошибка загрузки'), '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
