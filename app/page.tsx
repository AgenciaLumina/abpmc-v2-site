import { redirect } from "next/navigation";

export default function Page() {
  // Redirecionar para a home dentro do grupo (site)
  redirect("/home");
}
