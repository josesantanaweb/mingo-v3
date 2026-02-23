import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/validations/authSchema';

const SESSION_DURATION_MS = 2 * 60 * 1000; // 2 minutos

const MOCK_USER = {
  id: 'mock-user-1',
  name: 'Admin Mingo',
  email: 'admin@mingo.com',
  password: 'Admin123!',
} as const;

const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
          return null;
        }

        // Cuando el backend esté listo, la respuesta incluirá:
        // const { accessToken, refreshToken } = await authApi.login(email, password);
        return {
          id: MOCK_USER.id,
          name: MOCK_USER.name,
          email: MOCK_USER.email,
          // refreshToken: data.refreshToken  ← agregar aquí
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: SESSION_DURATION_MS / 1000,
  },

  callbacks: {
    async jwt({ token, user }) {
      // Primera vez: se acaba de loguear
      if (user) {
        return {
          ...token,
          id: user.id,
          accessTokenExpires: Date.now() + SESSION_DURATION_MS,
          // refreshToken: user.refreshToken  ← agregar aquí cuando el back esté listo
        };
      }

      // Token aún válido
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Token expirado → aquí va la lógica de refresh cuando el back esté listo:
      // try {
      //   return await refreshAccessToken(token);
      // } catch {
      //   return { ...token, error: 'SessionExpired' as const };
      // }
      return { ...token, error: 'SessionExpired' as const };
    },

    async session({ session, token }) {
      if (token.error === 'SessionExpired') {
        return { ...session, error: 'SessionExpired' as const };
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
        // Exponemos el tiempo exacto de expiración para el countdown
        expires: new Date(token.accessTokenExpires as number).toISOString(),
      };
    },
  },

  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
