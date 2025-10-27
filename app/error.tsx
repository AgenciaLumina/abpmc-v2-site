"use client";
export default function Error({ error }: { error: Error }) {
  console.error("ROUTE ERROR:", error);
  return <div style={{padding:24}}>Erro nesta página. Recarregue.</div>;
}
