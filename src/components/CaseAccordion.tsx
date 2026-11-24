"use client";

import { useId, useState } from "react";
import type { cases as Cases } from "@/content/career";

type Case = (typeof Cases)[number];

export function CaseAccordion({ items }: { items: Case[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const base = useId();

  return (
    <div className="mt-14 border-t border-line">
      {items.map((c) => {
        const isOpen = open === c.id;
        const panelId = `${base}-${c.id}`;
        return (
          <div key={c.id} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : c.id)}
              className="group -mx-4 flex w-[calc(100%+2rem)] cursor-pointer items-center justify-between gap-6 rounded-xl px-4 py-7 text-left transition-colors duration-300 hover:bg-hull/70"
            >
              <span>
                <span
                  className={`block font-display text-[clamp(1.4rem,3vw,2.1rem)] font-semibold leading-tight transition-colors duration-300 group-hover:text-tide ${
                    isOpen ? "text-tide" : ""
                  }`}
                >
                  {c.title}
                </span>
                <span className="mt-1 block text-sm text-fog">{c.context}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="hidden text-sm text-fog transition-colors group-hover:text-tide sm:inline">
                  {isOpen ? "Fechar" : "Ver caso"}
                </span>
                <span
                  aria-hidden="true"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen
                      ? "rotate-45 border-tide bg-tide text-ink"
                      : "border-line text-paper group-hover:border-tide group-hover:text-tide"
                  }`}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-label={c.title}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="grid gap-6 pt-2 pb-10 md:grid-cols-3 md:gap-10">
                  {[
                    ["Problema", c.problem],
                    ["Decisão", c.decision],
                    ["Resultado", c.outcome],
                  ].map(([label, text], i) => (
                    <div
                      key={label}
                      className={`border-l border-line pl-4 transition-[opacity,transform] duration-500 ease-out ${
                        isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                      }`}
                      style={{ transitionDelay: isOpen ? `${120 + i * 80}ms` : "0ms" }}
                    >
                      <h3 className="text-sm text-amber">{label}</h3>
                      <p className="mt-2 text-[0.97rem] text-paper/80">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
