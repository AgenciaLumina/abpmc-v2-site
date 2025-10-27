import { UserRole } from "@prisma/client";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      nome: string;
      role: UserRole;
      status: string;
      vencimento?: Date | null;
    };
  }

  interface User {
    id: string;
    email: string;
    nome: string;
    role: UserRole;
    status: string;
    vencimento?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    nome: string;
    role: UserRole;
    status: string;
    vencimento?: Date | null;
  }
}
