import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
} from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsBootstrap } from "@/components/analytics/AnalyticsBootstrap";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
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

// Geist — used ONLY inside the product mockup (HeroLoop, ConsultationStory)
// to match the real MedWiser app font exactly.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://medwiser.app"),
  title: "Prontuário com Transcrição por IA | MedWiser — Plataforma Agêntica para Médicos",
  description:
    "A primeira plataforma médica Agêntica do Brasil. Transcrição clínica, prontuário automático e copiloto de IA em cada consulta. Teste grátis por 7 dias.",
  keywords: [
    "MedWiser",
    "prontuário eletrônico com IA",
    "transcrição médica",
    "IA para médicos",
    "sistema médico com IA",
    "software para médicos",
    "plataforma médica agêntica",
    "documentação clínica automática",
  ],
  alternates: {
    canonical: "https://medwiser.app",
    languages: {
      "pt-BR": "https://medwiser.app",
      "x-default": "https://medwiser.app",
    },
  },
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
    title: "Prontuário com Transcrição por IA | MedWiser — Plataforma Agêntica para Médicos",
    description:
      "Você estudou medicina, não digitação. A MedWiser transcreve, documenta e analisa enquanto você atende seu paciente.",
    url: "https://medwiser.app",
    siteName: "MedWiser",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/landing/mockups/hero-screenshot.png",
        width: 1200,
        height: 630,
        alt: "MedWiser — Plataforma médica com IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prontuário com Transcrição por IA | MedWiser — Plataforma Agêntica para Médicos",
    description:
      "Transcrição clínica, prontuário automático e copiloto de IA em cada consulta.",
    images: ["/landing/mockups/hero-screenshot.png"],
  },
};

const organizationLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MedWiser",
  url: "https://medwiser.app",
  logo: "https://medwiser.app/logo-light.svg",
  sameAs: ["https://instagram.com/medwiser.app"],
});

const softwareLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MedWiser",
  description:
    "Primeira plataforma médica Agêntica do Brasil. Transcrição clínica, prontuário automático e copiloto de IA em cada consulta.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web, iOS, Android",
  url: "https://medwiser.app",
  offers: {
    "@type": "Offer",
    price: "199",
    priceCurrency: "BRL",
    url: "https://app.medwiser.app/register",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "20",
    bestRating: "5",
    worstRating: "1",
  },
});

const faqLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que preciso para usar a MedWiser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apenas um computador, tablet ou celular com internet e microfone. A MedWiser roda no navegador e também tem apps nativos para iOS e Android.",
      },
    },
    {
      "@type": "Question",
      name: "Como funciona o teste grátis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Você ganha 7 dias grátis para testar tudo, sem compromisso. Depois, escolha entre o plano mensal ou anual.",
      },
    },
    {
      "@type": "Question",
      name: "A MedWiser substitui meu prontuário atual?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. A MedWiser é um prontuário eletrônico completo que armazena todas as consultas, documentos e histórico dos seus pacientes em um só lugar.",
      },
    },
    {
      "@type": "Question",
      name: "A IA vai prescrever por mim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. A IA documenta, organiza e analisa — mas toda decisão clínica, prescrição e diagnóstico continuam sendo 100% do médico. Você tem controle total sobre tudo que é salvo no prontuário.",
      },
    },
    {
      "@type": "Question",
      name: "O que são os alertas automáticos da IA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Quando você faz upload de um exame ou gera um documento, a IA analisa e sinaliza achados que podem ser clinicamente relevantes. Funciona como uma segunda leitura — você decide o que fazer com cada alerta.",
      },
    },
    {
      "@type": "Question",
      name: "Posso conversar com a IA durante a consulta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Cada consulta tem um chat com uma IA que conhece o histórico completo do paciente. Você pode tirar dúvidas, validar decisões ou consultar referências em segundos — antes, durante ou depois do atendimento.",
      },
    },
    {
      "@type": "Question",
      name: "Posso cancelar a qualquer momento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Você cancela com 1 clique pelo próprio painel, sem burocracia e sem precisar entrar em contato com ninguém.",
      },
    },
    {
      "@type": "Question",
      name: "A cobrança anual é feita de uma vez?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. No plano anual, o valor total de R$ 2.388 é cobrado uma única vez no início, equivalendo a R$ 199 por mês. No plano mensal, a cobrança é de R$ 229 por mês.",
      },
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${geist.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="ld-organization" type="application/ld+json" strategy="beforeInteractive">
          {organizationLd}
        </Script>
        <Script id="ld-software" type="application/ld+json" strategy="beforeInteractive">
          {softwareLd}
        </Script>
        <Script id="ld-faq" type="application/ld+json" strategy="beforeInteractive">
          {faqLd}
        </Script>
        <Script
          id="consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied',
  ad_personalization: 'denied', analytics_storage: 'denied',
  functionality_storage: 'granted', security_storage: 'granted',
  personalization_storage: 'denied',
  wait_for_update: 500
});
var match = document.cookie.match(/(?:^|;\s*)mw_consent=([^;]+)/);
if (match) {
  try {
    var s = JSON.parse(decodeURIComponent(match[1]));
    gtag('consent', 'update', {
      ad_storage:              s.marketing === 'granted' ? 'granted' : 'denied',
      ad_user_data:            s.marketing === 'granted' ? 'granted' : 'denied',
      ad_personalization:      s.marketing === 'granted' ? 'granted' : 'denied',
      analytics_storage:       s.analytics === 'granted' ? 'granted' : 'denied',
      functionality_storage:   'granted',
      security_storage:        'granted',
      personalization_storage: s.analytics === 'granted' ? 'granted' : 'denied',
    });
  } catch (e) {}
}`,
          }}
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WP9X4SLC');`,
          }}
        />
        <noscript>
          <iframe
            title="Google Tag Manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-WP9X4SLC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AnalyticsBootstrap />
          <ScrollDepthTracker />
          <ConsentBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
