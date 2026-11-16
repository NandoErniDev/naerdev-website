/* Photo viewer built on <dialog>. Usage: Lightbox.open(list, index)
   list = [{ src, alt, caption }] */
(function () {
  var dlg, img, info, capEl, countEl, list = [], idx = 0, opener = null, startX = null;
  var ICON = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
  };

  function build() {
    dlg = document.createElement("dialog");
    dlg.className = "lb";
    dlg.setAttribute("aria-label", "Photograph viewer");
    dlg.innerHTML =
      '<div class="lb-stage"><img alt=""></div>' +
      '<div class="lb-info"><div class="lb-caption"></div><div class="lb-count" aria-live="polite"></div></div>' +
      '<button class="lb-btn lb-close" type="button" aria-label="Close viewer">' + ICON.close + "</button>" +
      '<button class="lb-btn lb-prev" type="button" aria-label="Previous photograph">' + ICON.prev + "</button>" +
      '<button class="lb-btn lb-next" type="button" aria-label="Next photograph">' + ICON.next + "</button>";
    document.body.appendChild(dlg);
    img = dlg.querySelector("img");
    capEl = dlg.querySelector(".lb-caption");
    countEl = dlg.querySelector(".lb-count");

    dlg.querySelector(".lb-close").addEventListener("click", close);
    dlg.querySelector(".lb-prev").addEventListener("click", function () { go(-1); });
    dlg.querySelector(".lb-next").addEventListener("click", function () { go(1); });
    // click on the dark background (anything that is not the photo, a button or the caption) closes
    dlg.addEventListener("click", function (e) { if (!e.target.closest("img, button, .lb-caption")) close(); });
    dlg.addEventListener("close", unlock);
    dlg.addEventListener("cancel", function () { /* Escape: native close, unlock runs on 'close' */ });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "Home") { e.preventDefault(); show(0); }
      else if (e.key === "End") { e.preventDefault(); show(list.length - 1); }
    });
    // swipe
    dlg.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") startX = e.clientX; });
    dlg.addEventListener("pointerup", function (e) {
      if (startX == null) return;
      var dx = e.clientX - startX; startX = null;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    });
    dlg.addEventListener("pointercancel", function () { startX = null; });
  }

  function lock() {
    var sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = sw > 0 ? sw + "px" : "";
    document.body.classList.add("no-scroll");
  }
  function unlock() {
    document.body.classList.remove("no-scroll");
    document.body.style.paddingRight = "";
    if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
  }

  function show(i) {
    idx = (i + list.length) % list.length;
    var it = list[idx];
    img.classList.add("is-loading");
    img.onload = function () { img.classList.remove("is-loading"); };
    img.alt = it.alt || "";
    img.src = it.src;
    capEl.textContent = it.caption || "";
    countEl.textContent = list.length > 1 ? (idx + 1) + " / " + list.length : "";
    [idx + 1, idx - 1].forEach(function (n) { // warm the neighbours
      var t = list[(n + list.length) % list.length];
      if (t && list.length > 1) { var p = new Image(); p.src = t.src; }
    });
  }
  function go(d) { if (list.length > 1) show(idx + d); }
  function close() { if (dlg && dlg.open) dlg.close(); }

  window.Lightbox = {
    open: function (items, index, from) {
      if (!items || !items.length) return;
      if (!dlg) build();
      list = items; opener = from || document.activeElement;
      dlg.classList.toggle("single", list.length < 2);
      lock();
      if (!dlg.open) dlg.showModal();
      show(index || 0);
      dlg.querySelector(".lb-close").focus({ preventScroll: true });
    },
    close: close
  };
})();
