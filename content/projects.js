/* ====================================================================
   PROJECTS  -  add a block to add a project. First = top of the page.
   status: free text, e.g. "In progress", "Prototype", "Live"
   featured: true = also shown on the homepage
   links: [{ label: "Source code", url: "https://..." }]
   ==================================================================== */
window.PROJECTS = [
  {
    slug: "budget-app",
    title: "Daily budget app",
    summary: "A minimal iPhone app that answers one question: how much can I still spend today?",
    details: "Three screens (Overview, Stats, Add), a large gauge for the remaining daily budget, and a short list of today's purchases. Built in Swift and SwiftUI, with every line written by hand. Version one is deliberately small: one daily budget, an expense list, an add form and saved data.",
    status: "In progress",
    tags: ["Swift", "SwiftUI", "iOS"],
    featured: true,
    links: []
  },
  {
    slug: "signbridge",
    title: "SignBridge",
    summary: "A SwiftUI app that teaches hand-sign letters using the camera.",
    details: "The camera and Apple's Vision framework track the position of your hand, and you earn points by holding a letter's sign steadily. Next step: reference images that show how to form each sign. It is meant as my Swift Student Challenge entry.",
    status: "Prototype",
    tags: ["SwiftUI", "Vision", "Camera"],
    featured: true,
    links: []
  },
  {
    slug: "lernpfad",
    title: "Lernpfad",
    summary: "My own study site for learning Swift, one lesson and checkbox at a time.",
    details: "A small site with a structured Swift curriculum that tracks which lessons I have finished.",
    status: "Ongoing",
    tags: ["HTML", "CSS", "JavaScript"],
    featured: true,
    links: []
  },
  {
    slug: "this-website",
    title: "This website",
    summary: "Hand-written HTML, CSS and JavaScript. No framework, no build step.",
    details: "Every page is a plain file. Trips, projects and articles are each edited in one content file.",
    status: "Live",
    tags: ["HTML", "CSS", "JavaScript"],
    featured: false,
    links: []
  },
  {
    slug: "demo-website",
    title: "Demo site for a local business",
    summary: "A sample website for a fictional painter, to show small businesses what a simple, fast site can look like.",
    details: "Part of an idea to offer simple websites to local businesses.",
    status: "Demo",
    tags: ["HTML", "CSS", "Web design"],
    featured: false,
    links: []
  }
];
