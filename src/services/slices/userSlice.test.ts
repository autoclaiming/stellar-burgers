import reducer, { loginUser, getUser } from './userSlice';

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    loginError: null,
    registerError: null
  };

  test('loginUser.pending — сбрасывает ошибку логина', () => {
    const prevState = { ...initialState, loginError: 'старая ошибка' };
    const state = reducer(
      prevState,
      loginUser.pending('', { email: '', password: '' })
    );
    expect(state.loginError).toBeNull();
  });

  test('loginUser.fulfilled — сохраняет пользователя', () => {
    const user = { email: 'user@example.com', name: 'Иван' };
    const state = reducer(
      initialState,
      loginUser.fulfilled(user, '', { email: '', password: '' })
    );
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('loginUser.rejected — записывает ошибку', () => {
    const state = reducer(
      initialState,
      loginUser.rejected(
        new Error('Неверный пароль'),
        '',
        { email: '', password: '' }
      )
    );
    expect(state.loginError).toBe('Неверный пароль');
  });

  test('getUser.fulfilled — пользователь загружен', () => {
    const user = { email: 'user@example.com', name: 'Иван' };
    const state = reducer(initialState, getUser.fulfilled(user, ''));
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('getUser.rejected — авторизация проверена, юзера нет', () => {
    const state = reducer(
      initialState,
      getUser.rejected(new Error('Не авторизован'), '')
    );
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });
});
