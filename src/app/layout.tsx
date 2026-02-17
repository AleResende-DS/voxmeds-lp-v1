import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://medwiser.app"),
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "facebook-domain-verification": "mavip3dguzlkh70zkucq8bv2motyz9",
  },
  openGraph: {
    title: "VoxMeds — Seu consultório inteiro em uma única plataforma",
    description:
      "Prontuário, agenda, transcrição com IA e relatórios integrados para você focar no paciente.",
    url: "https://medwiser.app",
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
        <Script id="gtm-base" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WP9X4SLC');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WP9X4SLC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
