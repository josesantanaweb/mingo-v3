import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    error?: 'SessionExpired';
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    // refreshToken?: string;  ← agregar cuando el back esté listo
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accessTokenExpires: number;
    error?: 'SessionExpired';
    // refreshToken?: string;  ← agregar cuando el back esté listo
  }
}
