/* ORLANDO — comportamento do site (2026-09).
   Progressivo: todo conteúdo está no HTML. Este arquivo adiciona menu móvel, revelação suave,
   camadas do hero, correspondência de mensagem da campanha, origem da visita, formulário e eventos. */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.remove("no-js");
  doc.classList.add("js");

  var CFG = window.ORLANDO_CONFIG || {};
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Medição: GA4 somente após consentimento, sem dados pessoais ---------- */
  var GA_ID = CFG.ga4MeasurementId || "";
  var PAGE_TYPE = document.body.getAttribute("data-page") || "home";
  var SOLUTION = document.body.getAttribute("data-solution") || "institucional";
  var CONSENT_KEY = "orl_analytics_consent";
  var gaLoaded = false;
  var queue = [];
  function readConsent() { try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; } }
  function writeConsent(v) { try { localStorage.setItem(CONSENT_KEY, v); } catch (e) { /* armazenamento bloqueado */ } }
  var gaDebug = /[?&]ga_debug=1\b/.test(location.search);
  try { if (gaDebug) sessionStorage.setItem("orl_ga_debug", "1"); gaDebug = gaDebug || sessionStorage.getItem("orl_ga_debug") === "1"; } catch (e) {}

  function loadGA() {
    if (!GA_ID) return;
    window["ga-disable-" + GA_ID] = false;
    if (gaLoaded) {
      window.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      return;
    }
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.gtag("js", new Date());
    var cfg = { page_type: PAGE_TYPE, solution: SOLUTION, anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false };
    var mv = document.body.getAttribute("data-variant");
    if (mv) cfg.message_variant = mv;
    if (gaDebug) cfg.debug_mode = true;
    window.gtag("config", GA_ID, cfg); // envia um único page_view
    var sc = document.createElement("script");
    sc.async = true; sc.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(sc);
    queue.splice(0).forEach(function (q) { window.gtag("event", q[0], q[1]); });
  }

  // Parâmetros permitidos: nenhum campo digitado, nome, e-mail ou telefone chega ao Analytics.
  var ALLOWED = ["cta_position", "page_type", "solution", "link_destination", "message_variant", "form_id", "reason"];
  function track(event, params) {
    var clean = { page_type: PAGE_TYPE, solution: SOLUTION };
    var mv = document.body.getAttribute("data-variant");
    if (mv) clean.message_variant = mv;
    Object.keys(params || {}).forEach(function (k) { if (ALLOWED.indexOf(k) > -1 && params[k] != null) clean[k] = String(params[k]).slice(0, 80); });
    if (gaDebug) clean.debug_mode = true;
    if (CFG.debugEvents && window.console) console.info("[ORLANDO evento]", event, clean);
    if (!GA_ID || readConsent() !== "granted") return;
    if (gaLoaded && window.gtag) window.gtag("event", event, clean);
    else queue.push([event, clean]);
  }
  window.ORLANDO_TRACK = track;

  // Aviso de consentimento (aparece só quando há um ID do GA4 configurado)
  function consentBanner(force) {
    if (!GA_ID) return;
    var existing = document.getElementById("consentBar");
    if (existing) { existing.hidden = false; return; }
    if (!force && readConsent()) return;
    var legal = "/privacidade.html";
    var bar = document.createElement("div");
    bar.id = "consentBar"; bar.className = "consent-bar"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Preferências de medição");
    bar.innerHTML = '<p>Usamos o Google Analytics para contar visitas e cliques, sem dados de contato. Você aceita? <a href="' + legal + '">Saiba mais</a></p>' +
      '<div class="consent-actions"><button type="button" class="btn btn--sm" data-consent="granted">Aceitar</button><button type="button" class="btn btn--sm btn--ghost" data-consent="denied">Recusar</button></div>';
    document.body.appendChild(bar);
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("[data-consent]"); if (!b) return;
      var v = b.getAttribute("data-consent"); writeConsent(v); bar.hidden = true;
      if (v === "granted") loadGA();
      else if (gaLoaded) {
        window.gtag("consent", "update", { analytics_storage: "denied" });
        window["ga-disable-" + GA_ID] = true;
      }
    });
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest(".js-consent-open")) { e.preventDefault(); consentBanner(true); }
  });
  // Inicia depois do restante do script (a variante da campanha já estará definida no page_view).
  setTimeout(function () {
    if (!GA_ID) return;
    $all(".js-consent-open").forEach(function (el) { el.hidden = false; });
    if (readConsent() === "granted") loadGA(); else consentBanner(false);
  }, 0);

  /* ---------- Origem da visita (UTM / click ids) — primeira e última origem na sessão ---------- */
  var ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "m"];
  function readParams() {
    var out = {};
    try {
      var sp = new URLSearchParams(window.location.search);
      ATTR_KEYS.forEach(function (k) { var val = sp.get(k); if (val) out[k] = val.slice(0, 120); });
    } catch (e) { /* navegador antigo */ }
    return out;
  }
  var current = readParams();
  var store = { first: null, last: null };
  try {
    store.first = JSON.parse(sessionStorage.getItem("orl_first_touch") || "null");
    if (!store.first && Object.keys(current).length) {
      store.first = current; sessionStorage.setItem("orl_first_touch", JSON.stringify(current));
    }
    if (Object.keys(current).length) sessionStorage.setItem("orl_last_touch", JSON.stringify(current));
    store.last = JSON.parse(sessionStorage.getItem("orl_last_touch") || "null");
  } catch (e) { store.first = store.first || current; store.last = current; }
  var attribution = store.last || store.first || {};
  var landing = (function () { try { return sessionStorage.getItem("orl_landing") || (sessionStorage.setItem("orl_landing", location.pathname), location.pathname); } catch (e) { return location.pathname; } })();

  /* ---------- Menu ---------- */
  var toggle = $("#navToggle"), nav = $("#siteNav");
  if (toggle && nav) {
    var close = function () { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { var first = nav.querySelector("a"); if (first) first.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { close(); toggle.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth >= 960) close(); });
  }

  /* Seção ativa no menu */
  var header = $(".site-header");
  var navLinks = nav ? $all('a[href^="#"]', nav) : [];
  var sections = navLinks.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    if (sections.length) {
      var y = window.scrollY + 120, active = null;
      sections.forEach(function (s) { if (s.offsetTop <= y) active = s; });
      navLinks.forEach(function (a) {
        if (active && a.getAttribute("href") === "#" + active.id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Revelação suave ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $all("[data-reveal],[data-reveal-stagger]").forEach(function (el) { io.observe(el); });
    // Segurança: se algo falhar, mostra tudo após 2,5 s.
    setTimeout(function () { $all("[data-reveal],[data-reveal-stagger]").forEach(function (el) { el.classList.add("is-in"); }); }, 2500);
  } else {
    $all("[data-reveal],[data-reveal-stagger]").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Camadas de aplicação: organizam-se conforme a rolagem (desktop, sem movimento reduzido) ---------- */
  var layers = $(".layers");
  if (layers && !reduceMotion && window.matchMedia("(min-width: 960px)").matches) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var vh = window.innerHeight || 800;
      // 0 no topo da página; 1 depois de rolar ~45% da altura da tela
      var p = Math.min(1, Math.max(0, window.scrollY / (vh * 0.45)));
      layers.style.setProperty("--p", p.toFixed(3));
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  } else if (layers) {
    layers.style.setProperty("--p", "1");
  }

  /* ---------- Correspondência de mensagem (página de campanha) ---------- */
  var variants = window.ORLANDO_VARIANTS;
  if (variants) {
    var hashKey = (location.hash || "").replace("#", "").toLowerCase();
    var key = (current.m || current.utm_content || attribution.m || attribution.utm_content || (variants[hashKey] ? hashKey : "") || "").toLowerCase();
    var match = null;
    Object.keys(variants).forEach(function (k) {
      if (match) return;
      var v = variants[k];
      if (key === k || (v.aliases || []).indexOf(key) > -1) match = k;
    });
    if (match) {
      var v = variants[match];
      document.body.setAttribute("data-variant", match);
      $all("[data-slot]").forEach(function (el) {
        var slot = el.getAttribute("data-slot");
        if (v[slot] == null) return;
        if (slot === "cta") { el.querySelector("span").textContent = v.cta.label; el.setAttribute("href", v.cta.href); el.setAttribute("data-cta", v.cta.id); }
        else el.innerHTML = v[slot]; // conteúdo definido no próprio HTML da página (confiável)
      });
      if (v.title) document.title = v.title;
    } else {
      document.body.setAttribute("data-variant", document.body.getAttribute("data-default-variant") || "padrao");
    }
  }

  /* ---------- Cliques: site → solução e WhatsApp ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var pos = a.getAttribute("data-loc") || (a.closest("[data-loc]") && a.closest("[data-loc]").getAttribute("data-loc")) || "outro";
    if (href.indexOf("wa.me/") > -1) track("click_whatsapp", { cta_position: pos });
    else if (a.hasAttribute("data-lp")) track("click_lp", { cta_position: pos, link_destination: a.getAttribute("data-lp") });
  });

  /* ---------- Submenu "Soluções" ---------- */
  $all(".nav-group").forEach(function (g) {
    var btn = g.querySelector(".nav-sub-toggle");
    if (!btn) return;
    function set(open) { g.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", open ? "true" : "false"); }
    btn.addEventListener("click", function () { set(!g.classList.contains("is-open")); });
    var canHover = window.matchMedia("(hover: hover) and (min-width: 960px)").matches;
    if (canHover) {
      g.addEventListener("mouseenter", function () { set(true); });
      g.addEventListener("mouseleave", function () { set(false); });
    }
    g.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && g.classList.contains("is-open")) { set(false); btn.focus(); e.stopPropagation(); }
    });
    g.addEventListener("focusout", function (e) { if (!g.contains(e.relatedTarget) && window.innerWidth >= 960) set(false); });
    document.addEventListener("click", function (e) { if (!g.contains(e.target) && window.innerWidth >= 960) set(false); });
    g.querySelectorAll(".subnav a").forEach(function (l) { l.addEventListener("click", function () { set(false); }); });
  });

  /* ---------- Formulário ---------- */
  var form = $("#leadForm");
  if (!form) return;
  var statusEl = $("#formStatus");
  var submitBtn = form.querySelector('button[type="submit"]');
  var started = false;

  // Campos ocultos de origem
  function setHidden(name, value) { var f = form.elements[name]; if (f) f.value = value || ""; }
  setHidden("origem_pagina", location.pathname);
  setHidden("pagina_entrada", landing);
  setHidden("variante", document.body.getAttribute("data-variant") || "");
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"].forEach(function (k) { setHidden(k, attribution[k]); });
  setHidden("primeira_origem", store.first ? [store.first.utm_source, store.first.utm_medium, store.first.utm_campaign].filter(Boolean).join(" / ") : "");

  form.addEventListener("focusin", function () {
    if (!started) { started = true; track("form_start", { form_id: form.id }); }
  });

  var messages = {
    nome: "Informe seu nome.",
    empresa: "Informe o nome da empresa.",
    email: "Informe um e-mail válido, de preferência o profissional.",
    desafio: "Escolha o desafio que mais se aproxima do seu momento."
  };

  function fieldError(input, msg) {
    var err = document.getElementById(input.id + "-erro");
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg || "";
  }

  function validate() {
    var firstInvalid = null;
    ["nome", "empresa", "email", "desafio"].forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      var val = (input.value || "").trim();
      var ok = val.length > 0;
      if (ok && name === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
      fieldError(input, ok ? "" : messages[name]);
      if (!ok && !firstInvalid) firstInvalid = input;
    });
    var tel = form.elements.whatsapp;
    if (tel && tel.value.trim() && tel.value.replace(/\D/g, "").length < 10) {
      fieldError(tel, "Inclua DDD e número (ou deixe em branco).");
      firstInvalid = firstInvalid || tel;
    } else if (tel) fieldError(tel, "");
    return firstInvalid;
  }

  // Revalida enquanto a pessoa corrige (input/change), nunca no blur: evita que a mensagem de erro
  // suma no instante do clique e desloque o botão de envio.
  $all("input, select, textarea", form).forEach(function (el) {
    var h = function () { if (el.getAttribute("aria-invalid") === "true") validate(); };
    el.addEventListener("input", h);
    el.addEventListener("change", h);
  });

  function setStatus(state, html) {
    statusEl.setAttribute("data-state", state);
    statusEl.innerHTML = html;
  }

  function summary() {
    var f = form.elements;
    var desafio = f.desafio.options[f.desafio.selectedIndex].text;
    var lines = [
      "Olá, Matheus. Vim pelo site da ORLANDO e gostaria de solicitar uma proposta.",
      "",
      "Nome: " + f.nome.value.trim(),
      "Empresa: " + f.empresa.value.trim(),
      "E-mail: " + f.email.value.trim()
    ];
    if (f.whatsapp && f.whatsapp.value.trim()) lines.push("WhatsApp: " + f.whatsapp.value.trim());
    if (f.site && f.site.value.trim()) lines.push("Site: " + f.site.value.trim());
    lines.push("Desafio principal: " + desafio);
    if (f.mensagem && f.mensagem.value.trim()) lines.push("Contexto: " + f.mensagem.value.trim());
    return lines.join("\n");
  }

  function fallback(reason) {
    var text = summary();
    var wa = "https://wa.me/" + (CFG.whatsapp || "") + "?text=" + encodeURIComponent(text);
    var mail = "mailto:" + (CFG.email || "") + "?subject=" + encodeURIComponent("Solicitação de proposta — " + form.elements.empresa.value.trim()) + "&body=" + encodeURIComponent(text);
    var intro = reason === "error"
      ? "<strong>Não conseguimos enviar agora.</strong>Seus dados continuam no formulário. Tente novamente em instantes ou conclua por um dos canais abaixo — a mensagem já vai preenchida."
      : "<strong>Falta um passo para concluir.</strong>O envio automático ainda não está ativo nesta versão. Escolha um canal: sua mensagem já vai preenchida e só é enviada quando você confirmar.";
    setStatus(reason === "error" ? "error" : "fallback", intro +
      '<div class="btn-row">' +
      '<a class="btn" href="' + wa + '" target="_blank" rel="noopener" data-loc="form_fallback">Enviar pelo WhatsApp</a>' +
      '<a class="btn btn--outline-dark" href="' + mail + '" data-loc="form_fallback">Enviar por e-mail</a>' +
      "</div>");
    track("form_fallback_shown", { reason: reason, challenge: form.elements.desafio.value });
    statusEl.focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.elements._gotcha && form.elements._gotcha.value) return; // robô
    var invalid = validate();
    if (invalid) {
      setStatus("error", "<strong>Revise os campos destacados.</strong>");
      track("form_validation_error", { form_id: form.id });
      invalid.focus();
      return;
    }
    track("form_submit_attempt", { form_id: form.id, challenge: form.elements.desafio.value });

    var extraCfg = CFG.formExtraFields || {};
    var keyMissing = Object.prototype.hasOwnProperty.call(extraCfg, "access_key") && !extraCfg.access_key;
    if (!CFG.formEndpoint || keyMissing) { fallback("not_configured"); return; }

    submitBtn.disabled = true; submitBtn.classList.add("is-loading");
    submitBtn.querySelector("span").textContent = "Enviando…";
    setStatus("sending", "Enviando sua solicitação…");

    var data = new FormData(form);
    data.delete("_gotcha");
    var origem = [attribution.utm_source, attribution.utm_campaign, document.body.getAttribute("data-variant")].filter(Boolean).join(" · ");
    data.append("subject", "Novo lead do site ORLANDO — " + form.elements.empresa.value.trim() + (origem ? " (" + origem + ")" : ""));
    data.append("from_name", "Site ORLANDO");
    if (form.elements.email.value) data.append("replyto", form.elements.email.value.trim());
    var desafioSel = form.elements.desafio; data.set("desafio", desafioSel.options[desafioSel.selectedIndex].text);
    var extra = CFG.formExtraFields || {};
    Object.keys(extra).forEach(function (k) { data.append(k, extra[k]); });
    var ctrl = ("AbortController" in window) ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);

    fetch(CFG.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" }, signal: ctrl ? ctrl.signal : undefined })
      .then(function (res) {
        clearTimeout(timer);
        // Só confirma com HTTP 2xx e success:true explícito do Web3Forms.
        return res.text().then(function (txt) {
          var body = null; try { body = JSON.parse(txt); } catch (e) { /* resposta sem JSON */ }
          if (!res.ok) throw new Error("http_" + res.status);
          if (!body || body.success !== true) throw new Error("rejected");
        });
      })
      .then(function () {
        form.classList.add("is-sent");
        setStatus("success", "<strong>Recebemos sua solicitação.</strong>Matheus vai ler a sua mensagem e responder pelo e-mail ou WhatsApp informado para combinar a conversa inicial.");
        track("generate_lead", { form_id: form.id, cta_position: "formulario" });
        statusEl.focus();
      })
      .catch(function (err) {
        clearTimeout(timer);
        track("form_submit_error", { form_id: form.id, reason: String(err && err.message || "network").slice(0, 40) });
        fallback("error");
      })
      .then(function () {
        submitBtn.disabled = false; submitBtn.classList.remove("is-loading");
        submitBtn.querySelector("span").textContent = "Solicitar proposta";
      });
  });
})();
