import { FC, SyntheticEvent, SetStateAction } from 'react';
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
      setEmail={(val: SetStateAction<string>) =>
        setValues((prev) => ({
          ...prev,
          email: typeof val === 'function' ? val(prev.email) : val
        }))
      }
      password={values.password}
      setPassword={(val: SetStateAction<string>) =>
        setValues((prev) => ({
          ...prev,
          password: typeof val === 'function' ? val(prev.password) : val
        }))
      }
      handleSubmit={handleSubmit}
    />
  );
};
