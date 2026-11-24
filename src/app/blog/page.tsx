import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Escritos",
  description: "Artigos do Otto Souza sobre sistemas legados, setor público e IA aplicada ao desenvolvimento.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-8">
      <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none tracking-[-0.03em]">
        Escritos
      </h1>
      <p className="mt-4 max-w-[55ch] text-paper/70">
        Notas de campo sobre sistemas legados, setor público e como uso IA no dia a dia.
      </p>
      {posts.length === 0 ? (
        <p className="mt-16 text-fog">Nenhum artigo publicado ainda.</p>
      ) : (
        <ul className="mt-14 divide-y divide-line border-y border-line">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group block py-7">
                <p className="text-sm text-fog">
                  {formatDate(p.date)}, {p.readingMinutes} min de leitura
                  {p.draft && <span className="ml-2 text-amber">rascunho</span>}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-snug transition-colors group-hover:text-tide">
                  {p.title}
                </h2>
                <p className="mt-2 max-w-[60ch] text-paper/70">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
