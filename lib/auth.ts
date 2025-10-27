import bcrypt from "bcryptjs";
import { Associado, UserRole } from "@prisma/client";
import { prisma } from "./prisma";

/**
 * Hash de senha com bcrypt (salt rounds = 12)
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verifica se a senha fornecida corresponde ao hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Busca associado por email
 */
export async function getAssociadoByEmail(email: string) {
  return prisma.associado.findUnique({
    where: { email },
    include: {
      plano: true,
    },
  });
}

/**
 * Busca associado por ID
 */
export async function getAssociadoById(id: number) {
  return prisma.associado.findUnique({
    where: { id },
    include: {
      plano: true,
      transacoes: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });
}

/**
 * Verifica se o associado tem permissão de acesso
 */
export function canAccess(userRole: UserRole, requiredRole: UserRole): boolean {
  const hierarchy = {
    ASSOCIADO: 1,
    ADMIN: 2,
    SUPERADMIN: 3,
  };

  return hierarchy[userRole] >= hierarchy[requiredRole];
}

/**
 * Verifica se a anuidade está vencida
 */
export function isAnuidadeVencida(associado: Associado): boolean {
  if (!associado.vencimento) return false;
  return new Date() > new Date(associado.vencimento);
}

/**
 * Verifica quantos dias faltam para o vencimento
 */
export function diasParaVencimento(vencimento: Date | null): number | null {
  if (!vencimento) return null;
  
  const hoje = new Date();
  const venc = new Date(vencimento);
  const diff = venc.getTime() - hoje.getTime();
  
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Gera token de reset de senha
 */
export function generateResetToken(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Atualiza o último login do associado
 */
export async function updateLastLogin(id: number) {
  return prisma.associado.update({
    where: { id },
    data: { ultimoLogin: new Date() },
  });
}
