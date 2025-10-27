"use client";
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  console.error("GLOBAL ERROR:", error);
  return (
    <html><body>
      <div style={{padding:24,fontFamily:"system-ui"}}>
        <h1>Algo deu errado</h1>
        <pre style={{whiteSpace:"pre-wrap"}}>{String(error?.message || error)}</pre>
      </div>
    </body></html>
  );
}
export const dynamic = "force-dynamic";
