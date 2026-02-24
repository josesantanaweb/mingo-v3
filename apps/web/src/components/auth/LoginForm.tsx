'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loginSchema, type LoginFormData } from '@/validations/authSchema';
import { ROUTES } from '@/constants/routes';
import { Button, Input } from '@mingo/components';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const email = watch('email');
  const password = watch('password');

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setAuthError('Credenciales incorrectas. Verifica tu email y contraseña.');
      return;
    }

    router.push(ROUTES.HOME);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="space-y-1.5">
        <Input
          label="Correo electrónico"
          placeholder="Ej: demo@correo.com"
          inputSize="lg"
          value={email}
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div className="space-y-1.5">
        <Input
           label="Contraseña"
           type={showPassword ? 'text' : 'password'}
           icon={showPassword ? 'show' : 'hide'}
           iconPosition="right"
           placeholder="Ingresa tu contraseña"
           inputSize="lg"
           onIconClick={() => setShowPassword(!showPassword)}
           value={password}
           {...register('password')}
           error={errors.password?.message}
        />
      </div>

      {authError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">{authError}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={!isValid}
      >
        {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
      </Button>

      <p className="text-center text-xs text-gray-500">
        Demo: <span className="text-gray-400">admin@mingo.com</span> /{' '}
        <span className="text-gray-400">Admin123!</span>
      </p>
    </form>
  );
}
