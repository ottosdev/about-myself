// Fonte única da trajetória do Otto. Alimenta o grafo 3D, os casos e (depois) o currículo.
// Regra: nunca nomear projetos da Marinha — descrever de forma genérica.

export type Sector =
  | "financeiro"
  | "interno"
  | "trânsito"
  | "tecnologia pública"
  | "segurança pública"
  | "planejamento"
  | "agro"
  | "defesa";

export type Role = {
  id: string;
  client: string;
  sector: Sector;
  start: string; // "AAAA-MM"
  end: string | null; // null = atual
  stack: string[];
  summary: string;
  points: string[];
};

export const COMPANY = "Indra Minsait";
export const CAREER_START = "2021-06";

export const roles: Role[] = [
  {
    id: "santander",
    client: "Santander",
    sector: "financeiro",
    start: "2021-06",
    end: "2022-02",
    stack: ["Angular 8", "Git", "Kanban"],
    summary: "Migração de telas legadas em Java 2 para Angular 8 no setor financeiro.",
    points: [
      "Reescrita de fluxos antigos numa arquitetura nova em Angular.",
      "Funcionalidades e correções no front-end do financeiro.",
    ],
  },
  {
    id: "indra-interno",
    client: "Projetos internos Indra",
    sector: "interno",
    start: "2022-03",
    end: "2022-05",
    stack: ["Vue.js", "Angular", "Spring Boot", "XLSX", "PDF"],
    summary: "Ferramentas internas de processos, relatórios e controle de horas.",
    points: ["Relatórios em XLSX e PDF.", "Novas interfaces em Vue.js e integrações no controle de horas."],
  },
  {
    id: "detran-df",
    client: "Detran-DF",
    sector: "trânsito",
    start: "2022-05",
    end: "2023-12",
    stack: ["Java 6", "Oracle", "XML"],
    summary: "Setor de multas: processamento de autuações e penalidades num sistema crítico em Java 6.",
    points: [
      "Sustentação de funcionalidades críticas de penalidades e autuações.",
      "Manutenção dos endpoints XML que processam multas automaticamente.",
      "Novas funcionalidades de ponta a ponta.",
    ],
  },
  {
    id: "celepar",
    client: "Celepar (PR)",
    sector: "tecnologia pública",
    start: "2023-11",
    end: "2023-12",
    stack: ["Vue.js", "Quarkus", "Spring Boot"],
    summary: "Manutenção e melhorias em sistemas da companhia de tecnologia do Paraná.",
    points: ["Correções e melhorias com Vue.js no front e Quarkus/Spring Boot no back."],
  },
  {
    id: "bombeiros-al",
    client: "Bombeiros de Alagoas",
    sector: "segurança pública",
    start: "2023-12",
    end: "2024-04",
    stack: ["React", "React Query", "Laravel", "PostgreSQL"],
    summary: "Front-end do credenciamento dos Bombeiros, com arrecadação e gestão de serviços.",
    points: ["Interfaces responsivas em React.", "Estado com Context API e React Query."],
  },
  {
    id: "seplan-rn",
    client: "SEPLAN-RN",
    sector: "planejamento",
    start: "2024-05",
    end: "2024-09",
    stack: ["Angular 13", "Spring Boot", "Oracle", "PostgreSQL", "Docker", "SonarQube", "Grafana"],
    summary: "Sistemas da Secretaria de Planejamento do RN, do relatório ao pipeline de deploy.",
    points: [
      "Relatórios PDF/Excel e envio automático de e-mails.",
      "Pipelines Docker para desenvolvimento e homologação.",
      "SonarQube para análise estática; Grafana e Prometheus para observabilidade.",
    ],
  },
  {
    id: "pm-sp",
    client: "Polícia Militar de SP",
    sector: "segurança pública",
    start: "2024-10",
    end: "2025-08",
    stack: ["Angular 16", "Java 17", "SQL Server"],
    summary: "Sistema de seleção de candidatos da PM, levado até a homologação e a entrega.",
    points: [
      "Fluxo do candidato: inscrição, histórico de vida, etapas de avaliação e acompanhamento de status.",
      "Cadastro de editais e estruturas (regionais e batalhões) e relatórios.",
      "Front-end do credenciamento de oficiais de outros estados.",
      "Sustentação e correções após a entrega.",
    ],
  },
  {
    id: "emater-mt",
    client: "Emater-MT",
    sector: "agro",
    start: "2025-08",
    end: "2025-11",
    stack: ["React Native", "Spring Boot", "Oracle"],
    summary: "App offline-first para cadastrar produtores rurais direto no campo.",
    points: [
      "O técnico cadastra famílias, produção e cultivo sem internet.",
      "Ao voltar à base, o app sincroniza tudo com o servidor.",
      "Atuação full stack em correções e novas funcionalidades.",
    ],
  },
  {
    id: "marinha",
    client: "Marinha do Brasil",
    sector: "defesa",
    start: "2025-11",
    end: null,
    stack: ["Angular", "Java", "Oracle", "GitHub Copilot"],
    summary: "Modernização de um sistema legado de cerca de 30 anos, com documentação defasada.",
    points: [
      "Fluxo multiagente baseado em SDD: orquestrador, analista, arquiteto, desenvolvedor, QA e revisor.",
      "Cada ciclo gera pendências, plano, especificação e validador de conformidade.",
      "Passagem por outros sistemas da Marinha, incluindo legado em JSP/JSF.",
    ],
  },
];

export function monthIndex(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  const [y0, m0] = CAREER_START.split("-").map(Number);
  return (y - y0) * 12 + (m - m0);
}

export function nowYM(): string {
  return "2026-11";
}

export function formatPeriod(r: Role): string {
  const fmt = (ym: string) => {
    const [y, m] = ym.split("-").map(Number);
    const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    return `${meses[m - 1]} ${y}`;
  };
  return `${fmt(r.start)} – ${r.end ? fmt(r.end) : "hoje"}`;
}

export const totalMonths = monthIndex(nowYM());

export const cases = [
  {
    id: "marinha",
    title: "Um sistema de 30 anos, lido por agentes",
    context: "Marinha do Brasil, 2025 – hoje",
    problem:
      "Modernizar um sistema legado com décadas de regras de negócio acumuladas e uma documentação que já não descreve o que o código faz.",
    decision:
      "Em vez de pedir código à IA, montei um fluxo de agentes com papéis separados — analista, arquiteto, desenvolvedor, QA e revisor — coordenados por um orquestrador e guiados por especificação (SDD).",
    outcome:
      "Cada integração termina com quatro arquivos: o que falta no front e no back, o plano que a IA vai executar, a especificação e um validador que confere se o que foi feito segue a regra.",
  },
  {
    id: "detran",
    title: "Multas que não podem errar",
    context: "Detran-DF, 2022 – 2023",
    problem:
      "Penalidades e autuações processadas automaticamente por endpoints XML, sobre uma base Java 6 e Oracle, em que um erro vira cobrança indevida para o cidadão.",
    decision:
      "Atuei de ponta a ponta no setor de multas: sustentação do que já rodava e novas funcionalidades sem quebrar o processamento automático.",
    outcome: "Um ano e meio mantendo uma peça crítica do Detran funcionando enquanto ela evoluía.",
  },
  {
    id: "pmsp",
    title: "Do edital ao resultado do candidato",
    context: "Polícia Militar de SP, 2024 – 2025",
    problem:
      "Candidatos aprovados no concurso precisam informar todo o histórico de vida e passar por várias etapas de avaliação — e saber, a cada passo, em que pé está a candidatura.",
    decision:
      "Construí o sistema em Angular 16 e Java 17: editais, estruturas de regionais e batalhões, relatórios e o credenciamento de oficiais de outros estados.",
    outcome: "O sistema foi homologado e entregue; segui na sustentação até a minha saída.",
  },
  {
    id: "emater",
    title: "Cadastro rural sem sinal",
    context: "Emater-MT, 2025",
    problem:
      "Técnicos vão à zona rural cadastrar famílias, o que produzem e o que plantam — em lugares onde não há internet.",
    decision:
      "App em React Native offline-first: tudo é salvo no aparelho e sincronizado com o servidor Spring Boot e Oracle quando o técnico volta à base.",
    outcome: "Atuei como full stack corrigindo e adicionando funcionalidades nos dois lados da sincronização.",
  },
];

export const lab = [
  {
    title: "Este site",
    description:
      "Construído com IA e método: Next.js, React Three Fiber e conteúdo em MDX. O processo vai virar um artigo.",
    stack: ["Next.js", "Three.js", "MDX"],
    href: "https://github.com/ottosdev/about-myself" as string | null,
  },
];

export const contact = {
  email: "ottosouza.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/otto-neto",
  github: "https://github.com/ottosdev" as string | null,
};

// Dados exclusivos do currículo. O telefone NÃO fica aqui: vem de CV_PHONE no .env.local
export const resume = {
  name: "Otto Souza",
  title: "Desenvolvedor Full Stack",
  location: "João Pessoa, PB",
  profile:
    "Desenvolvedor full stack com mais de 5 anos em sistemas críticos dos setores público e financeiro, como Santander, Detran-DF, Polícia Militar de SP e Marinha do Brasil. Trabalho principalmente com Angular, Java e Oracle, com foco em modernização de sistemas legados. Uso IA de forma estruturada, com SDD, SDLC e fluxos multiagente, para entender, documentar e evoluir sistemas com décadas de história.",
  skills: [
    { group: "Front-end", items: ["Angular", "React", "Vue.js", "React Native", "TypeScript"] },
    { group: "Back-end", items: ["Java", "Spring Boot", "Quarkus", "Hibernate/JPA", "Laravel"] },
    { group: "Dados", items: ["Oracle", "PostgreSQL", "SQL Server"] },
    { group: "Qualidade e entrega", items: ["Docker", "SonarQube", "Grafana", "Prometheus", "Git", "Jira"] },
    { group: "IA aplicada", items: ["GitHub Copilot", "Agentes e orquestração", "SDD", "SDLC", "Python"] },
  ],
  education: { course: "Bacharelado em Sistemas de Informação", school: "Faculdades Integradas de Patos", year: "2017" },
  study: [
    { year: "hoje", title: "IA aplicada ao desenvolvimento", detail: "Cursos na Udemy e prática diária em projetos reais." },
    { year: "2022", title: "React", detail: "Origamid" },
    { year: "2021", title: "Ignite / GoStack", detail: "React, Node.js, React Native, TypeScript e Docker" },
  ],
  languages: [{ name: "Português", level: "nativo" }, { name: "Inglês", level: "intermediário" }],
};
