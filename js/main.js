/* Shared helpers, glass header, mobile menu and footer.
   Loaded on every page after content/site.js. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var page = document.body.getAttribute("data-page") || "";
  var DEV = ["localhost", "127.0.0.1", "", "[::1]"].indexOf(location.hostname) !== -1;

  document.documentElement.classList.add("js");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var ICON_APERTURE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5l4.2 7.3M20.3 8.2l-8.4 1M20.2 15.8L13.9 11M12 20.5l-4.2-7.3M3.7 15.8l8.4-1M3.8 8.2L10.1 13"/></svg>';
  var ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var ICON_MENU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  /* Make a media block that never shows a broken image.
     If no file is supplied, or it fails, a composed placeholder is shown. */
  function makeMedia(o) {
    o = o || {};
    var box = document.createElement("div");
    box.className = "media" + (o.className ? " " + o.className : "");
    if (o.ratio) box.style.setProperty("--ratio", String(o.ratio).replace("/", " / "));
    if (o.tone != null) box.style.setProperty("--tone", o.tone);

    var ph = document.createElement("div");
    ph.className = "media-ph";
    ph.innerHTML =
      '<span class="ph-icon">' + ICON_APERTURE + "</span>" +
      '<span class="ph-label">' + esc(o.label || "Image") + "</span>" +
      (DEV && o.hint ? '<span class="ph-hint">' + esc(o.hint) + "</span>" : "");
    box.appendChild(ph);

    if (!o.src) {
      box.classList.add("is-empty");
      return box;
    }

    var img = new Image();
    img.alt = o.alt || "";
    img.decoding = "async";
    img.loading = o.eager ? "eager" : "lazy";
    if (o.eager) img.setAttribute("fetchpriority", "high");
    if (o.focus) img.style.objectPosition = o.focus;
    img.addEventListener("load", function () {
      box.classList.add("is-loaded");
      box.classList.remove("is-empty");
      if (o.onload) o.onload(img, box);
    });
    img.addEventListener("error", function () {
      box.classList.add("is-empty");
      box.classList.remove("is-loaded");
      if (o.onerror) o.onerror();
    });
    img.src = o.src;
    box.insertBefore(img, ph);
    if (img.complete && img.naturalWidth) {
      box.classList.add("is-loaded");
      box.classList.remove("is-empty");
    }
    return box;
  }

  window.UI = {
    esc: esc,
    makeMedia: makeMedia,
    DEV: DEV,
    ICON_APERTURE: ICON_APERTURE,
    ICON_ARROW: ICON_ARROW
  };

  /* Header ---------------------------------------------------------------- */
  var header = document.getElementById("site-header");
  if (header) {
    var items = (S.nav || []).map(function (n) {
      var cur = n.id === page ? ' aria-current="page"' : "";
      return '<li><a href="' + esc(n.href) + '"' + cur + ">" + esc(n.label) + "</a></li>";
    }).join("");

    var menuLinks = (S.nav || []).map(function (n, i) {
      var cur = n.id === page ? ' aria-current="page"' : "";
      return '<a href="' + esc(n.href) + '"' + cur + "><span>" + esc(n.label) + "</span><span>" + (i < 9 ? "0" + (i + 1) : i + 1) + "</span></a>";
    }).join("");

    header.innerHTML =
      '<div class="bar">' +
        '<a class="wordmark" href="index.html" aria-label="Nando, home"><span class="wordmark-mark" aria-hidden="true">N</span><span>' + esc(S.name || "Nando") + "</span></a>" +
        '<nav class="nav" aria-label="Main"><ul>' + items + "</ul></nav>" +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-panel"><span>Menu</span>' + ICON_MENU + "</button>" +
      "</div>" +
      '<div class="menu-panel" id="menu-panel" hidden>' +
        '<nav aria-label="All sections">' + menuLinks + "</nav>" +
        '<div class="menu-foot"><a href="mailto:' + esc(S.email || "") + '">' + esc(S.email || "") + "</a>" +
        (S.github ? '<a href="' + esc(S.github) + '" rel="me noopener">GitHub</a>' : "") +
        "</div>" +
      "</div>";

    var btn = header.querySelector(".menu-btn");
    var btnLabel = btn.querySelector("span");
    var panel = header.querySelector(".menu-panel");
    var lastFocus = null;

    function setMenu(open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btnLabel.textContent = open ? "Close" : "Menu";
      btn.innerHTML = '<span>' + (open ? "Close" : "Menu") + "</span>" + (open ? ICON_CLOSE : ICON_MENU);
      panel.hidden = !open;
      document.body.classList.toggle("menu-open", open);
      header.classList.toggle("menu-active", open);
      if (open) {
        lastFocus = document.activeElement;
        var first = panel.querySelector("a");
        if (first) first.focus({ preventScroll: true });
      } else if (lastFocus && document.contains(lastFocus)) {
        btn.focus({ preventScroll: true });
      }
    }

    btn.addEventListener("click", function () { setMenu(panel.hidden); });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) { setMenu(false); btn.focus(); }
    });
    window.matchMedia("(min-width: 900px)").addEventListener("change", function (m) {
      if (m.matches && !panel.hidden) setMenu(false);
    });

    function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 10); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Footer ---------------------------------------------------------------- */
  var footer = document.getElementById("site-footer");
  if (footer) {
    var fl = (S.nav || []).map(function (n) {
      return '<li><a href="' + esc(n.href) + '">' + esc(n.label) + "</a></li>";
    }).join("");

    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="wordmark" href="index.html"><span class="wordmark-mark" aria-hidden="true">N</span><span>' + esc(S.name || "Nando") + "</span></a>" +
            "<p>" + esc(S.tagline || "") + " Based in " + esc(S.region || "Switzerland") + ".</p>" +
            '<a class="footer-mail" href="mailto:' + esc(S.email || "") + '">' + esc(S.email || "") + "</a>" +
          "</div>" +
          '<div class="footer-col"><h2>Explore</h2><ul>' + fl + "</ul></div>" +
          '<div class="footer-col"><h2>Elsewhere</h2><ul>' +
            (S.github ? '<li><a href="' + esc(S.github) + '" rel="me noopener">GitHub</a></li>' : "") +
            '<li><a href="mailto:' + esc(S.email || "") + '">Email</a></li>' +
            '<li><a href="travel.html">Travel journal</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom"><p>&copy; <span data-year>' + new Date().getFullYear() + "</span> " + esc(S.fullName || S.name || "Nando") + ". Written by hand in HTML, CSS and JavaScript.</p><p>Made in Switzerland. No cookies, no trackers.</p></div>" +
      "</div>";
  }

  /* Generic image slots: <div data-slot="images/about/portrait.jpg" data-alt="..." data-ratio="4/5"> */
  document.querySelectorAll("[data-slot]").forEach(function (el) {
    var media = makeMedia({
      src: el.getAttribute("data-slot"),
      alt: el.getAttribute("data-alt") || "",
      ratio: (el.getAttribute("data-ratio") || "3 / 2").replace("/", " / "),
      className: "round",
      tone: el.getAttribute("data-tone") || 212,
      hint: el.getAttribute("data-slot"),
      label: el.getAttribute("data-label") || "Image"
    });
    el.replaceWith(media);
  });

  /* Fill values from site.js ------------------------------------------------- */
  document.querySelectorAll('[data-site="email"]').forEach(function (el) {
    var email = S.email || "";
    if (el.tagName === "A") {
      el.href = "mailto:" + email;
      var label = el.querySelector("[data-email-text]");
      if (label) {
        label.textContent = email;
      } else {
        var textNode = Array.prototype.slice.call(el.childNodes).filter(function (n) {
          return n.nodeType === 3 && n.textContent.trim();
        })[0];
        if (textNode) textNode.textContent = email;
        else el.insertBefore(document.createTextNode(email), el.firstChild);
      }
    } else {
      el.textContent = email;
    }
  });
  document.querySelectorAll("[data-employer]").forEach(function (el) {
    el.textContent = S.employer ? " at " + S.employer : "";
  });
  document.querySelectorAll("[data-region]").forEach(function (el) {
    if (S.region) el.textContent = S.region;
  });
  document.querySelectorAll("[data-github]").forEach(function (el) {
    if (!S.github) return;
    el.href = S.github;
    el.textContent = el.getAttribute("data-label") || "GitHub";
  });
  var ll = document.getElementById("contact-links");
  if (ll && S.links && S.links.length) {
    ll.innerHTML = S.links.map(function (l) {
      return '<a class="text-link" rel="me noopener" href="' + esc(l.url) + '">' + esc(l.label) + ICON_ARROW + "</a>";
    }).join("");
  }

  /* Reveal on scroll -------------------------------------------------------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = document.querySelectorAll("[data-reveal]");
  if (revealItems.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            ro.unobserve(entry.target);
          }
        });
      }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
      revealItems.forEach(function (el) { ro.observe(el); });
    }
  }
})();
