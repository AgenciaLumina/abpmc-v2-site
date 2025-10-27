import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAssociadoByEmail, verifyPassword, updateLastLogin } from "./auth";
import { AssociadoStatus } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        // Busca o associado pelo email
        const associado = await getAssociadoByEmail(credentials.email);

        if (!associado) {
          throw new Error("Credenciais inválidas");
        }

        // Verifica se o associado está bloqueado
        if (associado.status === AssociadoStatus.BLOQUEADO) {
          throw new Error("Conta bloqueada. Entre em contato com o suporte.");
        }

        // Verifica a senha
        const isValidPassword = await verifyPassword(
          credentials.password,
          associado.senhaHash
        );

        if (!isValidPassword) {
          throw new Error("Credenciais inválidas");
        }

        // Atualiza o último login
        await updateLastLogin(associado.id);

        // Retorna os dados do usuário
        return {
          id: associado.id.toString(),
          email: associado.email,
          nome: associado.nome,
          role: associado.role,
          status: associado.status,
          vencimento: associado.vencimento,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.nome = user.nome;
        token.role = user.role;
        token.status = user.status;
        token.vencimento = user.vencimento;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          nome: token.nome,
          role: token.role,
          status: token.status,
          vencimento: token.vencimento,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/associado", // Nova rota fora da pasta protegida
    error: "/auth/associado",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
