import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { ROUTES } from '@/constants/routes';

export default auth((req) => {
  const session = req.auth;
  const isAuthenticated = !!session && session.error !== 'SessionExpired';
  const isOnLoginPage = req.nextUrl.pathname.startsWith(ROUTES.LOGIN);

  // Usuario autenticado en login → redirigir a home
  if (isOnLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
  }

  // Usuario sin sesión fuera del login → redirigir a login
  if (!isOnLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
  }

  return NextResponse.next();
});

export const config = {
  // Aplica el middleware a todas las rutas excepto assets estáticos y API de auth
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|icon.png).*)'],
};
