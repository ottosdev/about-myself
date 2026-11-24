import Link from "next/link";

const links = [
  { href: "/#trajetoria", label: "Trajetória" },
  { href: "/#metodo", label: "Método" },
  { href: "/#casos", label: "Casos" },
  { href: "/blog", label: "Escritos" },
  { href: "/curriculo", label: "Currículo" },
  { href: "/#contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 print:hidden border-b border-line/60 bg-ink/70 backdrop-blur-md"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-paper">
          Otto Souza
        </Link>
        <ul className="hidden items-center gap-6 text-sm text-fog md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-paper">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/#contato" className="text-sm text-tide hover:text-paper md:hidden">
          Contato
        </Link>
      </nav>
    </header>
  );
}
