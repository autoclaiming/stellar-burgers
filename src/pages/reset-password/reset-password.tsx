import { FC, SyntheticEvent, useEffect, useState, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
import { useForm } from '../../services/store';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const { values, setValues } = useForm({ password: '', token: '' });
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    resetPasswordApi({ password: values.password, token: values.token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error?.message}
      password={values.password}
      token={values.token}
      setPassword={(val: SetStateAction<string>) =>
        setValues((prev) => ({
          ...prev,
          password: typeof val === 'function' ? val(prev.password) : val
        }))
      }
      setToken={(val: SetStateAction<string>) =>
        setValues((prev) => ({
          ...prev,
          token: typeof val === 'function' ? val(prev.token) : val
        }))
      }
      handleSubmit={handleSubmit}
    />
  );
};
