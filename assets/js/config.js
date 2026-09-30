/* ORLANDO — configuração de atendimento e medição (um único arquivo para as duas páginas).

   ga4MeasurementId: ID do fluxo web do GA4 (formato G-XXXXXXXXXX). O script do Google só
     carrega depois que a pessoa aceita a medição no aviso de consentimento.
   whatsapp / email: canais de contato exibidos nas páginas.
   formEndpoint / formExtraFields: integração Web3Forms preservada para uso futuro. O formulário
     NÃO está publicado nas páginas desde 30/09/2026: o envio não pôde ser validado com um teste
     real, então o WhatsApp é o canal principal. Para reativar, ver README.md → "Formulário". */
window.ORLANDO_CONFIG = {
  ga4MeasurementId: "G-V61XWGTJTS", /* propriedade "ORLANDO Marketing & Branding — Site" (conta Orlando Design), fluxo "Site ORLANDO (web)" */
  whatsapp: "5551984763778",
  email: "contato@orlandomarketingbranding.com.br",
  formEndpoint: "https://api.web3forms.com/submit",
  formExtraFields: { access_key: "" },
  debugEvents: false
};
