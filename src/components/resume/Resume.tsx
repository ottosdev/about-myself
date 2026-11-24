import { roles, resume, contact, formatPeriod, COMPANY } from "@/content/career";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

/** Folha A4 do currículo. Fundo branco na tela e na impressão. */
export function Resume({ phone }: { phone?: string }) {
  const experience = [...roles].reverse();

  return (
    <article className="resume mx-auto w-full max-w-[210mm] bg-white text-[#0b1626] print:max-w-none">
      <div className="px-[8%] py-[7%] print:p-0">
        <header className="flex flex-col gap-5 border-b-2 border-[#0b1626] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-[2.6rem] font-semibold leading-none tracking-[-0.03em]">{resume.name}</h1>
            <p className="mt-2 text-[1.05rem] text-[#0f6f68]">{resume.title}</p>
          </div>
          <ul className="space-y-0.5 text-[0.8rem] leading-snug text-[#3b4658] sm:text-right">
            <li>{contact.email}</li>
            {phone && <li>{phone}</li>}
            <li>{resume.location}</li>
            <li>{host(contact.linkedin)}</li>
            {contact.github && <li>{host(contact.github)}</li>}
          </ul>
        </header>

        <div className="mt-7 grid gap-8 sm:grid-cols-[1fr_12.5rem] sm:gap-9">
          <div>
            <section>
              <h2 className="resume-h2">Perfil</h2>
              <p className="text-[0.86rem] leading-relaxed text-[#26303f]">{resume.profile}</p>
            </section>

            <section className="mt-7">
              <h2 className="resume-h2">Experiência</h2>
              <p className="text-[0.86rem] font-semibold">
                {COMPANY}, consultoria <span className="font-normal text-[#5b6677]">· jun 2021 – hoje</span>
              </p>
              <p className="mt-0.5 text-[0.78rem] text-[#5b6677]">
                Alocado em clientes públicos e privados, sempre em sistemas em produção.
              </p>
              <ol className="mt-4 space-y-4">
                {experience.map((r) => (
                  <li key={r.id} className="break-inside-avoid border-l-2 border-[#e3e7ee] pl-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="text-[0.92rem] font-semibold">{r.client}</h3>
                      <span className="text-[0.74rem] text-[#5b6677]">{formatPeriod(r)}</span>
                    </div>
                    <p className="mt-0.5 text-[0.74rem] text-[#0f6f68]">{r.stack.join(", ")}</p>
                    <ul className="mt-1.5 space-y-0.5 text-[0.8rem] leading-snug text-[#26303f]">
                      {r.points.map((pt) => (
                        <li key={pt} className="flex gap-2">
                          <span className="mt-[0.55em] h-[3px] w-[3px] shrink-0 rounded-full bg-[#c98a1e]" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="space-y-7">
            <section>
              <h2 className="resume-h2">Competências</h2>
              <dl className="space-y-3">
                {resume.skills.map((s) => (
                  <div key={s.group}>
                    <dt className="text-[0.76rem] font-semibold">{s.group}</dt>
                    <dd className="text-[0.76rem] leading-snug text-[#3b4658]">{s.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 className="resume-h2">Formação</h2>
              <p className="text-[0.8rem] font-semibold leading-snug">{resume.education.course}</p>
              <p className="text-[0.76rem] text-[#3b4658]">
                {resume.education.school}, {resume.education.year}
              </p>
            </section>

            <section>
              <h2 className="resume-h2">Estudo contínuo</h2>
              <ul className="space-y-2">
                {resume.study.map((s) => (
                  <li key={s.title} className="text-[0.76rem] leading-snug">
                    <span className="font-semibold">{s.title}</span>
                    <span className="text-[#5b6677]"> ({s.year})</span>
                    <br />
                    <span className="text-[#3b4658]">{s.detail}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="resume-h2">Idiomas</h2>
              <ul className="space-y-0.5 text-[0.76rem]">
                {resume.languages.map((l) => (
                  <li key={l.name}>
                    <span className="font-semibold">{l.name}</span>
                    <span className="text-[#3b4658]">, {l.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </article>
  );
}
