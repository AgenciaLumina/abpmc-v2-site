import { prisma } from "@/lib/prisma";
import SociosAdminGrid from "@/components/admin/SociosAdminGrid";

export const metadata = {
  title: "Gerenciar Sócios | Admin ABPMC",
  description: "Gerenciamento de sócios visíveis no site",
};

export default async function SociosAdminPage() {
  const socios = await prisma.associado.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      curriculoLattes: true,
      visivelNoSite: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      nome: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gerenciar Sócios</h1>
          <p className="text-gray-400 mt-1">
            Controle quais associados aparecem na página pública de sócios
          </p>
        </div>
      </div>

      <SociosAdminGrid socios={socios} />
    </div>
  );
}
