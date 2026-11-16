/* Renders projects from content/projects.js */
(function () {
  var esc = window.UI.esc, P = window.PROJECTS || [];
  var all = document.getElementById("projects-list");
  if (all) {
    all.innerHTML = P.map(function (p) {
      var links = (p.links || []).map(function (l) { return '<a class="link" href="' + esc(l.url) + '" rel="noopener">' + esc(l.label) + "</a>"; }).join("");
      return '<li id="' + esc(p.slug) + '"><div class="row"><div><h2 class="row-title">' + esc(p.title) + '</h2><p class="row-meta" style="margin-top:10px"><span class="status">' + esc(p.status) + "</span></p></div>" +
        '<div class="row-side"><p class="row-text">' + esc(p.summary) + "</p>" +
        (p.details ? '<p class="row-text muted" style="margin-top:10px">' + esc(p.details) + "</p>" : "") +
        '<ul class="tags">' + (p.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        (links ? '<p class="links-list">' + links + "</p>" : "") + "</div></div></li>";
    }).join("");
  }
  var home = document.getElementById("home-projects");
  if (home) {
    home.innerHTML = P.filter(function (p) { return p.featured; }).slice(0, 3).map(function (p) {
      return '<li><a class="row" href="projects.html#' + esc(p.slug) + '"><div><h3 class="row-title">' + esc(p.title) + '</h3></div><div class="row-side"><p class="row-text">' + esc(p.summary) + '</p><p class="row-meta" style="margin-top:8px">' + esc(p.status) + "</p></div></a></li>";
    }).join("");
  }
})();
