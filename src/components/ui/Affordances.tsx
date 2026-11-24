import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

/** Círculo com seta: reage ao hover do elemento pai que tem a classe `group`. */
export function ArrowCircle({ external = false, size = "md" }: { external?: boolean; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  return (
    <span
      aria-hidden="true"
      className={`inline-flex ${box} shrink-0 items-center justify-center overflow-hidden rounded-full border border-line text-paper transition-[background-color,border-color,color] duration-300 group-hover:border-tide group-hover:bg-tide group-hover:text-ink group-focus-visible:border-tide group-focus-visible:bg-tide group-focus-visible:text-ink`}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          external
            ? "-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            : "group-hover:translate-x-1"
        }`}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

/** Linha de artigo: a linha inteira é o link, com rótulo e seta sempre visíveis. */
export function PostRow({ post }: { post: PostMeta }) {
  return (
    <li className="border-b border-line">
      <Link
        href={`/blog/${post.slug}`}
        className="group -mx-4 grid gap-3 rounded-xl px-4 py-7 transition-colors duration-300 hover:bg-hull/70 md:grid-cols-[11rem_1fr_auto] md:items-center md:gap-10"
      >
        <span className="text-sm text-fog">
          {formatDate(post.date)}
          <span className="block">{post.readingMinutes} min de leitura</span>
          {post.draft && (
            <span className="mt-2 inline-block rounded-full border border-amber/50 px-2 py-0.5 text-xs text-amber">
              rascunho
            </span>
          )}
        </span>
        <span>
          <span className="block font-display text-2xl font-semibold leading-snug transition-colors duration-300 group-hover:text-tide">
            {post.title}
          </span>
          <span className="mt-2 block max-w-[60ch] text-paper/70">{post.description}</span>
        </span>
        <span className="flex items-center gap-3 text-sm text-tide md:flex-col md:gap-2">
          <ArrowCircle />
          <span className="md:text-xs md:text-fog md:transition-colors md:group-hover:text-tide">Ler artigo</span>
        </span>
      </Link>
    </li>
  );
}
