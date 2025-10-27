import nodemailer from "nodemailer";
import { Associado } from "@prisma/client";

// Configuração do transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "mail.abpmc.com.br",
  port: parseInt(process.env.MAIL_PORT || "465"),
  secure: true, // SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Envia email de boas-vindas ao novo associado
 */
export async function sendWelcomeEmail(associado: Associado, senhaTemporaria: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Outfit', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0B2E47 0%, #2b4e6d 100%); color: white; padding: 30px; text-align: center; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
        .button { display: inline-block; background: #22949e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .credentials { background: #f7f7f7; padding: 15px; border-left: 4px solid #22949e; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bem-vindo à ABPMC!</h1>
        </div>
        <div class="content">
          <p>Olá <strong>${associado.nome}</strong>,</p>
          
          <p>É com grande satisfação que damos as boas-vindas à <strong>Associação Brasileira de Psicologia e Medicina Comportamental</strong>!</p>
          
          <p>Sua conta foi criada com sucesso. Abaixo estão suas credenciais de acesso:</p>
          
          <div class="credentials">
            <p><strong>Email:</strong> ${associado.email}</p>
            <p><strong>Senha temporária:</strong> ${senhaTemporaria}</p>
          </div>
          
          <p><strong>⚠️ Importante:</strong> Por segurança, recomendamos que você altere sua senha no primeiro acesso.</p>
          
          <p style="text-align: center;">
            <a href="${process.env.APP_URL}/associado/login" class="button">Acessar Área do Associado</a>
          </p>
          
          <p>Se tiver alguma dúvida, entre em contato conosco através do email <a href="mailto:contato@abpmc.org.br">contato@abpmc.org.br</a>.</p>
          
          <p>Atenciosamente,<br><strong>Equipe ABPMC</strong></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} ABPMC - Associação Brasileira de Psicologia e Medicina Comportamental</p>
          <p>Este é um email automático, por favor não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM || '"ABPMC" <no-reply@abpmc.com.br>',
    to: associado.email,
    subject: "Bem-vindo à ABPMC - Suas credenciais de acesso",
    html,
  });
}

/**
 * Envia email de confirmação de pagamento
 */
export async function sendPaymentConfirmationEmail(
  associado: Associado,
  valor: number,
  novoVencimento: Date
) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Outfit', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0B2E47 0%, #2b4e6d 100%); color: white; padding: 30px; text-align: center; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
        .success-box { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .info-box { background: #f7f7f7; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Pagamento Confirmado</h1>
        </div>
        <div class="content">
          <p>Olá <strong>${associado.nome}</strong>,</p>
          
          <div class="success-box">
            <p><strong>✓ Seu pagamento foi confirmado com sucesso!</strong></p>
          </div>
          
          <div class="info-box">
            <p><strong>Valor pago:</strong> R$ ${valor.toFixed(2)}</p>
            <p><strong>Nova data de vencimento:</strong> ${new Date(novoVencimento).toLocaleDateString('pt-BR')}</p>
          </div>
          
          <p>Sua anuidade está ativa e você tem acesso completo a todos os benefícios da ABPMC.</p>
          
          <p>Você pode acessar sua área do associado a qualquer momento para:</p>
          <ul>
            <li>Visualizar o histórico de pagamentos</li>
            <li>Baixar documentos exclusivos</li>
            <li>Acessar conteúdos restritos</li>
            <li>Atualizar seus dados cadastrais</li>
          </ul>
          
          <p>Atenciosamente,<br><strong>Equipe ABPMC</strong></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} ABPMC - Associação Brasileira de Psicologia e Medicina Comportamental</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM || '"ABPMC" <no-reply@abpmc.com.br>',
    to: associado.email,
    subject: "Pagamento Confirmado - ABPMC",
    html,
  });
}

/**
 * Envia email de aviso de vencimento próximo
 */
export async function sendExpirationWarningEmail(
  associado: Associado,
  diasRestantes: number
) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Outfit', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0B2E47 0%, #2b4e6d 100%); color: white; padding: 30px; text-align: center; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
        .warning-box { background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .button { display: inline-block; background: #22949e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚠️ Anuidade próxima do vencimento</h1>
        </div>
        <div class="content">
          <p>Olá <strong>${associado.nome}</strong>,</p>
          
          <div class="warning-box">
            <p><strong>Sua anuidade vence em ${diasRestantes} dias!</strong></p>
            <p>Data de vencimento: <strong>${associado.vencimento ? new Date(associado.vencimento).toLocaleDateString('pt-BR') : 'N/A'}</strong></p>
          </div>
          
          <p>Para manter o acesso aos benefícios da ABPMC, renove sua anuidade antes do vencimento.</p>
          
          <p style="text-align: center;">
            <a href="${process.env.APP_URL}/associado/minha-anuidade" class="button">Renovar Anuidade</a>
          </p>
          
          <p><strong>Benefícios de manter sua anuidade em dia:</strong></p>
          <ul>
            <li>Acesso a conteúdos exclusivos</li>
            <li>Participação em eventos da ABPMC</li>
            <li>Downloads de materiais e documentos</li>
            <li>Networking com outros profissionais</li>
          </ul>
          
          <p>Se já efetuou o pagamento, desconsidere este email.</p>
          
          <p>Atenciosamente,<br><strong>Equipe ABPMC</strong></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} ABPMC - Associação Brasileira de Psicologia e Medicina Comportamental</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM || '"ABPMC" <no-reply@abpmc.com.br>',
    to: associado.email,
    subject: `Aviso: Sua anuidade vence em ${diasRestantes} dias`,
    html,
  });
}

/**
 * Envia email de reset de senha
 */
export async function sendPasswordResetEmail(
  associado: Associado,
  resetToken: string
) {
  const resetUrl = `${process.env.APP_URL}/associado/reset-senha?token=${resetToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Outfit', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0B2E47 0%, #2b4e6d 100%); color: white; padding: 30px; text-align: center; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
        .button { display: inline-block; background: #22949e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔑 Redefinição de Senha</h1>
        </div>
        <div class="content">
          <p>Olá <strong>${associado.nome}</strong>,</p>
          
          <p>Recebemos uma solicitação para redefinir a senha da sua conta na ABPMC.</p>
          
          <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Redefinir Senha</a>
          </p>
          
          <p>Ou copie e cole o link abaixo no seu navegador:</p>
          <p style="background: #f7f7f7; padding: 10px; word-break: break-all; font-size: 12px;">
            ${resetUrl}
          </p>
          
          <div class="warning">
            <p><strong>⚠️ Importante:</strong></p>
            <ul>
              <li>Este link é válido por 1 hora</li>
              <li>Se você não solicitou esta redefinição, ignore este email</li>
              <li>Nunca compartilhe este link com outras pessoas</li>
            </ul>
          </div>
          
          <p>Atenciosamente,<br><strong>Equipe ABPMC</strong></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} ABPMC - Associação Brasileira de Psicologia e Medicina Comportamental</p>
          <p>Este é um email automático, por favor não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM || '"ABPMC" <no-reply@abpmc.com.br>',
    to: associado.email,
    subject: "Redefinição de Senha - ABPMC",
    html,
  });
}

/**
 * Verifica se o servidor de email está configurado
 */
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("Erro na configuração de email:", error);
    return false;
  }
}
