// ORLANDO — ponte opcional com o Sanity Studio (studio/).
// Enquanto SANITY_PROJECT_ID estiver vazio, esta função não faz nada e o site
// usa content.js normalmente — nada muda no comportamento atual do site.
// Quando o projeto Sanity existir, preencha SANITY_PROJECT_ID abaixo (não é
// segredo: projectId/dataset são públicos por design do Sanity) para o site
// passar a buscar o conteúdo publicado no Studio, com content.js como reserva
// caso a busca falhe (offline, dataset vazio, etc.).
window.ORLANDO_CMS_CONFIG = {
  projectId: "", // preencher após criar o projeto em sanity.io/manage
  dataset: "production"
};

(function () {
  "use strict";

  var cfg = window.ORLANDO_CMS_CONFIG;
  if (!cfg || !cfg.projectId) {
    window.ORLANDO_CMS_READY = Promise.resolve(null);
    return;
  }

  var GROQ =
    "{" +
    '"settings": *[_type=="siteSettings"][0],' +
    '"contact": *[_type=="contact"][0],' +
    '"services": *[_type=="service"] | order(order asc),' +
    '"deliverables": *[_type=="deliverable"] | order(order asc),' +
    '"articles": *[_type=="article"] | order(order asc)' +
    "}";

  var url =
    "https://" + cfg.projectId + ".api.sanity.io/v2024-01-01/data/query/" +
    cfg.dataset + "?query=" + encodeURIComponent(GROQ);

  window.ORLANDO_CMS_READY = fetch(url)
    .then(function (r) { if (!r.ok) throw new Error("cms fetch failed: " + r.status); return r.json(); })
    .then(function (json) { return json && json.result ? json.result : null; })
    .catch(function (err) {
      console.warn("[ORLANDO] Sanity indisponível, usando conteúdo estático (content.js):", err.message);
      return null;
    });
})();
