"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function NavLogger(){
  const p = usePathname(); const q = useSearchParams();
  useEffect(()=>{ console.log("[NAV]", p+"?"+q.toString()); },[p,q]);
  return null;
}
