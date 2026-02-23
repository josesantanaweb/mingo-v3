'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { ROUTES } from '@/constants/routes';

/**
 * Hook que retorna los segundos restantes de la sesión y redirige
 * al login cuando ésta expira.
 *
 * Cuando el backend tenga refresh token, el logout automático
 * ya no se ejecutará porque el JWT callback renovará el token
 * antes de marcar el error 'SessionExpired'.
 */
export function useSessionCountdown() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const handleExpired = useCallback(async () => {
    await signOut({ redirect: false });
    router.push(ROUTES.LOGIN);
  }, [router]);

  useEffect(() => {
    if (status !== 'authenticated' || !session) return;

    if (session.error === 'SessionExpired') {
      handleExpired();
      return;
    }

    const expiresAt = new Date(session.expires).getTime();

    const tick = () => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);

      if (remaining === 0) {
        handleExpired();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [session, status, handleExpired]);

  return { secondsLeft, status };
}
