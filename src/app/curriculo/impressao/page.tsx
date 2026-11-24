import type { Metadata } from "next";
import { Resume } from "@/components/resume/Resume";

// Rota usada só para gerar o PDF (npm run cv:pdf). Não é linkada nem indexada.
export const metadata: Metadata = {
  title: "Currículo (impressão)",
  robots: { index: false, follow: false },
};

export default function CurriculoImpressao() {
  return (
    <main className="resume-print bg-white">
      <Resume phone={process.env.CV_PHONE} />
    </main>
  );
}
