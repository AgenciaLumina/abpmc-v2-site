import "./../styles/globals.css";
import NavLogger from "@/components/dev/NavLogger";
import { outfit } from '@/lib/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="antialiased bg-[#fefefe] text-[#222]">
        {children}
        <NavLogger />
      </body>
    </html>
  );
}
