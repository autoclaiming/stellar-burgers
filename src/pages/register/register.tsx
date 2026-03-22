import { FC, SyntheticEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector, useForm } from '../../services/store';
import { registerUser, selectRegisterError } from '@slices/userSlice';

export const Register: FC = () => {
  const { values, setValues } = useForm({
    userName: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const registerError = useSelector(selectRegisterError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email: values.email,
        name: values.userName,
        password: values.password
      })
    );
  };

  return (
    <RegisterUI
      errorText={registerError || ''}
      email={values.email}
      userName={values.userName}
      password={values.password}
      setEmail={(val) => setValues((prev) => ({ ...prev, email: val }))}
      setPassword={(val) => setValues((prev) => ({ ...prev, password: val }))}
      setUserName={(val) => setValues((prev) => ({ ...prev, userName: val }))}
      handleSubmit={handleSubmit}
    />
  );
};
