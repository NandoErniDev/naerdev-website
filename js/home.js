/* Homepage: the budget gauge (an illustration of the app being built) */
(function () {
  var arc = document.getElementById("gauge-arc"), val = document.getElementById("gauge-value");
  if (!arc || !val) return;
  var pct = 64, total = 60, target = Math.round(total * pct) / 100; // illustration only
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function fmt(n) { return "CHF " + n.toFixed(2); }
  if (reduce) { arc.style.strokeDashoffset = String(100 - pct); val.textContent = fmt(target); return; }
  arc.style.strokeDashoffset = "100";
  val.textContent = fmt(0);
  setTimeout(function () {
    arc.style.strokeDashoffset = String(100 - pct);
    var t0 = null, dur = 1600;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      val.textContent = fmt(target * e);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, 350);
})();
