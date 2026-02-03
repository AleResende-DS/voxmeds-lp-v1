import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.voxmeds.com"),
  title: "VoxMeds — Assistente Médico com IA",
  description:
    "Transcrição clínica, prontuário, agenda e relatórios com IA para médicos e clínicas. Mais tempo com pacientes, menos tempo digitando.",
  keywords: [
    "VoxMeds",
    "prontuário eletrônico",
    "transcrição médica",
    "IA para médicos",
    "agenda médica",
    "relatórios clínicos",
  ],
  openGraph: {
    title: "VoxMeds — Seu consultório inteiro em uma única plataforma",
    description:
      "Prontuário, agenda, transcrição com IA e relatórios integrados para você focar no paciente.",
    url: "https://www.voxmeds.com",
    siteName: "VoxMeds",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/landing/mockups/hero-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Dashboard VoxMeds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoxMeds — Assistente Médico com IA",
    description:
      "Prontuário, agenda, transcrição com IA e relatórios integrados para médicos e clínicas.",
    images: ["/landing/mockups/hero-screenshot.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
