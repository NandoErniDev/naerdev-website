/* Contact form: validates locally and opens the visitor's email app. */
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var success = document.getElementById("form-success");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email ? form.elements.email.value.trim() : "";
    var topic = form.elements.topic ? form.elements.topic.value : "Hello";
    var message = form.elements.message.value.trim();

    if (!name || !message) {
      var first = !name ? form.elements.name : form.elements.message;
      first.focus();
      first.setAttribute("aria-invalid", "true");
      return;
    }

    var subject = topic + " — from " + name;
    var body = message + "\n\n" + name + (email ? "\n" + email : "");
    var to = (window.SITE && window.SITE.email) || "";
    location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    if (success) {
      success.hidden = false;
      success.textContent = "Your email app should open with the message ready to send.";
    }
  });

  form.querySelectorAll("input, textarea").forEach(function (el) {
    el.addEventListener("input", function () { el.removeAttribute("aria-invalid"); });
  });
})();
