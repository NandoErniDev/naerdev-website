/* Shared helpers, header, menu, footer. Loaded on every page after content/site.js */
(function () {
  var S = window.SITE || {};
  var page = document.body.getAttribute("data-page") || "";
  var DEV = ["localhost", "127.0.0.1", "", "[::1]"].indexOf(location.hostname) !== -1;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var ICON_APERTURE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3l4 7M20 8l-8 1M20.4 15.5L14 11M12 21l-4-7M3.6 15.5L10 13M4 8l7 2"/></svg>';

  /* makeMedia: an image that never shows a broken-image icon.
     Falls back to a quiet placeholder if the file is missing. */
  function makeMedia(o) {
    var box = document.createElement("div");
    box.className = "media" + (o.className ? " " + o.className : "");
    if (o.ratio) box.style.setProperty("--ratio", o.ratio);
    var ph = document.createElement("div");
    ph.className = "ph";
    ph.innerHTML = ICON_APERTURE + "<span>" + (DEV && o.hint ? esc(o.hint) : esc(o.label || "Photograph coming soon")) + "</span>";
    box.appendChild(ph);
    if (!o.src) { box.classList.add("is-empty"); return box; }
    var img = new Image();
    img.alt = o.alt || "";
    img.decoding = "async";
    if (o.eager) { img.loading = "eager"; img.setAttribute("fetchpriority", "high"); } else { img.loading = "lazy"; }
    if (o.focus) img.style.objectPosition = o.focus;
    img.addEventListener("load", function () { box.classList.add("is-loaded"); if (o.onload) o.onload(img); });
    img.addEventListener("error", function () { box.classList.add("is-empty"); if (o.onerror) o.onerror(); });
    img.src = o.src;
    box.insertBefore(img, ph);
    if (img.complete && img.naturalWidth) box.classList.add("is-loaded");
    return box;
  }

  window.UI = { esc: esc, makeMedia: makeMedia, DEV: DEV, ICON_APERTURE: ICON_APERTURE };

  /* Header ---------------------------------------------------------------- */
  var header = document.getElementById("site-header");
  if (header) {
    var items = (S.nav || []).map(function (n) {
      var cur = n.id === page ? ' aria-current="page"' : "";
      return '<li><a href="' + n.href + '"' + cur + ">" + esc(n.label) + "</a></li>";
    }).join("");
    var menu = (S.nav || []).map(function (n) {
      var cur = n.id === page ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + cur + ">" + esc(n.label) + "</a>";
    }).join("");
    header.innerHTML =
      '<div class="bar"><a class="wordmark" href="index.html">' + esc(S.name) + "</a>" +
      '<nav class="nav" aria-label="Main"><ul>' + items + "</ul></nav>" +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-panel">Menu</button></div>' +
      '<div class="menu-panel" id="menu-panel" hidden><nav aria-label="All sections">' + menu + "</nav></div>";

    var btn = header.querySelector(".menu-btn");
    var panel = header.querySelector(".menu-panel");
    function setMenu(open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
      panel.hidden = !open;
      document.body.classList.toggle("no-scroll", open);
    }
    btn.addEventListener("click", function () { setMenu(panel.hidden); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { setMenu(false); btn.focus(); } });
    window.matchMedia("(min-width: 960px)").addEventListener("change", function (m) { if (m.matches) setMenu(false); });
  }

  /* Footer ---------------------------------------------------------------- */
  var footer = document.getElementById("site-footer");
  if (footer) {
    var fl = (S.nav || []).map(function (n) { return '<a href="' + n.href + '">' + esc(n.label) + "</a>"; }).join("");
    footer.innerHTML =
      '<div class="wrap"><nav class="foot-links" aria-label="Footer">' + fl + "</nav>" +
      "<p>&copy; " + new Date().getFullYear() + " " + esc(S.name) + ". Written by hand in HTML, CSS and JavaScript.</p></div>";
  }

  /* Generic slots: <div data-slot="images/about/portrait.jpg" data-alt="..." data-ratio="4/5"> */
  document.querySelectorAll("[data-slot]").forEach(function (el) {
    var m = makeMedia({ src: el.getAttribute("data-slot"), alt: el.getAttribute("data-alt") || "", ratio: (el.getAttribute("data-ratio") || "").replace("/", " / "),
      className: "round", hint: el.getAttribute("data-slot"), label: el.getAttribute("data-label") || "Photograph coming soon" });
    el.replaceWith(m);
  });
})();

/* Fill in values from content/site.js: <a data-site="email">, <span data-employer> */
(function () {
  var S = window.SITE || {};
  document.querySelectorAll('[data-site="email"]').forEach(function (el) {
    el.textContent = S.email || "";
    if (el.tagName === "A") el.href = "mailto:" + (S.email || "");
  });
  document.querySelectorAll("[data-employer]").forEach(function (el) { el.textContent = S.employer ? " at " + S.employer : ""; });
  var ll = document.getElementById("contact-links");
  if (ll && S.links && S.links.length) {
    ll.innerHTML = S.links.map(function (l) { return '<a class="link" rel="me noopener" href="' + window.UI.esc(l.url) + '">' + window.UI.esc(l.label) + "</a>"; }).join("");
  }
})();

document.querySelectorAll("[data-region]").forEach(function (el) { if (window.SITE && window.SITE.region) el.textContent = window.SITE.region; });
