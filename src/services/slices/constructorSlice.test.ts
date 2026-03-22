import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructorSlice';
import { TIngredient } from '@utils-types';

const testBun: TIngredient = {
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
};

const testMain: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
};

const testSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
};

describe('constructorSlice', () => {
  test('добавление булки', () => {
    const state = reducer(undefined, addIngredient(testBun));
    expect(state.bun?._id).toBe(testBun._id);
    expect(state.bun?.type).toBe('bun');
    expect(state.ingredients).toHaveLength(0);
  });

  test('добавление начинки', () => {
    const state = reducer(undefined, addIngredient(testMain));
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toHaveProperty('id');
    expect(state.ingredients[0]._id).toBe(testMain._id);
  });

  test('удаление ингредиента', () => {
    let state = reducer(undefined, addIngredient(testMain));
    const id = state.ingredients[0].id;
    state = reducer(state, removeIngredient(id));
    expect(state.ingredients).toHaveLength(0);
  });

  test('перемещение ингредиента', () => {
    let state = reducer(undefined, addIngredient(testMain));
    state = reducer(state, addIngredient(testSauce));

    state = reducer(state, moveIngredient({ from: 0, to: 1 }));
    expect(state.ingredients[0]._id).toBe(testSauce._id);
    expect(state.ingredients[1]._id).toBe(testMain._id);
  });
});
