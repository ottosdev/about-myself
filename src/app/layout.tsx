import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Otto Souza, desenvolvedor full stack",
    template: "%s | Otto Souza",
  },
  description:
    "Otto Souza moderniza sistemas críticos do setor público com Angular, Java e Oracle, usando IA com método: SDD, SDLC e agentes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${plex.variable} ${plexMono.variable} antialiased`}>
      <body className="min-h-screen">
        <SmoothScroll />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
