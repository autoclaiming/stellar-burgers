import { FC, useState, SyntheticEvent, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { useForm } from '../../services/store';

export const ForgotPassword: FC = () => {
  const { values, setValues } = useForm({ email: '' });
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi({ email: values.email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={values.email}
      setEmail={(val: SetStateAction<string>) =>
        setValues((prev) => ({
          ...prev,
          email: typeof val === 'function' ? val(prev.email) : val
        }))
      }
      handleSubmit={handleSubmit}
    />
  );
};
