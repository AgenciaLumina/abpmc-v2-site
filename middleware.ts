import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Rotas de admin exigem role ADMIN ou SUPERADMIN
    if (path.startsWith("/admin")) {
      if (!token || (token.role !== "ADMIN" && token.role !== "SUPERADMIN")) {
        return NextResponse.redirect(new URL("/auth/admin", req.url));
      }
    }

    // Rotas de associado exigem autenticação
    if (path.startsWith("/associado")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/associado", req.url));
      }

      // Verifica se o associado está bloqueado
      if (token.status === "BLOQUEADO") {
        return NextResponse.redirect(new URL("/associado/bloqueado", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",  // Proteger APIs admin
    "/associado/((?!bloqueado).*)", // Excluir página de bloqueado
  ],
};
