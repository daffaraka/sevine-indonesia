import { useState, useEffect, FormEvent } from 'react';
import { router } from '@inertiajs/react';

export interface AuthLoginFormErrors {
  email?: string;
  password?: string;
}

interface UseAuthLoginFormParams {
  serverErrors?: Record<string, string>;
  onSuccessLogin?: (email: string) => void;
}

export function useAuthLoginForm({
  serverErrors,
  onSuccessLogin,
}: UseAuthLoginFormParams) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotHelp, setShowForgotHelp] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [localErrors, setLocalErrors] = useState<AuthLoginFormErrors>({});

  useEffect(() => {
    document.title = 'Masuk Backoffice - CV. Sevine Indonesia';
  }, []);

  const emailError = localErrors.email || serverErrors?.email || '';
  const passwordError = localErrors.password || serverErrors?.password || '';
  const summaryError = emailError || passwordError;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (localErrors.email) {
      setLocalErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (localErrors.password) {
      setLocalErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const nextErrors: AuthLoginFormErrors = {};

    if (!trimmedEmail) {
      nextErrors.email = 'Alamat email staf wajib diisi.';
    }
    if (!password) {
      nextErrors.password = 'Kata sandi wajib diisi.';
    }

    if (nextErrors.email || nextErrors.password) {
      setLocalErrors(nextErrors);
      return;
    }

    setLocalErrors({});

    if (onSuccessLogin) {
      onSuccessLogin(trimmedEmail);
      return;
    }

    router.post(
      '/login',
      {
        email: trimmedEmail,
        password,
        remember,
      },
      {
        onStart: () => setProcessing(true),
        onError: () => setPassword(''),
        onFinish: () => setProcessing(false),
      },
    );
  };

  return {
    email,
    password,
    remember,
    showPassword,
    showForgotHelp,
    processing,
    emailError,
    passwordError,
    summaryError,
    handleEmailChange,
    handlePasswordChange,
    setRemember,
    toggleShowPassword: () => setShowPassword((prev) => !prev),
    toggleForgotHelp: () => setShowForgotHelp((prev) => !prev),
    handleSubmit,
  };
}
