"use client";

import { useRef } from "react";
import { useSectionProgress } from "@/lib/useSectionProgress";

const steps = [
  {
    title: "A documentação antiga vira Markdown",
    body: "Manuais e especificações em PDF passam por um conversor que escrevi em Python. Texto limpo é mais fácil para a IA ler e gasta menos tokens.",
  },
  {
    title: "O orquestrador recebe a tarefa",
    body: "Um agente coordenador entende o pedido, quebra em partes e decide quem faz o quê. Nenhum agente faz tudo sozinho.",
  },
  {
    title: "Cada agente tem um papel",
    body: "O analista entende a regra de negócio, o arquiteto desenha a solução, o desenvolvedor implementa, o QA testa e o revisor confere se tudo foi feito.",
  },
  {
    title: "Tudo termina em quatro arquivos",
    body: "Pendências do front, do back e da documentação; o plano que a IA vai executar; a especificação; e um validador que diz se o que foi feito segue a regra.",
  },
  {
    title: "Eu reviso e decido",
    body: "A IA propõe, eu confiro contra o sistema real. Em código de 30 anos, a documentação às vezes está errada, e é por isso que as pendências existem.",
  },
];

const AGENTS = ["Analista", "Arquiteto", "Dev", "QA", "Revisor"];
const ARTIFACTS = ["pendencias.md", "plano.md", "spec.md", "validador.md"];

function Box({
  x,
  y,
  w,
  h,
  label,
  on,
  tone = "tide",
  mono = true,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  on: boolean;
  tone?: "tide" | "amber";
  mono?: boolean;
}) {
  const color = tone === "amber" ? "var(--amber)" : "var(--tide)";
  return (
    <g style={{ transition: "opacity 400ms" }} opacity={on ? 1 : 0.35}>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={8}
        fill={on ? `color-mix(in srgb, ${color} 14%, var(--ink))` : "var(--ink)"}
        stroke={on ? color : "var(--line)"}
        strokeWidth={1.5}
        style={{ transition: "fill 400ms, stroke 400ms" }}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize={mono ? 12 : 14}
        fontFamily={mono ? "var(--font-plex-mono)" : "var(--font-bricolage)"}
        fontWeight={mono ? 400 : 600}
        fill={on ? "var(--paper)" : "var(--fog)"}
      >
        {label}
      </text>
    </g>
  );
}

function Wire({ d, on }: { d: string; on: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={on ? "var(--tide)" : "var(--line)"}
      strokeWidth={1.5}
      strokeDasharray={on ? "0" : "4 5"}
      style={{ transition: "stroke 400ms" }}
    />
  );
}

function Diagram({ s }: { s: number }) {
  const agentX = [52, 146, 220, 294, 388];
  const artX = [62, 168, 272, 378];
  return (
    <svg viewBox="0 0 440 560" className="h-auto max-h-[40svh] w-full md:max-h-[70svh]" role="img" aria-label="Fluxo de agentes de IA">
      {/* 1: PDF -> MD */}
      <Box x={105} y={40} w={150} h={44} label="manual.pdf" on={s >= 0} tone="amber" />
      <Wire d="M180 40 H262" on={s >= 0} />
      <text x={221} y={30} textAnchor="middle" fontSize={10} fill="var(--fog)" fontFamily="var(--font-plex-mono)">
        python
      </text>
      <Box x={335} y={40} w={150} h={44} label="manual.md" on={s >= 0} />

      {/* 2: orquestrador */}
      <Wire d="M335 62 V110 Q335 130 315 130 H220 V136" on={s >= 1} />
      <Box x={220} y={160} w={200} h={48} label="Orquestrador" on={s >= 1} mono={false} />

      {/* 3: agentes */}
      {agentX.map((x) => (
        <Wire key={x} d={`M220 184 V215 Q220 230 ${x > 220 ? 220 + Math.min(15, x - 220) : 220 - Math.min(15, 220 - x)} 230 H${x} V258`} on={s >= 2} />
      ))}
      {AGENTS.map((a, i) => (
        <Box key={a} x={agentX[i]} y={280} w={i === 0 || i === 4 ? 88 : 64} h={42} label={a} on={s >= 2} />
      ))}

      {/* 4: artefatos */}
      {agentX.map((x) => (
        <Wire key={`d${x}`} d={`M${x} 301 V335 H220 V350`} on={s >= 3} />
      ))}
      {artX.map((x) => (
        <Wire key={`a${x}`} d={`M220 350 V360 H${x} V382`} on={s >= 3} />
      ))}
      {ARTIFACTS.map((a, i) => (
        <g key={a}>
          <Box x={artX[i]} y={406} w={100} h={48} label={a} on={s >= 3} />
        </g>
      ))}

      {/* 5: revisão humana */}
      {artX.map((x) => (
        <Wire key={`h${x}`} d={`M${x} 430 V460 H220 V478`} on={s >= 4} />
      ))}
      <Box x={220} y={505} w={200} h={52} label="Revisão do Otto" on={s >= 4} tone="amber" mono={false} />
    </svg>
  );
}

export function Method() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const s = Math.min(steps.length - 1, Math.floor(p * steps.length));

  return (
    <section ref={ref} id="metodo" className="relative" style={{ height: `${steps.length * 70 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 pt-16 sm:px-8 md:grid-cols-[1fr_1.1fr] md:gap-12">
          <div>
            <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              Como uso IA num sistema de 30 anos
            </h2>
            <p className="mt-4 max-w-[52ch] text-paper/70">
              O fluxo que uso hoje para modernizar um legado da Marinha. A IA não escreve o sistema por mim: ela
              trabalha dentro de um processo.
            </p>
            <ol className="mt-8 space-y-4">
              {steps.map((st, i) => (
                <li
                  key={st.title}
                  className={`grid grid-cols-[2rem_1fr] transition-opacity duration-300 ${
                    i === s ? "opacity-100" : "hidden opacity-40 md:grid"
                  }`}
                >
                  <span className={`font-mono text-sm ${i === s ? "text-amber" : "text-fog"}`}>{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug">{st.title}</h3>
                    <p
                      className={`mt-1 max-w-[50ch] text-[0.95rem] text-paper/75 ${i === s ? "block" : "hidden"}`}
                    >
                      {st.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex items-center justify-center">
            <Diagram s={s} />
          </div>
        </div>
      </div>
    </section>
  );
}
