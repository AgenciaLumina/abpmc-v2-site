"use client";
import Link from "next/link";
import { tokens } from "@/lib/tokens";

type Props = { title: string; href: string; label?: string; newTab?: boolean; className?: string; };

function isExternal(url: string) {
  try { const u = new URL(url, "http://local"); return /^https?:\/\//.test(url) && u.hostname !== "local"; }
  catch { return /^https?:\/\//.test(url); }
}

export default function DownloadBox({ title, href, label = "Clique aqui para fazer o Download", newTab, className }: Props) {
  const external = isExternal(href);
  const target = (newTab ?? external) ? "_blank" : undefined;
  const rel = target ? "noopener noreferrer" : undefined;

  return (
    <section role="region" aria-label="Bloco de download" className={`panel-soft panel-soft-halo ${className ?? ""}`}>
      <div className="mx-auto max-w-container px-6 py-8 sm:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2
            className="m-0 text-[20px] leading-7 font-extrabold"
            style={{ fontFamily: "var(--font-outfit)", color: "#0B1220" }}
          >
            {title}
          </h2>

          <Link
            href={href}
            target={target}
            rel={rel}
            className="inline-flex items-center gap-2 rounded-pill text-white px-6 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: tokens.colors.download[500] }}
            onMouseEnter={(e) => ((e.currentTarget.style.backgroundColor = tokens.colors.download.hover))}
            onMouseLeave={(e) => ((e.currentTarget.style.backgroundColor = tokens.colors.download[500]))}
          >
            <span className="material-symbols-outlined" aria-hidden="true">picture_as_pdf</span>
            <span className="font-medium">{label}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
