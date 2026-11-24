import type { Metadata } from "next";
import { Resume } from "@/components/resume/Resume";

export const metadata: Metadata = {
  title: "Currículo",
  description: "Currículo do Otto Souza, desenvolvedor full stack em Angular, Java e Oracle.",
};

export default function CurriculoPage() {
  return (
    <main className="px-4 pt-28 pb-24 sm:px-8">
      <div className="mx-auto mb-8 flex max-w-[210mm] flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.2rem)] font-semibold leading-none tracking-[-0.03em]">
            Currículo
          </h1>
          <p className="mt-3 text-paper/70">A versão em PDF tem também o telefone para contato.</p>
        </div>
        <a
          href="/otto-souza-curriculo.pdf"
          download
          className="rounded-full bg-amber px-5 py-2.5 font-medium text-ink transition-colors hover:bg-paper"
        >
          Baixar PDF
        </a>
      </div>
      <div className="overflow-hidden rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <Resume />
      </div>
    </main>
  );
}
