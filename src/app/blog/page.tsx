import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostRow } from "@/components/ui/Affordances";

export const metadata: Metadata = {
  title: "Escritos",
  description: "Artigos do Otto Souza sobre sistemas legados, setor público e IA aplicada ao desenvolvimento.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-4xl px-5 pt-32 pb-24 sm:px-8">
      <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none tracking-[-0.03em]">
        Escritos
      </h1>
      <p className="mt-4 max-w-[55ch] text-paper/70">
        Notas de campo sobre sistemas legados, setor público e como uso IA no dia a dia.
      </p>
      {posts.length === 0 ? (
        <p className="mt-16 text-fog">Nenhum artigo publicado ainda.</p>
      ) : (
        <ul className="mt-14 border-t border-line">
          {posts.map((p) => (
            <PostRow key={p.slug} post={p} />
          ))}
        </ul>
      )}
    </main>
  );
}
