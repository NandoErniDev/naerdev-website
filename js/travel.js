/* Travel journal: index, homepage teaser and journey scrollytelling.
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
  var HUES = [212, 26, 154, 276, 338, 194, 44, 122, 252, 8];

  function flag(cc) {
    cc = String(cc || "").toUpperCase();
    return /^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(127397 + cc.charCodeAt(0), 127397 + cc.charCodeAt(1)) : "";
  }
  function cname(cc) { return COUNTRIES[cc] || cc || ""; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function placeWord(n) { return n + (n === 1 ? " place" : " places"); }
  function enc(path) { return String(path || "").split("/").map(encodeURIComponent).join("/"); }
  function hueFor(id, i) {
    var n = i || 0;
    String(id || "").split("").forEach(function (c) { n += c.charCodeAt(0); });
    return HUES[n % HUES.length];
  }

  function folder(t) { return t.folder || "images/travel/" + t.id + "/"; }
  function coverPath(t) { return folder(t) + enc(t.cover || "cover.jpg"); }
  function coverAlt(t) { return t.coverAlt || "Cover photograph of " + (t.title || "the journey"); }
  function journeyUrl(t) { return "trip.html?id=" + encodeURIComponent(t.id); }

  function stopsOf(t) {
    if (t._stops) return t._stops;
    var idx = (window.PHOTO_INDEX || {})[t.id] || {};
    var prev = "";
    t._stops = (t.stops || []).map(function (s, si) {
      var cc = String(s.country || prev || "").toUpperCase();
      prev = cc;
      var raw = (s.photos && s.photos.length) ? s.photos : (idx[s.folder] || []);
      var photos = raw.map(function (p, pi) {
        var o = typeof p === "string" ? { file: p } : Object.assign({}, p);
        if (!o.caption && s.captions && s.captions[o.file]) o.caption = s.captions[o.file];
        o.src = folder(t) + enc(s.folder || "") + "/" + enc(o.file);
        o.alt = o.alt || o.caption || (s.name + ", photograph " + (pi + 1));
        o.stop = s.name;
        return o;
      });
      return {
        name: s.name, country: cc, folder: s.folder || "", note: s.note || "",
        date: s.date || "", no: pad(si + 1), photos: photos
      };
    });
    return t._stops;
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
  function metaLine(t) {
    var bits = [];
    if (t.year) bits.push(t.year);
    else if (t.dates) bits.push(t.dates);
    if (t.duration) bits.push(t.duration);
    bits.push(placeWord(stopsOf(t).length));
    return bits.join(" · ");
  }
  function countryNote(t, run) {
    if (t.countryNotes && t.countryNotes[run.cc]) return t.countryNotes[run.cc];
    if (run.stops.length === 1) return run.stops[0].name;
    return run.stops[0].name + " → " + run.stops[run.stops.length - 1].name;
  }
  function allPhotos(t) {
    var out = [];
    stopsOf(t).forEach(function (s) { s.photos.forEach(function (p) { out.push(p); }); });
    return out;
  }

  function coverArt(t, i) {
    var cs = countriesOf(t);
    return '<div class="cover-art" style="--hue:' + hueFor(t.id, i) + '">' +
      '<span class="cover-flags" aria-hidden="true">' + cs.map(flag).join(" ") + "</span>" +
      '<span class="cover-line" aria-hidden="true"></span>' +
      '<span class="cover-word" aria-hidden="true">EUROPA</span>' +
    "</div>";
  }
  function coverNode(t, i) {
    var box = document.createElement("div");
    box.className = "journey-cover";
    box.innerHTML = coverArt(t, i);
    box.appendChild(U.makeMedia({
      src: coverPath(t), alt: coverAlt(t), className: "cover-media",
      label: "Trip cover", hint: coverPath(t), eager: i === 0
    }));
    return box;
  }

  function indexCard(t, i) {
    var a = document.createElement("a");
    a.className = "journey-card";
    a.href = journeyUrl(t);
    a.appendChild(coverNode(t, i));
    var cs = countriesOf(t);
    a.insertAdjacentHTML("beforeend",
      '<div class="journey-info">' +
        '<div class="journey-meta"><span>' + esc(metaLine(t)) + "</span></div>" +
        "<h2>" + esc(t.title) + "</h2>" +
        '<p class="journey-desc">' + esc(t.description || "") + "</p>" +
        '<p class="journey-countries"><span class="flags" aria-hidden="true">' + cs.map(flag).join(" ") + "</span>" +
          cs.map(function (c) { return esc(cname(c)); }).join(" · ") + "</p>" +
      "</div>");
    return a;
  }

  function miniTrip(t, i) {
    var a = document.createElement("a");
    a.className = "mini-trip";
    a.href = journeyUrl(t);
    a.innerHTML = coverArt(t, i);
    a.appendChild(U.makeMedia({
      src: coverPath(t), alt: coverAlt(t), className: "cover-media",
      label: "Trip cover", hint: coverPath(t)
    }));
    a.insertAdjacentHTML("beforeend",
      '<div class="mini-trip-body"><h3>' + esc(t.title) + "</h3>" +
      "<span>" + esc(metaLine(t)) + "</span></div>");
    return a;
  }

  var journeys = document.getElementById("journeys");
  if (journeys) {
    var stats = document.getElementById("travel-stats");
    if (stats) {
      var cc = {};
      var places = 0;
      var years = {};
      TRIPS.forEach(function (t) {
        countriesOf(t).forEach(function (c) { cc[c] = 1; });
        places += stopsOf(t).length;
        if (t.year) years[t.year] = 1;
      });
      var rows = [
        ["Journeys", TRIPS.length],
        ["Countries", Object.keys(cc).length],
        ["Places", places],
        ["Years", Object.keys(years).length]
      ];
      stats.innerHTML = rows.map(function (r) {
        return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>";
      }).join("");
    }
    if (!TRIPS.length) {
      journeys.innerHTML = '<p class="muted">No journeys yet.</p>';
    } else {
      TRIPS.forEach(function (t, i) { journeys.appendChild(indexCard(t, i)); });
    }
  }

  var homeTravel = document.getElementById("home-travel");
  if (homeTravel && TRIPS.length) {
    TRIPS.slice(0, 4).forEach(function (t, i) { homeTravel.appendChild(miniTrip(t, i)); });
  }

  /* ---- Journey page ------------------------------------------------------- */
  function stepArt(cc, word, hue) {
    return '<div class="j-step-art" style="--hue:' + hue + '">' +
      '<span class="j-art-flag" aria-hidden="true">' + flag(cc) + "</span>" +
      '<span class="j-art-word" aria-hidden="true">' + esc(word) + "</span>" +
    "</div>";
  }

  function nextCard(t, i) {
    var a = document.createElement("a");
    a.className = "j-next-card";
    a.href = journeyUrl(t);
    var cover = document.createElement("div");
    cover.className = "j-next-cover";
    cover.innerHTML = coverArt(t, i);
    cover.appendChild(U.makeMedia({
      src: coverPath(t), alt: coverAlt(t), className: "cover-media",
      label: "Trip cover", hint: coverPath(t)
    }));
    a.appendChild(cover);
    a.insertAdjacentHTML("beforeend",
      '<div class="j-next-info"><p class="j-next-label">Next journey</p><p class="j-next-title">' + esc(t.title) + "</p>" +
      '<p class="j-next-meta">' + esc(metaLine(t)) + "</p></div>");
    return a;
  }

  function notFound(root) {
    root.innerHTML =
      '<div class="wrap j-notfound"><p class="eyebrow">Travel journal</p><h1>This journey isn&rsquo;t here.</h1>' +
      '<p class="lede">The address may be old, or the journey may still be private.</p>' +
      '<div class="hero-actions"><a class="btn" href="travel.html">All journeys</a><a class="btn secondary" href="index.html">Home</a></div></div>';
  }

  var root = document.getElementById("journey-root");
  if (root) {
    var id = new URLSearchParams(location.search).get("id");
    var index = -1;
    TRIPS.forEach(function (t, i) { if (t.id === id) index = i; });
    if (index < 0) {
      notFound(root);
      document.title = "Journey not found · " + (S.name || "Nando");
      return;
    }

    var trip = TRIPS[index];
    var stops = stopsOf(trip);
    var countries = countriesOf(trip);
    var runs = runsOf(stops);
    var hue = hueFor(trip.id, index);
    var photos = allPhotos(trip);
    var photoMap = {};
    photos.forEach(function (p) { photoMap[p.src] = p; });

    document.title = trip.title + " · Travel journal · " + (S.name || "Nando");
    var desc = trip.description || trip.intro || "";
    var pageUrl = "https://naerdev.ch/trip.html?id=" + encodeURIComponent(trip.id);
    var md = document.querySelector('meta[name="description"]');
    if (md && desc) md.setAttribute("content", desc);
    var og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute("content", trip.title + " · Travel journal");
    var ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", pageUrl);
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", pageUrl);

    var storySteps = "";
    var ci = 0;
    var pi = 0;
    runs.forEach(function (run) {
      var countryId = "country-" + ci;
      storySteps +=
        '<section class="j-step j-step-country" id="' + countryId + '" data-kind="country" data-country="' + esc(run.cc) + '"' +
          ' data-name="' + esc(cname(run.cc)) + '" data-note="' + esc(countryNote(trip, run)) + '"' +
          ' data-hue="' + hueFor(run.cc, ci) + '" data-flag="' + flag(run.cc) + '"' +
          ' data-count="' + (ci + 1) + " / " + runs.length + ' countries">' +
          '<div class="j-step-inner"><p class="j-step-meta"><span>Country</span></p>' +
            '<div class="j-step-country-head"><span class="j-step-country-flag" aria-hidden="true">' + flag(run.cc) + "</span>" +
            '<h2 class="j-step-country-name">' + esc(cname(run.cc)) + "</h2></div>" +
            '<p class="j-step-note">' + esc(countryNote(trip, run)) + "</p></div>" +
          '<div class="j-step-media">' + stepArt(run.cc, run.cc, hueFor(run.cc, ci)) + "</div>" +
        "</section>";

      run.stops.forEach(function (stop) {
        var photo = stop.photos[0] || null;
        var stepId = "step-" + pi;
        storySteps +=
          '<section class="j-step" id="' + stepId + '" data-kind="place" data-country="' + esc(stop.country) + '"' +
            ' data-name="' + esc(stop.name) + '" data-note="' + esc(stop.note) + '"' +
            ' data-hue="' + hueFor(stop.country, pi) + '" data-flag="' + flag(stop.country) + '"' +
            ' data-country-name="' + esc(cname(stop.country)) + '" data-count="' + (pi + 1) + " / " + stops.length + ' places"' +
            (photo ? ' data-photo="' + esc(photo.src) + '"' : "") + ">" +
            '<div class="j-step-inner"><p class="j-step-meta"><span>' + esc(cname(stop.country)) + "</span></p>" +
              '<h3 class="j-step-title">' + esc(stop.name) + "</h3>" +
              '<p class="j-step-note">' + esc(stop.note) + "</p></div>" +
            '<div class="j-step-media">' + stepArt(stop.country, stop.country, hueFor(stop.country, pi)) +
              (photo ? '<img loading="lazy" src="' + esc(photo.src) + '" alt="' + esc(photo.alt) + '">' : "") +
            "</div>" +
          "</section>";
        pi++;
      });
      ci++;
    });

    var route = runs.map(function (run) {
      return '<div class="j-route-group"><p class="j-route-country"><span class="flag" aria-hidden="true">' + flag(run.cc) + "</span>" + esc(cname(run.cc)) + "</p></div>";
    }).join("");

    var nexts = TRIPS.filter(function (t, i) { return i !== index; }).slice(0, 2);

    root.innerHTML =
      '<div class="j-progress" id="j-progress"><div class="j-progress-bar" id="j-progress-bar"></div></div>' +
      '<section class="j-hero">' +
        '<div class="j-hero-art" style="--hue:' + hue + '">' +
          '<span class="art-flag" aria-hidden="true">' + countries.map(flag).join(" ") + "</span>" +
          '<span class="art-line" aria-hidden="true"></span>' +
          '<span class="art-word" aria-hidden="true">EUROPA</span>' +
        "</div>" +
        '<div class="j-hero-media" id="j-hero-media"></div>' +
        '<div class="j-hero-inner"><div class="wrap">' +
          '<p class="j-eyebrow"><span>Travel journal</span></p>' +
          '<h1 class="j-title">' + esc(trip.title) + "</h1>" +
          '<p class="j-meta">' + esc(metaLine(trip)) + (trip.dates ? " · " + esc(trip.dates) : "") + "</p>" +
          '<p class="j-flags" aria-hidden="true">' + countries.map(flag).join(" ") + "</p>" +
        "</div></div>" +
        '<a class="j-scroll" href="#story"><span>Scroll the journey</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v15M6 13l6 6 6-6"/></svg></a>' +
      "</section>" +

      '<section class="j-intro"><div class="wrap"><div class="j-intro-grid">' +
        '<p class="j-kicker">The journey</p>' +
        '<p class="j-statement">' + esc(trip.intro || trip.description || "") + "</p>" +
        '<dl class="j-facts">' +
          '<div><dt>Year</dt><dd>' + esc(trip.year || "—") + "</dd></div>" +
          '<div><dt>Duration</dt><dd>' + esc(trip.duration || "—") + "</dd></div>" +
          '<div><dt>Countries</dt><dd>' + countries.length + "</dd></div>" +
          '<div><dt>Places</dt><dd>' + stops.length + "</dd></div>" +
        "</dl>" +
      "</div></div></section>" +

      '<section class="j-route-sec"><div class="wrap"><div class="j-route">' +
        '<div class="j-route-head"><span class="j-route-title">The route</span><span class="j-route-sum">' + stops.length + " places · " + countries.length + " countries</span></div>" +
        '<div class="j-route-track">' + route + "</div>" +
      "</div></div></section>" +

      '<section class="j-story" id="story"><div class="wrap"><div class="j-story-grid">' +
        '<aside class="j-sticky" aria-hidden="true">' +
          '<div class="j-frame" id="j-frame">' +
            '<div class="j-frame-art" id="j-frame-art" style="--hue:' + hue + '">' +
              '<span class="j-art-flag" id="j-frame-art-flag"></span>' +
              '<span class="j-art-word" id="j-frame-art-word"></span>' +
            "</div>" +
            '<button class="j-frame-open" id="j-frame-open" type="button" tabindex="-1" hidden><img class="j-frame-img" id="j-frame-img" alt=""></button>' +
            '<div class="j-frame-copy">' +
              '<p class="j-frame-eyebrow"><span id="j-frame-country"></span></p>' +
              '<h2 class="j-frame-title" id="j-frame-title"></h2>' +
              '<p class="j-frame-note" id="j-frame-note"></p>' +
            "</div>" +
            '<span class="j-frame-count" id="j-frame-count"></span>' +
          "</div>" +
          '<div class="j-progress-wrap"><div class="j-progress-track"><div class="j-progress-fill" id="j-progress-fill"></div></div><span class="j-progress-text" id="j-progress-text">0%</span></div>' +
        "</aside>" +
        '<div class="j-steps" id="j-steps">' + storySteps + "</div>" +
      "</div></div></section>" +

      '<section class="j-closing"><div class="wrap"><div class="j-closing-inner"><p>' +
        esc(trip.closing || "The road keeps going.") + "</p></div></div></section>" +

      '<section class="j-end"><div class="wrap"><a class="text-link j-back" href="travel.html">← All journeys</a>' +
        (nexts.length ? '<div class="j-next" id="j-next"></div>' : "") +
      "</div></section>";

    var heroMedia = document.getElementById("j-hero-media");
    if (heroMedia) {
      heroMedia.appendChild(U.makeMedia({
        src: coverPath(trip), alt: coverAlt(trip), className: "cover-media",
        label: "Cover photograph", hint: coverPath(trip), eager: true
      }));
    }

    var nextHost = document.getElementById("j-next");
    if (nextHost) nexts.forEach(function (t) {
      var i = TRIPS.indexOf(t);
      nextHost.appendChild(nextCard(t, i));
    });

    var stepEls = Array.prototype.slice.call(document.querySelectorAll(".j-step"));
    var frame = document.getElementById("j-frame");
    var frameArt = document.getElementById("j-frame-art");
    var frameArtFlag = document.getElementById("j-frame-art-flag");
    var frameArtWord = document.getElementById("j-frame-art-word");
    var frameCountry = document.getElementById("j-frame-country");
    var frameTitle = document.getElementById("j-frame-title");
    var frameNote = document.getElementById("j-frame-note");
    var frameCount = document.getElementById("j-frame-count");
    var frameOpen = document.getElementById("j-frame-open");
    var frameImg = document.getElementById("j-frame-img");
    var fill = document.getElementById("j-progress-fill");
    var text = document.getElementById("j-progress-text");
    var top = document.getElementById("j-progress");
    var topBar = document.getElementById("j-progress-bar");
    var story = document.getElementById("story");
    var currentPhoto = null;
    var active = null;

    frameImg.addEventListener("error", function () {
      frameOpen.hidden = true;
      currentPhoto = null;
    });

    function setActive(step) {
      if (!step || step === active) return;
      active = step;
      stepEls.forEach(function (s) { s.classList.toggle("is-active", s === step); });

      var cc = step.getAttribute("data-country") || "";
      var name = step.getAttribute("data-name") || "";
      var note = step.getAttribute("data-note") || "";
      var kind = step.getAttribute("data-kind");
      var stepHue = step.getAttribute("data-hue") || hue;

      frameArt.style.setProperty("--hue", stepHue);
      frameArtFlag.textContent = step.getAttribute("data-flag") || flag(cc);
      frameArtWord.textContent = cc || "";
      frameCountry.textContent = step.getAttribute("data-country-name") || cname(cc);
      frameTitle.textContent = name;
      frameNote.textContent = note;
      frameCount.textContent = step.getAttribute("data-count") || "";
      frame.classList.toggle("is-country", kind === "country");

      var src = step.getAttribute("data-photo") || "";
      currentPhoto = src ? photoMap[src] : null;
      if (currentPhoto) {
        frameImg.src = currentPhoto.src;
        frameImg.alt = currentPhoto.alt || "";
        frameOpen.hidden = false;
      } else {
        frameImg.removeAttribute("src");
        frameImg.alt = "";
        frameOpen.hidden = true;
      }
    }

    frameOpen.addEventListener("click", function () {
      if (!currentPhoto || !window.Lightbox) return;
      var list = allPhotos(trip);
      var i = list.indexOf(currentPhoto);
      if (i < 0) return;
      window.Lightbox.open(list.map(function (p) {
        return { src: p.src, alt: p.alt, caption: [p.stop, p.caption].filter(Boolean).join(" · ") };
      }), i, frameOpen);
    });

    if (stepEls.length) {
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActive(entry.target);
          });
        }, { rootMargin: "-44% 0px -44% 0px", threshold: 0 });
        stepEls.forEach(function (s) { io.observe(s); });
      }
      setActive(stepEls[0]);
    }

    document.querySelectorAll(".j-step-media img").forEach(function (img) {
      img.addEventListener("error", function () { img.style.display = "none"; });
    });

    function progress() {
      if (!story || !fill) return;
      var rect = story.getBoundingClientRect();
      var total = Math.max(1, story.offsetHeight - window.innerHeight);
      var p = Math.min(1, Math.max(0, (-rect.top + window.innerHeight * .34) / total));
      fill.style.width = (p * 100).toFixed(1) + "%";
      if (text) text.textContent = Math.round(p * 100) + "%";
      if (topBar) topBar.style.width = (p * 100).toFixed(1) + "%";
      if (top) top.classList.toggle("on", rect.top < window.innerHeight * .7 && rect.bottom > window.innerHeight * .2);
    }
    progress();
    window.addEventListener("scroll", progress, { passive: true });
    window.addEventListener("resize", progress);
  }
})();
