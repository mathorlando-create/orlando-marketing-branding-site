// ORLANDO — fonte única de conteúdo e configuração (nav, footer, contato, copy).
// Editar aqui evita duplicar o mesmo texto em vários arquivos.
// Convenção de destaque tipográfico: texto entre *asteriscos* vira Instrument Serif Italic
// (main.js interpreta isso em richText()). Use só em 1–2 palavras-chave por título.
//
// A frase "Clareza também é infraestrutura." aparece em UM único lugar no site
// (encerramento) — não repetir no hero nem no manifesto.
window.ORLANDO_CONTENT = {
  meta: {
    title: "ORLANDO — Estratégia de marca, marketing e negócio",
    description: "Investigamos o que trava, organizamos prioridades e projetamos marca, conteúdo, governança e infraestrutura para empresas que cresceram antes de se estruturar."
  },

  contact: {
    instagramUrl: "https://www.instagram.com/orlandomarketingbranding/",
    instagramHandle: "@orlandomarketingbranding",
    linkedinUrl: "https://www.linkedin.com/company/orlandomarketingbranding/",
    tiktokUrl: "https://www.tiktok.com/@orlandomarketingbranding",
    facebookUrl: "https://www.facebook.com/orlandomarketingbranding",
    youtubeUrl: "https://www.youtube.com/@OrlandoMarketingBranding",
    email: "contato@orlandomarketingbranding.com.br",
    whatsapp: "5551984763778",
    whatsappDisplay: "51 98476-3778",
    commercialCta: {
      channel: "whatsapp",
      label: "Conversar no WhatsApp",
      href: "https://wa.me/5551984763778"
    }
  },

  nav: {
    links: [
      { label: "Como ajudamos", href: "#frentes" },
      { label: "O que entregamos", href: "#entregaveis" },
      { label: "Trabalhos", href: "#trabalhos" },
      { label: "Como começamos", href: "#comeco" },
      { label: "Contato", href: "#contato" }
    ],
    cta: { label: "Conversar", hrefKey: "commercialCta" }
  },

  // 2. Hero — fotografia exclusiva "Estratégia em construção" (Magnific,
  // projeto "ORLANDO — Site MVP 2026") como imagem dominante em tela cheia;
  // ver assets/hero-a-estrategia-construcao.jpg e styles.css (.hero). No
  // máximo uma palavra em itálico.
  hero: {
    chip: "Diagnóstico primeiro",
    eyebrow: "ORLANDO — estratégia, marca e governança",
    title: "Transformamos marketing em *estrutura* para decisões melhores.",
    lead: "Investigamos o que trava, organizamos prioridades e projetamos marca, conteúdo, governança e infraestrutura para empresas que cresceram antes de se estruturar.",
    ctaPrimary: { label: "Conversar no WhatsApp", hrefKey: "commercialCta" },
    ctaSecondary: { label: "Ver como ajudamos", href: "#frentes" }
  },

  // 3. Faixa de clientes — sete logos autorizados, altura óptica uniforme.
  // Imagens recortadas ao bounding box real do conteúdo (corrige espaço vazio
  // interno desigual entre PNGs).
  trust: {
    title: "Quem confia no nosso trabalho",
    items: [
      { image: "assets/clientes/logo-russell-bedford.png", name: "Russell Bedford Brasil", width: 185, height: 47 },
      { image: "assets/clientes/logo-camara-brasil-paraguai.png", name: "Câmara de Comércio Brasil-Paraguai", width: 170, height: 52 },
      { image: "assets/clientes/logo-instituto-ppps.png", name: "Instituto Brasileiro de PPPs Municipais", width: 191, height: 49 },
      { image: "assets/clientes/logo-fbm-rs.png", name: "Fundação Brasileira de Marketing/RS", width: 171, height: 71 },
      { image: "assets/clientes/logo-advogados-maciel.png", name: "Advogados Maciel", width: 178, height: 59 },
      { image: "assets/clientes/logo-atalaia.png", name: "Atalaia Soluções Integradas", width: 197, height: 57 },
      { image: "assets/clientes/logo-ga-corte-conformacao.png", name: "GA Corte e Conformação de Metais", width: 193, height: 50 }
    ]
  },

  // 4. Manifesto/problema — grid editorial, título e corpo no mesmo eixo,
  // parágrafo curto + dois pontos objetivos. Detalhe 4 como marca-d'água.
  manifesto: {
    eyebrow: "O problema que identificamos",
    title: "Clareza não é estética.",
    body: "Empresas que crescem sem se estruturar acumulam ruído: marca, liderança e operação defendendo promessas diferentes, e marketing reagindo a pedidos sem prioridade clara.",
    points: [
      "Aprovações dependem de opinião e memória, não de critério.",
      "A narrativa não acompanhou o tamanho que a empresa já tem."
    ]
  },

  // 5. "Como ajudamos" — quatro frentes de mesmo peso visual (instrução explícita
  // do usuário — não usar grade assimétrica aqui mesmo que a skill sugira).
  frentes: {
    title: "Como ajudamos",
    intro: "Quatro frentes, um sistema.",
    items: [
      { icon: "magnifying-glass", title: "Diagnóstico", description: "Perguntas, sinais e causas que a comunicação isolada não resolve." },
      { icon: "compass", title: "Estratégia de marca e posicionamento", description: "Percepção de valor, diferenciação e escolha de mercado." },
      { icon: "git-branch", title: "Governança de marketing", description: "Papéis, decisões e alinhamento entre liderança, marketing, comercial e operação." },
      { icon: "path", title: "Método e implementação", description: "Investigamos, organizamos e acompanhamos a mudança com evidência." }
    ]
  },

  // 6. "O que entregamos" — três movimentos editoriais (substitui os seis
  // cartões de dashboard demonstrativo). Campanha fotográfica própria da
  // ORLANDO.
  movements: {
    title: "Como *organizamos* o trabalho",
    intro: "Três movimentos que sustentam qualquer projeto: entender o cenário, definir a direção e criar o sistema que mantém tudo funcionando.",
    items: [
      {
        num: "01",
        eyebrow: "Diagnóstico",
        title: "Entendemos o cenário antes de propor qualquer mudança.",
        body: "Olhamos para o que já existe: histórico, concorrência, canais ativos e pontos que travam o crescimento. Reunimos isso em um retrato claro do momento da empresa, sem achismo.",
        image: "assets/movimento-01-diagnostico.jpg"
      },
      {
        num: "02",
        eyebrow: "Estratégia",
        title: "Definimos a direção com prioridades, não com uma lista de desejos.",
        body: "Marca, posicionamento e prioridades saem de decisões registradas — o que fazer primeiro, o que esperar depois e o que fica de fora por enquanto.",
        image: "assets/movimento-02-direcao.jpg"
      },
      {
        num: "03",
        eyebrow: "Execução",
        title: "Criamos o sistema que sustenta conteúdo, canais e acompanhamento.",
        body: "Conteúdo, canais e operação passam a seguir um fluxo com dono, prazo e método de acompanhamento — não apenas uma entrega pontual.",
        image: "assets/movimento-03-sistema.jpg"
      }
    ]
  },

  // 6b. Transição/fechamento — lobo ORLANDO (imagem exclusiva, mesma origem
  // do bloco acima). Seção atmosférica antes do CTA final, sem formulário.
  lobo: {
    eyebrow: "Direção",
    title: "Marcas com direção clara enxergam o caminho antes de decidir."
  },

  // 7. Trabalhos autorais e liderança — fundador + portfólio autoral,
  // deixando claro que não são cases da consultoria atual.
  founder: {
    photo: "assets/matheus-orlando-founder.jpg",
    eyebrow: "Por trás da ORLANDO",
    title: "Estratégia com repertório de quem também coloca a mão na massa.",
    name: "Matheus Orlando",
    role: "Fundador, diretor de arte e estrategista de marca",
    bio: "A ORLANDO é conduzida por Matheus Orlando. Sua experiência em identidade, posicionamento e comunicação deu origem a uma forma de trabalhar que une olhar criativo, diagnóstico e organização. Hoje, esse repertório sustenta nosso trabalho para transformar marketing disperso em prioridades claras, decisões consistentes e execução coordenada."
  },
  portfolio: {
    title: "Trabalhos *autorais*",
    intro: "Antes da atuação consultiva da ORLANDO, Matheus desenvolveu projetos de identidade e direção de arte para diferentes negócios. Esta seleção demonstra repertório visual e capacidade de construção de marca; não representa cases nem resultados da consultoria atual.",
    items: [
      { image: "assets/portfolio-contsil.png", name: "Contsil", description: "Identidade visual — contabilidade digital" },
      { image: "assets/portfolio-lf-marmitas.png", name: "LF Marmitas", description: "Brandbook — alimentação" },
      { image: "assets/portfolio-2sb-rental.png", name: "2SB Rental", description: "Identidade visual — locação de máquinas" },
      { image: "assets/portfolio-crispim-frare.png", name: "Crispim & Frare Advocacia", description: "Identidade visual — advocacia" }
    ],
    link: { label: "Ver mais no Behance", href: "https://www.behance.net/MatheusOrlando" }
  },

  // 8. Como começamos
  method: {
    title: "Como começamos",
    steps: [
      { icon: "chat-circle-text", label: "Conversa de contexto" },
      { icon: "magnifying-glass", label: "Diagnóstico das tensões e prioridades" },
      { icon: "flag", label: "Direção de trabalho com critérios claros" }
    ]
  },

  // 9. CTA final — única ocorrência da frase-síntese da marca.
  closing: {
    title: "Clareza também é *infraestrutura*.",
    lead: "Comece com uma conversa de 20 minutos sobre onde sua marca, marketing e negócio estão desalinhados.",
    ctaLabel: "Falar no WhatsApp",
    hrefKey: "commercialCta",
    emailLabel: "Ou escreva para"
  },

  footer: {
    year: new Date().getFullYear(),
    tagline: "Estratégia, marca e governança de marketing.",
    links: [
      { label: "Como ajudamos", href: "#frentes" },
      { label: "O que entregamos", href: "#entregaveis" },
      { label: "Trabalhos", href: "#trabalhos" },
      { label: "Contato", href: "#contato" }
    ],
    legal: [
      { label: "Política de Privacidade", href: "privacidade.html" },
      { label: "Termos de Uso", href: "termos.html" }
    ]
  }
};
