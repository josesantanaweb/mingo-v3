'use client';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import ToastProvider from '@/providers/ToastProvider';
import { makeClient } from '@/api/client';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <ApolloNextAppProvider makeClient={makeClient}>
        <ToastProvider />
        {children}
      </ApolloNextAppProvider>
    </SessionProvider>
  );
};

export default Providers;
