import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Se não está autenticado, redireciona para login
  if (!session) {
    redirect("/auth/admin");
  }

  // Se não é ADMIN ou SUPERADMIN, redireciona
  if (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN") {
    redirect("/associado/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminHeader session={session} />
      
      <div className="flex">
        <AdminSidebar session={session} />
        
        <main className="flex-1 ml-64 pt-16 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
