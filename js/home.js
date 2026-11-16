/* Homepage: animate the budget gauge inside the phone illustration. */
(function () {
  var arc = document.getElementById("gauge-arc");
  var val = document.getElementById("gauge-value");
  if (!arc || !val) return;

  var pct = 64;
  var total = 60;
  var target = Math.round(total * pct) / 100;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fmt(n) { return "CHF " + n.toFixed(2); }
  if (reduce) {
    arc.style.strokeDashoffset = String(100 - pct);
    val.textContent = fmt(target);
    return;
  }
  arc.style.strokeDashoffset = "100";
  val.textContent = fmt(0);
  setTimeout(function () {
    arc.style.strokeDashoffset = String(100 - pct);
    var start = null;
    var duration = 1500;
    function step(ts) {
      if (start === null) start = ts;
      var k = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - k, 3);
      val.textContent = fmt(target * eased);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, 420);
})();
