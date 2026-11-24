"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** Progresso 0..1 de uma seção alta com conteúdo sticky (0 = topo alinhado, 1 = fim). */
export function readProgress(el: HTMLElement | null): number {
  if (!el) return 0;
  const r = el.getBoundingClientRect();
  const total = r.height - window.innerHeight;
  if (total <= 0) return 0;
  return Math.min(1, Math.max(0, -r.top / total));
}

/** Versão com estado React, atualizada por scroll (para overlays em HTML). */
export function useSectionProgress(ref: RefObject<HTMLElement | null>, steps = 1000) {
  const [p, setP] = useState(0);
  const last = useRef(-1);
  useEffect(() => {
    let id = 0;
    const tick = () => {
      const v = Math.round(readProgress(ref.current) * steps) / steps;
      if (v !== last.current) {
        last.current = v;
        setP(v);
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [ref, steps]);
  return p;
}
