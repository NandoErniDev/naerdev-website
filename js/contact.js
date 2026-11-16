/* No server needed: the form opens the visitor's email app with the message filled in. */
(function () {
  var f = document.getElementById("contact-form");
  if (!f) return;
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = f.elements.name.value.trim(), msg = f.elements.message.value.trim();
    var subject = "Message from " + (name || "your website");
    var body = msg + (name ? "\n\n" + name : "");
    location.href = "mailto:" + (window.SITE.email || "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });
})();
