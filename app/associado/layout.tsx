import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import AssociadoSidebar from "@/components/associado/AssociadoSidebar";
import AssociadoHeader from "@/components/associado/AssociadoHeader";

export default async function AssociadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Se não está autenticado, redireciona para login
  if (!session) {
    redirect("/auth/associado");
  }

  // Verifica se o associado está bloqueado
  if (session.user.status === "BLOQUEADO") {
    redirect("/associado/bloqueado");
  }

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <AssociadoHeader session={session} />
      
      <div className="flex">
        <AssociadoSidebar session={session} />
        
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
