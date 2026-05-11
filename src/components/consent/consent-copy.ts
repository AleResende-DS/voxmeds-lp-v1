export const CONSENT_COPY = {
  banner: {
    title: 'Usamos cookies para melhorar sua experiência',
    body: 'Coletamos dados de navegação para entender como você usa o Medwiser e personalizar campanhas. Você pode aceitar todos ou personalizar suas preferências.',
    customize: 'Personalizar',
    acceptAll: 'Aceitar todos',
    privacyPolicyText: 'Veja nossa',
    privacyPolicyLinkText: 'Política de Privacidade',
    privacyPolicyHref: '/privacy',
  },
  dialog: {
    title: 'Preferências de cookies',
    necessary: {
      title: 'Cookies essenciais',
      description: 'Necessários para sessão, login, preferências. Não podem ser desativados.',
    },
    analytics: {
      title: 'Cookies de análise',
      description: 'Nos ajudam a entender como você usa o Medwiser para melhorar o produto.',
    },
    marketing: {
      title: 'Cookies de marketing',
      description: 'Permitem mensurar campanhas e mostrar anúncios mais relevantes.',
    },
    rejectAll: 'Recusar todos',
    save: 'Salvar preferências',
  },
  footer: {
    manage: 'Gerenciar cookies',
  },
} as const;
