# ORLANDO — site institucional + páginas de solução

Site estático publicado no GitHub Pages (`orlandomarketingbranding.com.br`). Sem etapa de build: o workflow `.github/workflows/deploy-pages.yml` copia o repositório para `_site/` (sem `legacy/`, arquivos `.md` e `.git*`) e publica a cada push na `main`.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | Home institucional original preservada, com conteúdo estático, Soluções e GA4 |
| `solucoes/branding-b2b/index.html` | Página de solução / conversão: estratégia de marca e identidade visual para empresas B2B |
| `privacidade.html`, `termos.html`, `404.html` | Páginas legais e de erro |
| `sitemap.xml`, `robots.txt` | Indexação (a pasta `legacy/` fica fora) |
| `tokens.css`, `styles.css`, `assets/css/home-enhancements.css` | Layout original da home + integração de Soluções e consentimento |
| `assets/css/site.css` | Estilo da LP e páginas legais |
| `assets/js/config.js` | **Configuração**: ID do GA4, WhatsApp, e-mail, formulário (desativado) |
| `assets/js/site.js` | Menu e submenu, consentimento, GA4, eventos, variantes, revelação, camadas do hero |
| `assets/fonts/` | Montserrat (OFL) local. Instrument Serif vem do Google Fonts |
| `assets/img/`, `assets/projetos/` | Imagens OG e de projetos (WebP + JPG) |
| `legacy/2026-08-31/` | Versão anterior, não publicada. Tags de backup: `backup-pre-redesign-2026-09-23`, `backup-before-lp-final-2026-09-30` |

## Como adicionar a próxima página de solução

1. Copie `solucoes/branding-b2b/` para `solucoes/<nome>/` (caminhos de assets já usam `../../`).
2. No `<body>`, troque `data-solution="branding-b2b"` por `data-solution="<nome>"` (vai para o GA4 como `solution`).
3. Atualize `<title>`, description, canonical (`https://orlandomarketingbranding.com.br/solucoes/<nome>/`), Open Graph (crie `assets/img/og-<nome>.jpg`, 1200×630), JSON-LD `Service` + `BreadcrumbList`, H1 e conteúdo. Mantenha um único CTA e a mensagem de WhatsApp própria da página.
4. Na home: acrescente um `<li>` no submenu `#subSolucoes` (`<a href="solucoes/<nome>/" data-lp="<nome>" data-loc="menu">`), um link no rodapé (`data-loc="footer"`) e, se houver card correspondente, um `.offer-foot` com "Conhecer a solução" (`data-loc="offer_card"`). Não crie cards vazios.
5. Acrescente a URL no `sitemap.xml` e em `hasOfferCatalog` do JSON-LD da home.
6. Rode os testes (celular 320–430px, tablet, desktop, teclado no submenu) e, depois de publicar, peça a indexação no Search Console.

Quando houver três ou mais soluções, vale criar `/solucoes/index.html` como índice.

## Contato

WhatsApp é o canal principal: `https://wa.me/5551984763778` com mensagem pronta (uma na home, outra na LP). E-mail como alternativa. Não existe confirmação de envio simulada.

### Formulário (desativado desde 30/09/2026)

O código Web3Forms continua em `site.js`, mas só roda se existir `#leadForm` na página. Para reativar: gerar a `access_key` no Web3Forms para contato@orlandomarketingbranding.com.br, preencher `formExtraFields.access_key` em `config.js`, recolocar o formulário (com o campo `botcheck`), fazer **um envio real e confirmar o recebimento** e só então publicar. Atualizar `privacidade.html`. O evento `generate_lead` só dispara com `success:true` da API.

## GA4

- Propriedade "ORLANDO Marketing & Branding — Site" (conta Orlando Design), fuso São Paulo, moeda BRL. Fluxo web "Site ORLANDO (web)", ID em `config.js`.
- gtag.js só carrega **depois do aceite** no aviso de consentimento (modo básico). Recusar = nada é carregado. "Preferências de medição", no rodapé, reabre o aviso. Sinais do Google e personalização de anúncios desativados.
- Um `page_view` por página (via `config`), com `page_type` e `solution`; na LP também `message_variant`.
- Eventos: `click_whatsapp` (`cta_position`), `click_lp` (`cta_position`, `link_destination`), `generate_lead` (só com formulário ativo e sucesso real).
- Parâmetros passam por lista branca em `site.js`: nada de nome, e-mail, telefone ou texto digitado.
- Dimensões personalizadas (escopo de evento): `page_type`, `solution`, `cta_position`, `link_destination`, `message_variant`. Evento-chave: `click_whatsapp` (intenção de contato). Quando o formulário voltar, marcar `generate_lead` separadamente.
- Depuração: abra qualquer página com `?ga_debug=1` e aceite a medição; os eventos aparecem em Admin → DebugView.

## Links de campanha

Links internos não levam UTM. Nos anúncios, use a LP com `m` e UTMs:

`/solucoes/branding-b2b/?m=igual&utm_source=meta&utm_medium=paid_social&utm_campaign=orlando_b2b_marca_2026-10&utm_content=topo_igual_feed_c01`

| `m` (ou `utm_content`) | Troca headline e subtítulo para |
|---|---|
| `igual` | Se sua marca parece igual, o preço vira diferença. |
| `diferencial` | Seu diferencial aparece ou você precisa explicar? |
| `evoluiu` | Sua empresa evoluiu. Atualize sua marca. |
| `cresceu` | Sua empresa cresceu. Mas sua marca acompanhou? |

Todas as variantes usam o mesmo canonical da LP.

## Publicação revisada em 30/09/2026

A home do PDF original foi preservada por decisão expressa do proprietário. O conteúdo foi incorporado ao HTML, sem depender do carregamento de JavaScript para aparecer ou ser lido pelos buscadores. Imagens, seções e textos institucionais permanecem; as adições são Soluções no menu, link no card de estratégia, link no rodapé, SEO e medição.

A LP está em `/solucoes/branding-b2b/`. WhatsApp é o canal de contato. O formulário segue desativado. O código compartilhado permite recusar e aceitar novamente a medição na mesma página; aceitar novamente não duplica o page_view.

Validação local: 112 referências de arquivos/links/âncoras sem falhas; JSON-LD válido; um H1 por página; testes simulados de consentimento e descarte de dados pessoais nos eventos personalizados. A visualização no navegador desta sessão foi impedida por verificação de segurança indisponível. Não confundir esses testes com uma revisão visual ou confirmação de dados recebidos na conta do GA4.

A propriedade e as dimensões foram informadas pelo trabalho anterior; a conferência em GA4 e Search Console permanece pendente enquanto o navegador estiver indisponível.
