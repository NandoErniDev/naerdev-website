/* ------------------------------------------------------------------
   SITE SETTINGS  -  edit the values, keep the structure.
   ------------------------------------------------------------------ */
window.SITE = {
  name: "Nando",
  tagline: "Apprentice developer, learning to build for iPhone.",
  region: "Lucerne region, Switzerland",
  employer: "CSS Versicherung",          // shown on the Journey page; delete the text to hide it
  url: "https://naerdev.ch",         // your domain. Change with: node tools/set-domain.js yourdomain.ch
  email: "hello@example.com",             // shown on the Contact page
  // Social links. Leave the list empty to show none. Example:
  // { label: "Instagram", url: "https://instagram.com/yourname" }
  links: [],
  // Navigation (order = order in the header and menu)
  nav: [
    { label: "About",    href: "about.html",    id: "about" },
    { label: "Projects", href: "projects.html", id: "projects" },
    { label: "Travel",   href: "travel.html",   id: "travel" },
    { label: "Contact",  href: "contact.html",  id: "contact" }
  ]
};
