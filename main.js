// ORLANDO — render de conteúdo (a partir de content.js), menu mobile e microinteração de scroll.
(function () {
  "use strict";

  var C = window.ORLANDO_CONTENT;
  if (!C) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function icon(name, weight) {
    return '<i class="ph-' + (weight || "light") + ' ph-' + name + '" aria-hidden="true"></i>';
  }

  function el(id) { return document.getElementById(id); }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Converte *palavra* em <span class="serif-i">palavra</span>. Escapa o resto do texto
  // primeiro — protege contra HTML/script vindo de conteúdo editável (CMS).
  function richText(str) {
    return escapeHtml(str).replace(/\*(.+?)\*/g, '<span class="serif-i">$1</span>');
  }

  function resolveHref(target) {
    if (target.hrefKey) return C.contact[target.hrefKey].href;
    return target.href;
  }

  function renderMeta() {
    document.title = C.meta.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", C.meta.description);
  }

  function renderNav() {
    var links = C.nav.links.map(function (l) {
      return '<a href="' + l.href + '">' + escapeHtml(l.label) + "</a>";
    }).join("");
    links += '<a class="nav-cta" href="' + resolveHref(C.nav.cta) + '" target="_blank" rel="noopener">' + escapeHtml(C.nav.cta.label) + "</a>";
    el("siteNav").innerHTML = links;
  }

  function renderHero() {
    el("heroChipText").textContent = C.hero.chip;
    el("heroEyebrow").textContent = C.hero.eyebrow;
    el("heroTitle").innerHTML = richText(C.hero.title);
    el("heroLead").textContent = C.hero.lead;
    el("heroCtas").innerHTML =
      '<a class="btn btn-primary" href="' + resolveHref(C.hero.ctaPrimary) + '" target="_blank" rel="noopener">' + escapeHtml(C.hero.ctaPrimary.label) + icon("arrow-right") + "</a>" +
      '<a class="btn btn-ghost" href="' + C.hero.ctaSecondary.href + '">' + escapeHtml(C.hero.ctaSecondary.label) + "</a>";
  }

  function renderTrust() {
    el("trustTitle").textContent = C.trust.title;
    el("trustLogos").innerHTML = C.trust.items.map(function (t) {
      return '<img src="' + t.image + '" alt="' + escapeHtml(t.name) + '" width="' + t.width + '" height="' + t.height + '" loading="lazy">';
    }).join("");
  }

  function renderManifesto() {
    el("manifestoEyebrow").textContent = C.manifesto.eyebrow;
    el("manifestoTitle").innerHTML = richText(C.manifesto.title);
    el("manifestoBody").textContent = C.manifesto.body;
    el("manifestoPoints").innerHTML = C.manifesto.points.map(function (p) {
      return "<li>" + escapeHtml(p) + "</li>";
    }).join("");
  }

  function renderFrentes() {
    el("frentesTitle").textContent = C.frentes.title;
    el("frentesIntro").textContent = C.frentes.intro;
    el("frentesList").innerHTML = C.frentes.items.map(function (s) {
      return '<article class="frente">' +
        '<span class="frente-icon">' + icon(s.icon) + "</span>" +
        "<h3>" + escapeHtml(s.title) + "</h3>" +
        "<p>" + escapeHtml(s.description) + "</p>" +
        "</article>";
    }).join("");
  }

  // ===== "O que entregamos" — três movimentos editoriais =====

  function renderMovements() {
    el("deliverablesTitle").innerHTML = richText(C.movements.title);
    el("deliverablesIntro").textContent = C.movements.intro;
    el("deliverablesGrid").innerHTML = C.movements.items.map(function (item, i) {
      return (
        '<div class="movement' + (i % 2 === 1 ? " rev" : "") + '">' +
          '<div class="movement-image"><img src="' + item.image + '" alt="' + escapeHtml(item.title) + '" loading="lazy"></div>' +
          '<div class="movement-text">' +
            '<p class="movement-num">' + escapeHtml(item.num) + "</p>" +
            '<p class="eyebrow">' + escapeHtml(item.eyebrow) + "</p>" +
            "<h3>" + escapeHtml(item.title) + "</h3>" +
            "<p>" + escapeHtml(item.body) + "</p>" +
          "</div>" +
        "</div>"
      );
    }).join("");
  }

  function renderLobo() {
    el("loboEyebrow").textContent = C.lobo.eyebrow;
    el("loboTitle").textContent = C.lobo.title;
  }

  function renderFounder() {
    el("founderEyebrow").textContent = C.founder.eyebrow;
    el("founderTitle").innerHTML = richText(C.founder.title);
    el("founderBio").textContent = C.founder.bio;
    el("founderName").textContent = C.founder.name;
    el("founderRole").textContent = C.founder.role;
  }

  function renderPortfolio() {
    el("portfolioTitle").innerHTML = richText(C.portfolio.title);
    el("portfolioIntro").textContent = C.portfolio.intro;
    el("portfolioGrid").innerHTML = C.portfolio.items.map(function (p) {
      return '<figure class="portfolio-item">' +
        '<img src="' + p.image + '" alt="' + escapeHtml(p.name + " — " + p.description) + '" loading="lazy">' +
        '<figcaption><b>' + escapeHtml(p.name) + "</b><span>" + escapeHtml(p.description) + "</span></figcaption>" +
        "</figure>";
    }).join("");
    var link = el("portfolioLink");
    link.textContent = C.portfolio.link.label;
    link.href = C.portfolio.link.href;
  }

  function renderMethod() {
    el("methodTitle").textContent = C.method.title;
    el("methodSteps").innerHTML = C.method.steps.map(function (s, i) {
      return '<li><span class="method-icon">' + icon(s.icon) + '</span><span class="method-index">0' + (i + 1) + '</span><span class="method-label">' + escapeHtml(s.label) + "</span></li>";
    }).join("");
  }

  function renderClosing() {
    el("closingTitle").innerHTML = richText(C.closing.title);
    el("closingLead").textContent = C.closing.lead;
    el("closingCta").innerHTML = '<a class="btn btn-accent" href="' + resolveHref(C.closing) + '" target="_blank" rel="noopener">' + escapeHtml(C.closing.ctaLabel) + icon("arrow-right") + "</a>";
    el("closingEmailRow").innerHTML = escapeHtml(C.closing.emailLabel) + ' <a href="mailto:' + C.contact.email + '">' + escapeHtml(C.contact.email) + "</a>";
  }

  function renderFooter() {
    el("footerYear").textContent = C.footer.year;
    el("footerTagline").textContent = C.footer.tagline;
    el("footerEmail").textContent = C.contact.email;
    el("footerEmail").href = "mailto:" + C.contact.email;
    el("footerWhatsapp").textContent = C.contact.whatsappDisplay;
    el("footerWhatsapp").href = C.contact.commercialCta.href;

    el("footerNav").innerHTML = C.footer.links.map(function (l) {
      return '<a href="' + l.href + '">' + escapeHtml(l.label) + "</a>";
    }).join("");
    el("footerLegal").innerHTML = C.footer.legal.map(function (l) {
      return '<a href="' + l.href + '">' + escapeHtml(l.label) + "</a>";
    }).join("");

    var socials = [
      { url: C.contact.instagramUrl, icon: "instagram-logo", label: "Instagram" },
      { url: C.contact.linkedinUrl, icon: "linkedin-logo", label: "LinkedIn" },
      { url: C.contact.tiktokUrl, icon: "tiktok-logo", label: "TikTok" },
      { url: C.contact.facebookUrl, icon: "facebook-logo", label: "Facebook" },
      { url: C.contact.youtubeUrl, icon: "youtube-logo", label: "YouTube" }
    ];
    el("footerSocial").innerHTML = socials.map(function (s) {
      return '<a href="' + s.url + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' + icon(s.icon) + "</a>";
    }).join("");
  }

  function initMobileNav() {
    var toggle = el("navToggle");
    var nav = el("siteNav");
    if (!toggle || !nav) return;

    function closeNav() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function openNav() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
    toggle.addEventListener("click", function () {
      nav.classList.contains("is-open") ? closeNav() : openNav();
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeNav(); toggle.focus(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 860) closeNav();
    });
  }

  // Nav transparente sobre o hero com foto (só na home, ver body.has-photo-hero
  // em styles.css) — fica translúcido/escuro após rolar.
  function initHeaderScroll() {
    if (!document.body.classList.contains("has-photo-hero")) return;
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 40) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    if (reduceMotion) return;
    var targets = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || !targets.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(function (t) { io.observe(t); });
  }

  // Sobrepõe content.js com o que estiver publicado no Sanity Studio (studio/),
  // quando configurado (ver cms-client.js). Sem projeto configurado, cmsData é
  // null e o site segue exatamente como content.js define — nada muda.
  function mergeCms(cmsData) {
    if (!cmsData) return;
    var s = cmsData.settings;
    if (s) {
      if (s.metaTitle) C.meta.title = s.metaTitle;
      if (s.metaDescription) C.meta.description = s.metaDescription;
      if (s.heroChip) C.hero.chip = s.heroChip;
      if (s.heroEyebrow) C.hero.eyebrow = s.heroEyebrow;
      if (s.heroTitle) C.hero.title = s.heroTitle;
      if (s.heroLead) C.hero.lead = s.heroLead;
      if (s.closingTitle) C.closing.title = s.closingTitle;
      if (s.closingCtaLabel) C.closing.ctaLabel = s.closingCtaLabel;
    }

    var ct = cmsData.contact;
    if (ct) {
      if (ct.instagramUrl) C.contact.instagramUrl = ct.instagramUrl;
      if (ct.instagramHandle) C.contact.instagramHandle = ct.instagramHandle;
      if (ct.email) C.contact.email = ct.email;
      if (ct.whatsappNumber) C.contact.whatsapp = ct.whatsappNumber;
      var href = null;
      if (ct.commercialChannel === "whatsapp" && ct.whatsappNumber) href = "https://wa.me/" + ct.whatsappNumber.replace(/\D/g, "");
      else if (ct.commercialChannel === "email" && ct.email) href = "mailto:" + ct.email;
      else if (ct.commercialChannel === "instagram" && ct.instagramUrl) href = ct.instagramUrl;
      else if (ct.commercialChannel === "custom" && ct.commercialCustomUrl) href = ct.commercialCustomUrl;
      if (href) C.contact.commercialCta.href = href;
      if (ct.commercialCtaLabel) C.contact.commercialCta.label = ct.commercialCtaLabel;
    }

    if (cmsData.services && cmsData.services.length) {
      C.frentes.items = cmsData.services.map(function (d) {
        return { icon: d.icon, title: d.title, description: d.description };
      });
    }

    // Nota: o overlay de "deliverables" do Sanity Studio (schema antigo, seis
    // kinds) foi removido daqui — o conteúdo desta seção agora é a campanha
    // fotográfica dos "três movimentos" (ver C.movements em content.js), que
    // não tem schema correspondente no Studio ainda.
  }

  function renderAll() {
    renderMeta();
    renderNav();
    renderHero();
    renderTrust();
    renderManifesto();
    renderFrentes();
    renderMovements();
    renderFounder();
    renderPortfolio();
    renderMethod();
    renderLobo();
    renderClosing();
    renderFooter();
    initMobileNav();
    initHeaderScroll();
    initReveal();
  }

  var cmsReady = window.ORLANDO_CMS_READY || Promise.resolve(null);
  cmsReady.then(function (cmsData) {
    mergeCms(cmsData);
    renderAll();
  });
})();
