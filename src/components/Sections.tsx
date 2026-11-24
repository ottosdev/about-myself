import Link from "next/link";
import { cases, lab, contact, roles } from "@/content/career";
import { getAllPosts } from "@/lib/posts";
import { CaseAccordion } from "@/components/CaseAccordion";
import { ArrowCircle, PostRow } from "@/components/ui/Affordances";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const h2 = "font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]";

export function About() {
  const clients = roles.filter((r) => r.sector !== "interno").length;
  return (
    <section id="sobre" className={`${wrap} grid gap-10 py-28 md:grid-cols-[1fr_1.4fr] md:gap-16`}>
      <h2 className={`${h2} max-w-[12ch]`}>Chego em sistemas que não conheço e mudo sem quebrar</h2>
      <div className="max-w-[62ch] space-y-5 text-paper/80">
        <p>
          Comecei em 2021 migrando telas de Java 2 para Angular no Santander. Desde então passei por {clients}{" "}
          clientes pela Indra Minsait, quase todos do setor público: trânsito, segurança, planejamento, agro e
          defesa. Cada um com o seu legado, a sua regra e a sua pressa.
        </p>
        <p>
          Trabalho entre o front e o back, com Angular, Java e Oracle no dia a dia, e já passei por React, Vue,
          React Native, Spring, Quarkus, Laravel, PostgreSQL e SQL Server. Hoje faço tudo isso com agentes de IA ao
          lado, mas a responsabilidade pelo que vai para produção continua minha.
        </p>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-fog">Base</dt>
            <dd className="mt-1 text-paper">João Pessoa, PB</dd>
          </div>
          <div>
            <dt className="text-fog">Formação</dt>
            <dd className="mt-1 text-paper">Sistemas de Informação, FIP</dd>
          </div>
          <div>
            <dt className="text-fog">Hoje</dt>
            <dd className="mt-1 text-paper">Indra Minsait, na Marinha</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function Cases() {
  return (
    <section id="casos" className={`${wrap} py-28`}>
      <h2 className={h2}>Casos</h2>
      <p className="mt-4 max-w-[55ch] text-paper/70">
        Quatro trabalhos contados pelo problema, não pela tecnologia.
      </p>
      <CaseAccordion items={cases} />
    </section>
  );
}

export function Lab() {
  return (
    <section id="lab" className={`${wrap} py-20`}>
      <h2 className={h2}>Lab</h2>
      <p className="mt-4 max-w-[55ch] text-paper/70">Ferramentas pequenas que eu construo para trabalhar melhor.</p>
      <ul className={`mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line ${lab.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}>
        {lab.map((item) => {
          const body = (
            <>
              <h3 className="font-display text-xl font-semibold transition-colors duration-300 group-hover:text-tide">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[48ch] text-paper/75">{item.description}</p>
              <p className="mt-5 text-sm text-fog">{item.stack.join(", ")}</p>
            </>
          );
          return (
            <li key={item.title} className="bg-ink">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-hull/70"
                >
                  {body}
                  <span className="mt-6 flex items-center gap-3 text-sm text-tide">
                    <ArrowCircle external />
                    Ver o código no GitHub
                  </span>
                </a>
              ) : (
                <div className="p-7">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Writing() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <section id="escritos" className={`${wrap} py-28`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className={h2}>Escritos</h2>
        <Link href="/blog" className="group flex items-center gap-3 text-sm text-tide">
          Ver todos os escritos
          <ArrowCircle />
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="mt-10 text-fog">O primeiro artigo sai em breve.</p>
      ) : (
        <ul className="mt-12 border-t border-line">
          {posts.map((p) => (
            <PostRow key={p.slug} post={p} />
          ))}
        </ul>
      )}
    </section>
  );
}

export function Contact() {
  return (
    <section id="contato" className={`${wrap} pt-28 pb-16`}>
      <h2 className="max-w-[16ch] font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
        Tem um sistema que não pode parar?
      </h2>
      <p className="mt-6 max-w-[50ch] text-paper/75">
        Estou aberto a conversar sobre projetos, vagas e modernização de sistemas legados.
      </p>
      <div className="mt-10 flex flex-col gap-4 text-lg sm:flex-row sm:items-center sm:gap-10">
        <a
          href={`mailto:${contact.email}`}
          className="font-display text-[clamp(1.3rem,3vw,1.9rem)] font-semibold text-amber underline decoration-amber/40 underline-offset-[6px] hover:decoration-amber"
        >
          {contact.email}
        </a>
        <a href={contact.linkedin} className="text-paper/80 hover:text-tide" rel="noopener" target="_blank">
          LinkedIn
        </a>
        <a href="/curriculo" className="text-paper/80 hover:text-tide">
          Currículo
        </a>
        {contact.github && (
          <a href={contact.github} className="text-paper/80 hover:text-tide" rel="noopener" target="_blank">
            GitHub
          </a>
        )}
      </div>
      <footer className="mt-28 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-sm text-fog">
        <span>Otto Souza, 2026</span>
        <span>Feito em João Pessoa, com Next.js e Three.js</span>
      </footer>
    </section>
  );
}
