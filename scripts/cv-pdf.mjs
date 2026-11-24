// Gera public/otto-souza-curriculo.pdf a partir de /curriculo/impressao.
// Uso: com o site rodando (npm run dev ou npm start), rode `npm run cv:pdf`.
import { execFileSync } from "node:child_process";
import path from "node:path";

const base = process.env.SITE_URL ?? "http://localhost:3000";
const chrome =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const out = path.resolve("public/otto-souza-curriculo.pdf");

execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=5000",
  `--print-to-pdf=${out}`,
  `${base}/curriculo/impressao`,
], { stdio: "inherit" });

console.log(`PDF gerado em ${out}`);
