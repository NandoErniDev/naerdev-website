/* Travel journal: index (travel.html), homepage teaser and journey pages (trip.html?id=...).
   Content lives in content/trips.js. This file only decides how it is shown. */
(function () {
  "use strict";
  var U = window.UI || {};
  var esc = U.esc || function (s) { return String(s == null ? "" : s); };
  var S = window.SITE || {};
  var DEV = !!U.DEV;
  var TRIPS = (window.TRIPS || []).filter(function (t) { return !t.hidden; });

  var COUNTRIES = {
    CH: "Switzerland", DE: "Germany", FR: "France", IT: "Italy", ES: "Spain", PT: "Portugal", AT: "Austria", LI: "Liechtenstein",
    LU: "Luxembourg", BE: "Belgium", NL: "Netherlands", DK: "Denmark", SE: "Sweden", NO: "Norway", FI: "Finland", IS: "Iceland", IE: "Ireland",
    GB: "United Kingdom", PL: "Poland", CZ: "Czechia", SK: "Slovakia", HU: "Hungary", SI: "Slovenia", HR: "Croatia", BA: "Bosnia and Herzegovina",
    RS: "Serbia", ME: "Montenegro", AL: "Albania", MK: "North Macedonia", GR: "Greece", BG: "Bulgaria", RO: "Romania", EE: "Estonia", LV: "Latvia",
    LT: "Lithuania", MC: "Monaco", AD: "Andorra", SM: "San Marino", VA: "Vatican City", MT: "Malta", CY: "Cyprus", TR: "Turkey", US: "United States",
    CA: "Canada", MX: "Mexico", JP: "Japan", AE: "United Arab Emirates", EG: "Egypt", MA: "Morocco"
  };

  function flag(cc) {
    cc = String(cc || "").toUpperCase();
    return /^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(127397 + cc.charCodeAt(0), 127397 + cc.charCodeAt(1)) : "";
  }
  function cname(cc) { return COUNTRIES[cc] || cc || ""; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function placeWord(n) { return n + (n === 1 ? " place" : " places"); }
  function joinList(a) {
    if (!a.length) return "";
    if (a.length === 1) return a[0];
    return a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
  }

  /* ---- data ---------------------------------------------------------------- */
  function folder(t) { return t.folder || "images/travel/" + t.id + "/"; }
  function enc(path) { return String(path || "").split("/").map(encodeURIComponent).join("/"); }
  function coverFile(t) { return t.cover || "cover.jpg"; }
  function coverPath(t) { return folder(t) + enc(coverFile(t)); }
  function coverOf(t) {
    var c = coverFile(t);
    return /^(https?:)?\/\//.test(c) || c.charAt(0) === "/" ? c : coverPath(t);
  }
  function coverAlt(t) { return t.coverAlt || "Cover photograph of " + (t.title || "the journey"); }
  function journeyUrl(t) { return "trip.html?id=" + encodeURIComponent(t.id); }
  function anchorOf(s) {
    var base = String(s.folder || s.name || "place").replace(/^\d+-/, "");
    return "p-" + base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function stopsOf(t) {
    if (t._stops) return t._stops;
    var idx = (window.PHOTO_INDEX || {})[t.id] || {};
    var prevCc = "";
    t._stops = (t.stops || []).map(function (s, si) {
      var cc = String(s.country || prevCc || "").toUpperCase();
      prevCc = cc;
      var raw = (s.photos && s.photos.length) ? s.photos : (idx[s.folder] || []);
      var st = {
        name: s.name, country: cc, folder: s.folder || "", note: s.note || "",
        date: s.date || "", layout: s.layout || "", anchor: anchorOf(s),
        no: pad(si + 1), photos: []
      };
      st.photos = raw.map(function (p, i) {
        var o = typeof p === "string" ? { file: p } : Object.assign({}, p);
        if (!o.caption && s.captions && s.captions[o.file]) o.caption = s.captions[o.file];
        o.src = folder(t) + enc(s.folder || "") + "/" + enc(o.file);
        o.alt = o.alt || o.caption || (s.name + ", photograph " + (i + 1));
        o.o = o.orientation === "portrait" ? "p" : "l";
        o.stop = st;
        return o;
      });
      return st;
    });
    return t._stops;
  }
  function photoCount(t) {
    return stopsOf(t).reduce(function (n, s) { return n + s.photos.filter(function (p) { return !p.failed; }).length; }, 0);
  }
  function countriesOf(t) {
    var seen = [];
    stopsOf(t).forEach(function (s) { if (s.country && seen.indexOf(s.country) < 0) seen.push(s.country); });
    return seen;
  }
  function runsOf(stops) {
    var runs = [];
    stops.forEach(function (s) {
      var r = runs[runs.length - 1];
      if (!r || r.cc !== s.country) { r = { cc: s.country, stops: [] }; runs.push(r); }
      r.stops.push(s);
    });
    return runs;
  }
  function shortDesc(t) {
    if (t.description) return t.description;
    var names = countriesOf(t).map(cname);
    return placeWord(stopsOf(t).length) + (names.length ? " across " + joinList(names) : "") + ".";
  }
  function metaLine(t) {
    var bits = [], n = stopsOf(t).length;
    if (t.year) bits.push(t.year);
    else if (t.dates) bits.push(t.dates);
    if (t.duration) bits.push(t.duration);
    bits.push(placeWord(n));
    return bits.join(" · ");
  }

  /* ---- media --------------------------------------------------------------- */
  function todoNode(text) {
    var p = document.createElement("p");
    p.className = "j-todo";
    p.textContent = text;
    return p;
  }
  function imageBox(o) {
    return U.makeMedia({
      src: o.src || null,
      alt: o.alt || "",
      ratio: o.ratio || "3 / 2",
      focus: o.focus || "",
      eager: !!o.eager,
      hint: o.hint || "",
      label: o.label || "",
      className: o.dark ? "j-dark" : "",
      onerror: o.photo ? function () { o.photo.failed = true; } : null
    });
  }
  function leadPhoto(stop, want) {
    var ps = stop.photos.filter(function (p) { return !p.failed; });
    if (!ps.length) return null;
    if (want) {
      for (var i = 0; i < ps.length; i++) {
        if (want === "portrait" && ps[i].o === "p") return ps[i];
        if (want === "landscape" && ps[i].o !== "p") return ps[i];
      }
    }
    return ps[0];
  }
  function ratioFor(photo, fallback) { return photo ? (photo.o === "p" ? "4 / 5" : "3 / 2") : fallback; }

  function allPhotos(t) {
    var out = [];
    stopsOf(t).forEach(function (s) {
      s.photos.forEach(function (p) { if (!p.failed) out.push(p); });
    });
    return out;
  }
  function openPhoto(t, photo, from) {
    if (!photo || !photo.src || !window.Lightbox) return;
    var list = allPhotos(t);
    var i = list.indexOf(photo);
    if (i < 0) return;
    window.Lightbox.open(list.map(function (p) {
      return { src: p.src, alt: p.alt, caption: [p.stop.name, p.caption].filter(Boolean).join(" · ") };
    }), i, from);
  }
  function photoControl(t, stop, photo, ratio, opts) {
    opts = opts || {};
    var media = imageBox({
      src: photo && photo.src, alt: photo ? photo.alt : "", ratio: ratio,
      focus: opts.focus, dark: !!opts.dark, photo: photo
    });
    if (!photo || !photo.src) return media;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "j-open";
    btn.setAttribute("aria-label", "Photograph of " + stop.name + (photo.caption ? ": " + photo.caption : ""));
    btn.appendChild(media);
    btn.addEventListener("click", function () { openPhoto(t, photo, btn); });
    return btn;
  }

  /* ---- journal index ------------------------------------------------------- */
  function renderIndex() {
    var host = document.getElementById("journeys");
    if (!host) return;
    var statHost = document.getElementById("tv-stats");
    if (statHost) {
      var cc = {}, places = 0, photos = 0;
      TRIPS.forEach(function (t) {
        countriesOf(t).forEach(function (c) { cc[c] = 1; });
        places += stopsOf(t).length;
        photos += photoCount(t);
      });
      var rows = [["Journeys", TRIPS.length], ["Countries", Object.keys(cc).length], ["Places", places], ["Photographs", photos]];
      statHost.innerHTML = rows.map(function (r) {
        return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>";
      }).join("");
    }
    if (!TRIPS.length) {
      host.innerHTML = '<p class="empty">No journeys yet. Add one in content/trips.js.</p>';
      return;
    }
    TRIPS.forEach(function (t, i) { host.appendChild(indexItem(t, i)); });
  }

  function indexItem(t, i) {
    var lead = i === 0;
    var cs = countriesOf(t);
    var a = document.createElement("a");
    a.className = "tv-item" + (lead ? " tv-item--lead" : "");
    a.href = journeyUrl(t);

    var media = document.createElement("div");
    media.className = "tv-media";
    media.appendChild(imageBox({
      src: coverOf(t), alt: coverAlt(t), focus: t.coverFocus,
      ratio: lead ? "21 / 9" : "4 / 3",
      eager: lead, hint: coverPath(t), label: "Cover photograph", dark: true
    }));
    a.appendChild(media);

    var body = document.createElement("div");
    body.className = "tv-body";
    body.innerHTML =
      '<div class="tv-item-head"><p class="tv-no">' + pad(i + 1) + '</p>' +
        '<p class="tv-meta">' + esc(metaLine(t)) + "</p></div>" +
      "<h2>" + esc(t.title) + "</h2>" +
      (cs.length ? '<p class="tv-countries">' +
        '<span class="tv-flags" aria-hidden="true">' + cs.map(flag).join(" ") + "</span>" +
        "<span>" + cs.map(function (c) { return esc(cname(c)); }).join(" · ") + "</span></p>" : "") +
      (lead ? '<p class="tv-desc">' + esc(shortDesc(t)) + "</p>" : "") +
      '<span class="tv-cta">Open the journey<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></span>';
    a.appendChild(body);
    return a;
  }

  /* ---- homepage teaser ----------------------------------------------------- */
  function renderTeaser() {
    var teaser = document.getElementById("home-travel");
    if (!teaser) return;
    TRIPS.slice(0, 2).forEach(function (t) {
      var a = document.createElement("a");
      a.href = journeyUrl(t);
      a.innerHTML = '<div class="t-media"></div><p class="t-title">' + esc(t.title) + '</p><p class="t-sub">' + esc(metaLine(t)) + "</p>";
      a.querySelector(".t-media").appendChild(imageBox({
        src: coverOf(t), alt: "", focus: t.coverFocus, ratio: "3 / 2",
        hint: coverPath(t), label: "Cover photograph", dark: true
      }));
      teaser.appendChild(a);
    });
  }

  /* ---- journey page -------------------------------------------------------- */
  function renderJourney() {
    var root = document.getElementById("journey-root");
    if (!root) return;
    var id = new URLSearchParams(location.search).get("id");
    var idx = -1;
    TRIPS.forEach(function (t, i) { if (t.id === id) idx = i; });
    if (idx < 0) {
      document.title = "Journey not found · " + (S.name || "Travel");
      document.body.classList.add("past-hero");
      root.innerHTML = '<div class="j-wrap j-notfound"><p class="j-kicker">Travel journal</p><h1>Journey not found</h1>' +
        '<p class="lede">Choose one of the journeys from the journal.</p>' +
        '<p class="j-notfound-link"><a class="link" href="travel.html">← All journeys</a></p></div>';
      return;
    }
    var t = TRIPS[idx], stops = stopsOf(t), cs = countriesOf(t);
    var title = t.title + (cs.length ? " · " + cs.map(cname).join(", ") : "") + " · " + (S.name || "Travel");
    setMeta(title, shortDesc(t), coverOf(t));

    var bar = document.createElement("div");
    bar.className = "j-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    root.appendChild(hero(t, stops, cs));
    root.appendChild(intro(t, stops));
    if (stops.length) root.appendChild(route(t, stops));

    var story = document.createElement("div");
    story.className = "j-story";
    compose(stops).forEach(function (b) { story.appendChild(renderBlock(t, b)); });
    root.appendChild(story);

    if (t.closing) {
      var close = document.createElement("section");
      close.className = "j-closing";
      close.innerHTML = '<div class="j-wrap"><p>' + esc(t.closing) + "</p></div>";
      root.appendChild(close);
    }
    root.appendChild(endNav(t, idx));
    setupMotion(root);

    if (location.hash.length > 1) {
      requestAnimationFrame(function () {
        var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el) el.scrollIntoView();
      });
    }
  }

  function hero(t, stops, cs) {
    var hero = document.createElement("header");
    hero.className = "j-hero";
    hero.id = "top";
    var media = document.createElement("div");
    media.className = "j-hero-media";
    media.appendChild(imageBox({
      src: coverOf(t), alt: coverAlt(t), focus: t.coverFocus, eager: true,
      hint: coverPath(t), label: "Cover photograph coming soon", dark: true
    }));
    hero.appendChild(media);

    var bits = [];
    if (t.year) bits.push(t.year);
    if (t.duration) bits.push(t.duration);
    bits.push(placeWord(stops.length));

    var inner = document.createElement("div");
    inner.className = "j-hero-inner";
    inner.innerHTML = '<div class="j-wrap">' +
      '<p class="j-eyebrow">' +
        (cs.length ? '<span class="j-hero-flags" aria-hidden="true">' + cs.map(flag).join(" ") + "</span>" : "") +
        (cs.length ? '<span class="j-hero-countries">' + cs.map(function (c) { return esc(cname(c)); }).join(" · ") + "</span>" : "") +
      "</p>" +
      "<h1>" + esc(t.title) + "</h1>" +
      '<p class="j-hero-meta">' + esc(bits.join(" · ")) + "</p>" +
    "</div>";
    hero.appendChild(inner);

    var cue = document.createElement("a");
    cue.className = "j-cue";
    cue.href = "#j-intro";
    cue.innerHTML = '<span class="j-cue-text">Scroll</span>' +
      '<span class="j-cue-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>';
    hero.appendChild(cue);
    return hero;
  }

  function intro(t, stops) {
    var sec = document.createElement("section");
    sec.className = "j-intro";
    sec.id = "j-intro";
    var kicker = document.createElement("p");
    kicker.className = "j-kicker";
    kicker.textContent = "The journey";

    var text = document.createElement("div");
    text.className = "j-intro-text";
    var p = document.createElement("p");
    p.textContent = t.intro || shortDesc(t);
    text.appendChild(p);
    if (DEV) {
      var missing = [];
      if (!t.intro) missing.push("the introduction");
      if (!t.year) missing.push("the year");
      if (!t.duration) missing.push("the duration");
      if (!photoCount(t)) missing.push("photographs");
      if (missing.length) text.appendChild(todoNode(joinList(missing) + " in content/trips.js."));
    }

    var facts = [];
    if (t.year) facts.push(["Year", t.year]);
    if (t.duration) facts.push(["Duration", t.duration]);
    facts.push(["Places", String(stops.length)]);
    facts.push(["Countries", String(countriesOf(t).length)]);
    if (photoCount(t)) facts.push(["Photographs", String(photoCount(t))]);
    var dl = document.createElement("dl");
    dl.className = "j-facts";
    dl.innerHTML = facts.map(function (f) {
      return "<div><dt>" + f[0] + "</dt><dd>" + esc(f[1]) + "</dd></div>";
    }).join("");

    var wrap = document.createElement("div");
    wrap.className = "j-wrap j-intro-grid";
    wrap.appendChild(kicker);
    wrap.appendChild(text);
    wrap.appendChild(dl);
    sec.appendChild(wrap);
    return sec;
  }

  function route(t, stops) {
    var sec = document.createElement("section");
    sec.className = "j-route-sec";
    var wrap = document.createElement("div");
    wrap.className = "j-wrap";
    var det = document.createElement("details");
    det.className = "j-route";
    det.innerHTML = '<summary><span class="j-route-title">The route</span>' +
      '<span class="j-route-sum">' + countriesOf(t).length + " countries · " + placeWord(stops.length) + "</span>" +
      '<span class="j-route-chev" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span></summary>';
    var track = document.createElement("div");
    track.className = "j-route-track";
    runsOf(stops).forEach(function (run) {
      var g = document.createElement("div");
      g.className = "j-rc";
      var name = document.createElement("p");
      name.className = "j-rc-name";
      name.innerHTML = '<span aria-hidden="true">' + flag(run.cc) + "</span> " + esc(cname(run.cc));
      var line = document.createElement("div");
      line.className = "j-rc-line";
      run.stops.forEach(function (s) {
        var a = document.createElement("a");
        a.className = "j-dot";
        a.href = "#" + s.anchor;
        a.title = s.name;
        a.setAttribute("aria-label", s.name);
        a.innerHTML = "<span aria-hidden=\"true\"></span>";
        line.appendChild(a);
      });
      g.appendChild(name);
      g.appendChild(line);
      track.appendChild(g);
    });
    det.appendChild(track);
    wrap.appendChild(det);
    sec.appendChild(wrap);
    return sec;
  }

  /* ---- the story rhythm ----------------------------------------------------
     Every place appears exactly once. The layout changes in a fixed rhythm so
     the page feels composed, not random; a place can opt into a bigger moment
     with layout: "feature" or layout: "split". */
  var CAP = { feature: 1, split: 1, pair: 2, trio: 3, quiet: 3 };
  var SEQ_A = ["feature", "split", "pair", "quiet", "trio", "split", "feature", "quiet"];
  var SEQ_B = ["split", "feature", "trio", "pair", "quiet", "split", "feature", "quiet"];

  function compose(stops) {
    var runs = runsOf(stops), blocks = [], seen = {}, chapter = 0;
    runs.forEach(function (run) {
      chapter++;
      var again = !!seen[run.cc];
      seen[run.cc] = true;
      blocks.push({ type: again ? "return" : "country", run: run, chapter: chapter, total: runs.length });
      var seq = chapter % 2 ? SEQ_B : SEQ_A;
      var i = 0, k = 0;
      while (i < run.stops.length) {
        var s = run.stops[i];
        var type = (s.layout && CAP[s.layout]) ? s.layout : seq[k++ % seq.length];
        var remaining = run.stops.length - i;
        if (CAP[type] > remaining) type = remaining === 1 ? "split" : "pair";
        blocks.push({ type: type, places: run.stops.slice(i, i + CAP[type]) });
        i += CAP[type];
      }
    });
    return blocks;
  }

  var splitNo = 0;
  function renderBlock(t, b) {
    if (b.type === "country") return countryBlock(t, b, false);
    if (b.type === "return") return countryBlock(t, b, true);
    if (b.type === "pair" || b.type === "trio") return collageBlock(t, b.places, b.type);
    if (b.type === "quiet") return quietBlock(t, b.places);
    if (b.type === "feature") return featureBlock(t, b.places[0]);
    splitNo++;
    return splitBlock(t, b.places[0], splitNo);
  }

  function countryBlock(t, b, isReturn) {
    var sec = document.createElement("section");
    sec.setAttribute("data-rv", "");
    if (isReturn) {
      sec.className = "j-return";
      sec.innerHTML = '<div class="j-wrap"><h2><span aria-hidden="true">' + flag(b.run.cc) + "</span> Back in " + esc(cname(b.run.cc)) + "</h2></div>";
      return sec;
    }
    sec.className = "j-country";
    var note = t.countryNotes && t.countryNotes[b.run.cc];
    sec.innerHTML = '<div class="j-wrap">' +
      '<div class="j-country-top"><span>Chapter ' + pad(b.chapter) + " / " + pad(b.total) + "</span><span>" + placeWord(b.run.stops.length) + "</span></div>" +
      '<div class="j-country-title"><span class="j-country-flag" aria-hidden="true">' + flag(b.run.cc) + "</span><h2>" + esc(cname(b.run.cc)) + "</h2></div>" +
      (note ? '<p class="j-country-note">' + esc(note) + "</p>" : "") +
      "</div>";
    return sec;
  }

  function featureBlock(t, stop) {
    var sec = document.createElement("section");
    sec.className = "j-feature";
    sec.id = stop.anchor;
    sec.setAttribute("data-rv", "");

    var fig = document.createElement("figure");
    fig.className = "j-full";
    var frame = document.createElement("div");
    frame.className = "j-frame j-frame--full";
    frame.appendChild(photoControl(t, stop, leadPhoto(stop, "landscape"), "", { dark: true }));
    fig.appendChild(frame);

    sec.appendChild(fig);

    var cap = document.createElement("div");
    cap.className = "j-wrap j-feature-cap";
    cap.innerHTML = '<p class="j-kicker">' + stop.no +
      '<span class="j-sep">·</span><span aria-hidden="true">' + flag(stop.country) + "</span> " + esc(cname(stop.country)) +
      (stop.date ? '<span class="j-sep">·</span>' + esc(stop.date) : "") +
      "</p><h3>" + esc(stop.name) + "</h3>";
    if (stop.note) {
      var n = document.createElement("p");
      n.className = "j-note";
      n.textContent = stop.note;
      cap.appendChild(n);
    } else if (DEV) {
      cap.appendChild(todoNode("a note for this place."));
    }
    sec.appendChild(cap);
    return sec;
  }

  function splitBlock(t, stop, n) {
    var sec = document.createElement("section");
    sec.className = "j-block j-split" + (n % 2 === 0 ? " is-flip" : "");
    sec.id = stop.anchor;
    sec.setAttribute("data-rv", "");

    var wrap = document.createElement("div");
    wrap.className = "j-wrap j-split-grid";

    var fig = document.createElement("figure");
    fig.className = "j-split-media";
    var photo = leadPhoto(stop);
    var frame = document.createElement("div");
    frame.className = "j-frame j-frame--rounded";
    frame.appendChild(photoControl(t, stop, photo, ratioFor(photo, n % 2 ? "3 / 2" : "4 / 5")));
    fig.appendChild(frame);
    if (photo && photo.caption) {
      var fc = document.createElement("figcaption");
      fc.className = "j-photo-cap";
      fc.textContent = photo.caption;
      fig.appendChild(fc);
    }

    var text = document.createElement("div");
    text.className = "j-split-text";
    text.innerHTML = '<p class="j-kicker">' + stop.no + '<span class="j-sep">·</span><span aria-hidden="true">' + flag(stop.country) + "</span> " + esc(cname(stop.country)) + "</p>" +
      "<h3>" + esc(stop.name) + "</h3>" +
      (stop.date ? '<p class="j-date">' + esc(stop.date) + "</p>" : "");
    if (stop.note) {
      var nEl = document.createElement("p");
      nEl.className = "j-note";
      nEl.textContent = stop.note;
      text.appendChild(nEl);
    } else if (DEV) {
      text.appendChild(todoNode("a note for this place."));
    }
    if (stop.photos.length > 1 && n % 2 === 1) {
      var extra = document.createElement("div");
      extra.className = "j-split-extra j-frame j-frame--rounded";
      extra.appendChild(photoControl(t, stop, stop.photos[1], "4 / 3"));
      text.appendChild(extra);
    }

    wrap.appendChild(fig);
    wrap.appendChild(text);
    sec.appendChild(wrap);
    return sec;
  }

  function collageBlock(t, places, kind) {
    var sec = document.createElement("section");
    sec.className = "j-block j-collage j-" + (kind === "pair" ? "c2" : "c3");
    sec.setAttribute("data-rv", "");
    var wrap = document.createElement("div");
    wrap.className = "j-wrap j-cols";
    places.forEach(function (stop, i) {
      var card = document.createElement("figure");
      card.className = "j-card";
      card.id = stop.anchor;
      card.style.setProperty("--i", i);
      var photo = leadPhoto(stop, i === 1 ? "portrait" : (i === 0 ? "landscape" : ""));
      var fallback = kind === "pair" ? (i ? "4 / 5" : "3 / 2") : (i === 1 ? "3 / 4" : "4 / 5");
      var frame = document.createElement("div");
      frame.className = "j-frame j-frame--rounded";
      frame.appendChild(photoControl(t, stop, photo, ratioFor(photo, fallback)));
      card.appendChild(frame);

      var cap = document.createElement("figcaption");
      cap.className = "j-card-cap";
      cap.innerHTML = '<p class="j-kicker">' + stop.no + '<span class="j-sep">·</span><span aria-hidden="true">' + flag(stop.country) + "</span> " + esc(cname(stop.country)) + "</p><h3>" + esc(stop.name) + "</h3>";
      if (stop.note) {
        var p = document.createElement("p");
        p.className = "j-note";
        p.textContent = stop.note;
        cap.appendChild(p);
      } else if (DEV) {
        cap.appendChild(todoNode("a note for this place."));
      }
      card.appendChild(cap);
      wrap.appendChild(card);
    });
    sec.appendChild(wrap);
    return sec;
  }

  function quietBlock(t, places) {
    var sec = document.createElement("section");
    sec.className = "j-block j-quiet";
    sec.setAttribute("data-rv", "");
    var wrap = document.createElement("div");
    wrap.className = "j-wrap";
    var list = document.createElement("ul");
    list.className = "j-quiet-list";
    places.forEach(function (stop) {
      var li = document.createElement("li");
      li.className = "j-quiet-item";
      li.id = stop.anchor;
      var thumb = document.createElement("div");
      thumb.className = "j-quiet-thumb";
      thumb.appendChild(photoControl(t, stop, leadPhoto(stop), "4 / 5"));
      var txt = document.createElement("div");
      txt.className = "j-quiet-text";
      txt.innerHTML = '<p class="j-kicker">' + stop.no + '<span class="j-sep">·</span><span aria-hidden="true">' + flag(stop.country) + "</span> " + esc(cname(stop.country)) + "</p><h3>" + esc(stop.name) + "</h3>";
      if (stop.note) {
        var p = document.createElement("p");
        p.className = "j-note";
        p.textContent = stop.note;
        txt.appendChild(p);
      } else if (DEV) {
        txt.appendChild(todoNode("a note for this place."));
      }
      li.appendChild(thumb);
      li.appendChild(txt);
      list.appendChild(li);
    });
    wrap.appendChild(list);
    sec.appendChild(wrap);
    return sec;
  }

  function endNav(t, idx) {
    var prev = TRIPS[idx - 1], next = TRIPS[idx + 1];
    var sec = document.createElement("section");
    sec.className = "j-end";
    var wrap = document.createElement("div");
    wrap.className = "j-wrap";
    wrap.innerHTML = '<a class="j-back link" href="travel.html">← All journeys</a>';
    var nav = document.createElement("nav");
    nav.className = "j-next";
    nav.setAttribute("aria-label", "Journeys");
    if (prev) nav.appendChild(nextCard(prev, "Previous journey"));
    if (next) nav.appendChild(nextCard(next, "Next journey"));
    if (nav.children.length) wrap.appendChild(nav);
    sec.appendChild(wrap);
    return sec;
  }

  function nextCard(t, label) {
    var a = document.createElement("a");
    a.href = journeyUrl(t);
    var frame = document.createElement("div");
    frame.className = "j-frame j-frame--rounded";
    frame.appendChild(imageBox({
      src: coverOf(t), alt: coverAlt(t), ratio: "16 / 9", dark: true,
      hint: coverPath(t), label: "Cover photograph"
    }));
    a.appendChild(frame);
    var lab = document.createElement("p");
    lab.className = "j-next-label";
    lab.textContent = label;
    var title = document.createElement("p");
    title.className = "j-next-title";
    title.textContent = t.title;
    var sub = document.createElement("p");
    sub.className = "j-next-sub";
    sub.textContent = metaLine(t);
    a.appendChild(lab);
    a.appendChild(title);
    a.appendChild(sub);
    return a;
  }

  function setMeta(title, desc, image) {
    document.title = title;
    var pairs = [
      ["meta[name=description]", desc],
      ["meta[property='og:title']", title],
      ["meta[property='og:description']", desc]
    ];
    if (image) {
      try { pairs.push(["meta[property='og:image']", new URL(image, location.href).href]); } catch (e) {}
    }
    pairs.forEach(function (p) {
      var m = document.querySelector(p[0]);
      if (m && p[1]) m.setAttribute("content", p[1]);
    });
  }

  /* ---- motion -------------------------------------------------------------
     Reveals and a very small hero parallax. The visitor keeps full control of
     the scroll; reduced-motion users get the page without any movement. */
  function setupMotion(root) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hero = root.querySelector(".j-hero");
    var media = root.querySelector(".j-hero-media");
    var progress = document.querySelector(".j-progress");
    var wide = window.matchMedia ? window.matchMedia("(min-width: 900px)") : { matches: false };
    var ticking = false;

    var update = function () {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (hero) document.body.classList.toggle("past-hero", y > hero.offsetHeight - 72);
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0).toFixed(4) + ")";
      }
      if (!reduce && media) {
        if (!wide.matches) { media.style.removeProperty("--pl"); }
        else {
          var h = media.offsetHeight || window.innerHeight;
          if (y <= h * 1.2) media.style.setProperty("--pl", (y * 0.08).toFixed(1) + "px");
        }
      }
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    if (reduce) return;
    root.classList.add("j-motion");

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
      root.querySelectorAll("[data-rv]").forEach(function (n) { io.observe(n); });
    } else {
      root.querySelectorAll("[data-rv]").forEach(function (n) { n.classList.add("is-in"); });
    }

  }

  renderIndex();
  renderTeaser();
  renderJourney();
})();
