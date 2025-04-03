import { auth } from "@/auth.config";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isProfilePage = req.nextUrl.pathname.startsWith("/profile");
  const isHomePage = req.nextUrl.pathname === "/";
  const isPublicPage =
    isHomePage || req.nextUrl.pathname.startsWith("/products");

  // Si es una página pública, permitimos el acceso
  if (isPublicPage) return;

  // Si el usuario no está autenticado y trata de acceder a una ruta protegida
  if (!isLoggedIn && isProfilePage) {
    const loginUrl = new URL("/auth/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  // Si el usuario está autenticado y trata de acceder a páginas de auth
  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/profile", req.nextUrl));
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
