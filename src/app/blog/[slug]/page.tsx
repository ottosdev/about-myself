import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

export function generateStaticParams() {
  const slugs = getAllPosts().map((p) => ({ slug: p.slug }));
  // Com Cache Components a lista não pode ser vazia; enquanto só houver rascunhos, gera uma rota que dá 404.
  return slugs.length > 0 ? slugs : [{ slug: "sem-artigos" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.description };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-8">
      <Link href="/blog" className="text-sm text-fog hover:text-paper">
        Todos os escritos
      </Link>
      <p className="mt-10 text-sm text-fog">
        {formatDate(post.meta.date)}, {post.meta.readingMinutes} min de leitura
        {post.meta.draft && <span className="ml-2 text-amber">rascunho</span>}
      </p>
      <h1 className="mt-3 max-w-[22ch] font-display text-[clamp(2.1rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
        {post.meta.title}
      </h1>
      <p className="mt-5 max-w-[60ch] text-lg text-paper/70">{post.meta.description}</p>
      <article className="prose-otto mt-12">
        <MDXRemote source={post.content} />
      </article>
    </main>
  );
}
