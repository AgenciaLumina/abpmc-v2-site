export default function BloqueadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout vazio para página de bloqueado - não aplica o layout pai
  return <>{children}</>;
}
