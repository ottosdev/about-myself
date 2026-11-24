"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { roles, formatPeriod, totalMonths, monthIndex, COMPANY } from "@/content/career";
import { useSectionProgress } from "@/lib/useSectionProgress";

const HERO_SHARE = 0.12;

const GitGraphScene = dynamic(() => import("./GitGraphScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-ink" />,
});

function activeIndex(p: number) {
  const f = Math.max(0, (p - HERO_SHARE) / (1 - HERO_SHARE)) * (totalMonths + 2);
  let idx = 0;
  roles.forEach((r, i) => {
    if (monthIndex(r.start) <= f + 0.5) idx = i;
  });
  return idx;
}

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const heroOpacity = Math.max(0, 1 - p / (HERO_SHARE * 0.6));
  const cardOpacity = Math.min(1, Math.max(0, (p - HERO_SHARE * 0.7) / (HERO_SHARE * 0.4)));
  const role = roles[activeIndex(p)];
  const step = activeIndex(p) + 1;

  return (
    <section
      ref={ref}
      id="trajetoria"
      aria-label="Trajetória profissional"
      style={{ height: `${(roles.length + 3) * 75}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <GitGraphScene sectionRef={ref} />
        </div>

        {/* Abertura */}
        <div
          className="pointer-events-none absolute inset-0 flex items-end bg-[linear-gradient(to_right,var(--ink)_0%,color-mix(in_srgb,var(--ink)_70%,transparent)_45%,transparent_75%)]"
          style={{ opacity: heroOpacity, visibility: heroOpacity === 0 ? "hidden" : "visible" }}
        >
          <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
            <h1 className="max-w-[14ch] font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-paper">
              Modernizo sistemas que não podem parar.
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg text-paper/80">
              Sou Otto Souza, desenvolvedor full stack. Há cinco anos trabalho com Angular, Java e Oracle em
              sistemas críticos, do Detran à Polícia Militar e, hoje, na Marinha. Uso IA com método para entender e
              evoluir código que tem décadas.
            </p>
            <p className="mt-10 flex items-center gap-3 text-sm text-fog">
              <span className="inline-block h-px w-10 bg-amber" />
              Role para percorrer a trajetória
            </p>
          </div>
        </div>

        {/* Ficha do trecho atual */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:flex sm:items-center"
          style={{ opacity: cardOpacity, visibility: cardOpacity === 0 ? "hidden" : "visible" }}
          aria-live="polite"
        >
          <article className="pointer-events-auto m-4 rounded-xl border border-line bg-ink/85 p-5 backdrop-blur-md sm:m-8 sm:w-[24rem] sm:p-6">
            <p className="font-mono text-xs text-fog">
              {String(step).padStart(2, "0")} de {String(roles.length).padStart(2, "0")}, {formatPeriod(role)}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-paper">{role.client}</h2>
            <p className="mt-1 text-sm text-fog">via {COMPANY}</p>
            <p className="mt-4 text-[0.95rem] text-paper/90">{role.summary}</p>
            <ul className="mt-3 hidden space-y-1.5 text-sm text-paper/70 sm:block">
              {role.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-[0.6em] inline-block h-1 w-1 shrink-0 rounded-full bg-amber" />
                  {pt}
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {role.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-fog">
                  {s}
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Barra de progresso */}
        <div className="absolute inset-x-0 top-14 h-px bg-line/50" aria-hidden="true">
          <div
            className="h-px bg-gradient-to-r from-amber to-tide"
            style={{ width: `${Math.max(0, (p - HERO_SHARE) / (1 - HERO_SHARE)) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
