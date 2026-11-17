/* Renders the project showcase and the homepage selection. */
(function () {
  "use strict";
  var U = window.UI || {};
  var esc = U.esc || function (s) { return String(s == null ? "" : s); };
  var P = window.PROJECTS || [];
  var S = window.SITE || {};

  function coverOf(p) { return p.cover || ""; }
  function galleryFile(p, file) {
    var base = coverOf(p).replace(/\/[^/]*$/, "");
    return base ? base + "/" + encodeURIComponent(file) : "";
  }

  function status(p) {
    return '<span class="project-status">' + esc(p.status) + "</span>";
  }

  function linkList(p) {
    var links = (p.links || []).map(function (l) {
      return '<a class="text-link" href="' + esc(l.url) + '" rel="noopener">' + esc(l.label) +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>';
    });
    if (!links.length && S.email) {
      links.push('<a class="text-link" href="mailto:' + esc(S.email) + '?subject=' + encodeURIComponent("A question about " + p.title) + '">Ask about this project' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>');
    }
    return links.join("");
  }

  function shot(p) {
    var box = document.createElement("div");
    box.className = "project-shot";
    var media = U.makeMedia({
      src: coverOf(p),
      alt: p.title + " — project screenshot",
      ratio: "16 / 10",
      tone: p.tone,
      label: "Screenshot",
      hint: coverOf(p)
    });
    box.appendChild(media);
    return box;
  }

  function gallery(p) {
    var wrap = document.createElement("div");
    wrap.className = "project-gallery";
    (p.gallery || []).slice(0, 3).forEach(function (file, i) {
      var thumb = document.createElement("div");
      thumb.className = "thumb";
      var media = U.makeMedia({
        src: galleryFile(p, file),
        alt: p.title + " — screen " + (i + 1),
        ratio: "4 / 3",
        tone: p.tone,
        label: "Screen 0" + (i + 1),
        hint: galleryFile(p, file)
      });
      thumb.appendChild(media);
      wrap.appendChild(thumb);
    });
    return wrap;
  }

  function project(p, i) {
    var el = document.createElement("article");
    el.className = "project";
    el.id = p.slug;
    el.setAttribute("data-tags", [p.platform].concat(p.tags || []).join(" ").toLowerCase());

    var highlights = (p.highlights || []).map(function (h) {
      return "<li>" + esc(h) + "</li>";
    }).join("");

    el.innerHTML =
      '<div class="project-head">' +
        '<span class="project-index">' + String(i + 1).padStart(2, "0") + "</span>" +
        "<div><p class=\"project-kicker\">" + esc(p.kicker || p.platform || "") + "</p>" +
        "<h2>" + esc(p.title) + "</h2>" +
        '<p class="project-summary">' + esc(p.summary) + "</p></div>" +
        status(p) +
      "</div>" +
      '<div class="project-showcase"></div>' +
      '<div class="project-body">' +
        "<div>" +
          '<p class="project-details">' + esc(p.details || "") + "</p>" +
          (highlights ? '<ul class="highlights">' + highlights + "</ul>" : "") +
        "</div>" +
        "<div>" +
          '<dl class="project-meta">' +
            "<div><dt>Year</dt><dd>" + esc(p.year || "—") + "</dd></div>" +
            "<div><dt>Role</dt><dd>" + esc(p.role || "—") + "</dd></div>" +
            "<div><dt>Platform</dt><dd>" + esc(p.platform || "—") + "</dd></div>" +
          "</dl>" +
          '<ul class="tags" style="margin-top:18px">' + (p.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
          '<div class="project-links" style="margin-top:20px">' + linkList(p) + "</div>" +
        "</div>" +
      "</div>";

    var showcase = el.querySelector(".project-showcase");
    showcase.appendChild(shot(p));
    if ((p.gallery || []).length) showcase.appendChild(gallery(p));
    return el;
  }

  var all = document.getElementById("projects-list");
  if (all) {
    if (!P.length) {
      all.innerHTML = '<p class="empty">No projects yet.</p>';
    } else {
      P.forEach(function (p, i) { all.appendChild(project(p, i)); });

      var filters = document.querySelectorAll("[data-filter]");
      var count = document.getElementById("project-count");
      filters.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var filter = (btn.getAttribute("data-filter") || "all").toLowerCase();
          filters.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
          var shown = 0;
          all.querySelectorAll(".project").forEach(function (card) {
            var match = filter === "all" || (card.getAttribute("data-tags") || "").indexOf(filter) !== -1;
            card.hidden = !match;
            if (match) shown++;
          });
          if (count) count.textContent = shown + (shown === 1 ? " project" : " projects");
        });
      });
      if (count) count.textContent = P.length + " projects";
    }
  }

  var home = document.getElementById("home-projects");
  if (home) {
    var featured = P.filter(function (p) { return p.featured; }).slice(0, 3);
    if (!featured.length) featured = P.slice(0, 3);
    home.innerHTML = featured.map(function (p, i) {
      var row = document.createElement("a");
      row.className = "project-row";
      row.href = "projects.html#" + p.slug;

      var visual = document.createElement("div");
      visual.className = "project-row-visual";
      visual.appendChild(U.makeMedia({
        src: coverOf(p), alt: p.title + " — project screenshot", ratio: "3 / 2",
        tone: p.tone, label: "Screenshot", hint: coverOf(p)
      }));

      row.innerHTML =
        '<span class="project-row-no">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="project-row-main">' +
          '<span class="project-row-kicker">' + esc(p.kicker || p.platform || "") + " · " + esc(p.year || "") + "</span>" +
          '<span class="project-row-title">' + esc(p.title) + "</span>" +
          '<span class="project-row-summary">' + esc(p.summary) + "</span>" +
        "</span>" +
        '<span class="project-row-arrow" aria-hidden="true">↗</span>';
      row.insertBefore(visual, row.querySelector(".project-row-arrow"));
      return row.outerHTML;
    }).join("");
  }
})();
