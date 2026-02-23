'use client';

import { useSession, signOut } from 'next-auth/react';
import { useSessionCountdown } from '@/hooks/useSessionCountdown';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function getCountdownColor(seconds: number) {
  if (seconds > 60) return 'text-green-400';
  if (seconds > 30) return 'text-yellow-400';
  return 'text-red-400';
}

export default function HomePage() {
  const { data: session } = useSession();
  const { secondsLeft } = useSessionCountdown();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      {/* Bienvenida */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Bienvenido</h1>
        {session?.user?.name && (
          <p className="mt-1 text-sm text-gray-400">{session.user.name}</p>
        )}
      </div>

      {/* Contador de sesión */}
      <div className="w-full max-w-xs rounded-2xl border border-gray-700 bg-gray-800 p-6 text-center shadow-xl">
        <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">
          Sesión expira en
        </p>

        {secondsLeft !== null ? (
          <p
            className={`text-5xl font-mono font-bold tabular-nums transition-colors ${getCountdownColor(secondsLeft)}`}
          >
            {formatTime(secondsLeft)}
          </p>
        ) : (
          <p className="text-5xl font-mono font-bold text-gray-600">--:--</p>
        )}

        <p className="mt-3 text-xs text-gray-500">
          Al expirar serás redirigido al login
        </p>
      </div>

      {/* Info de sesión */}
      {session?.user && (
        <div className="w-full max-w-xs rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-sm">
          <p className="text-gray-400">
            <span className="text-gray-500">Email: </span>
            {session.user.email}
          </p>
          <p className="mt-1 text-gray-400">
            <span className="text-gray-500">ID: </span>
            {session.user.id}
          </p>
        </div>
      )}

      {/* Cerrar sesión */}
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="rounded-lg border border-gray-600 px-6 py-2 text-sm text-gray-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
