import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector, useForm } from '../../services/store';
import { loginUser, selectLoginError } from '@slices/userSlice';

export const Login: FC = () => {
  const { values, setValues } = useForm({ email: '', password: '' });
  const dispatch = useDispatch();
  const loginError = useSelector(selectLoginError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  return (
    <LoginUI
      errorText={loginError || ''}
      email={values.email}
      setEmail={(val) => setValues((prev) => ({ ...prev, email: val }))}
      password={values.password}
      setPassword={(val) => setValues((prev) => ({ ...prev, password: val }))}
      handleSubmit={handleSubmit}
    />
  );
};
