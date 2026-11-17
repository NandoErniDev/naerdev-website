/* ====================================================================
   PROJECTS  -  add a block to add a project. First = top of the page.
   status: free text, e.g. "In progress", "Prototype", "Live"
   featured: true = also shown on the homepage
   cover:    images/projects/<slug>/cover.jpg  (optional)
   gallery:  file names inside images/projects/<slug>/
   links:    [{ label: "Source code", url: "https://..." }]
   ==================================================================== */
window.PROJECTS = [
  {
    slug: "budget-app",
    title: "Daily budget app",
    kicker: "iPhone · SwiftUI",
    year: "2026",
    summary: "A quiet iPhone app that answers one question: how much can I still spend today?",
    details: "Three screens, one large gauge and a short list of today's purchases. The app is deliberately small: one daily budget, an expense list, an add form and saved data. Every line is written by hand in Swift and SwiftUI.",
    role: "Design & development",
    platform: "iOS",
    status: "In progress",
    tone: 212,
    tags: ["Swift", "SwiftUI", "iOS"],
    featured: true,
    cover: "images/projects/budget-app/cover.jpg",
    gallery: ["screen-01.jpg", "screen-02.jpg", "screen-03.jpg"],
    highlights: [
      "A single glance answers the only question that matters today.",
      "Native SwiftUI, no third-party dependencies."
    ],
    links: []
  },
  {
    slug: "signbridge",
    title: "SignBridge",
    kicker: "iPhone · Vision",
    year: "2026",
    summary: "A SwiftUI app that teaches hand-sign letters using the camera and Apple's Vision framework.",
    details: "The camera tracks the position of your hand, and you earn points by holding a letter's sign steadily. The next step is a set of reference images that show how to form each sign. It is my entry for the Swift Student Challenge.",
    role: "Concept & development",
    platform: "iOS",
    status: "Prototype",
    tone: 142,
    tags: ["SwiftUI", "Vision", "Camera"],
    featured: true,
    cover: "images/projects/signbridge/cover.jpg",
    gallery: ["screen-01.jpg", "screen-02.jpg", "screen-03.jpg"],
    highlights: [
      "Real-time hand tracking, entirely on device.",
      "A learning loop built around patience, not speed."
    ],
    links: []
  },
  {
    slug: "lernpfad",
    title: "Lernpfad",
    kicker: "Web · Learning",
    year: "2025",
    summary: "My own study site for learning Swift, one lesson and one checkbox at a time.",
    details: "A structured Swift curriculum with small lessons, progress that stays saved, and no noise. I built it because the best way to learn a topic is to teach it to yourself in public.",
    role: "Design & development",
    platform: "Web",
    status: "Ongoing",
    tone: 36,
    tags: ["HTML", "CSS", "JavaScript"],
    featured: true,
    cover: "images/projects/lernpfad/cover.jpg",
    gallery: ["screen-01.jpg", "screen-02.jpg", "screen-03.jpg"],
    highlights: [
      "A curriculum that grows with every lesson I finish.",
      "Progress stored locally, without an account."
    ],
    links: []
  },
  {
    slug: "this-website",
    title: "This website",
    kicker: "Web · Editorial",
    year: "2026",
    summary: "Hand-written HTML, CSS and JavaScript. No framework, no build step, no trackers.",
    details: "Every page is a plain file. Projects, trips and photographs are edited in one content file each. The travel journal uses a sticky scrollytelling layout that works without a library and respects reduced motion.",
    role: "Design, code & photography",
    platform: "Web",
    status: "Built",
    tone: 280,
    tags: ["HTML", "CSS", "JavaScript"],
    featured: false,
    cover: "images/projects/this-website/cover.jpg",
    gallery: ["screen-01.jpg", "screen-02.jpg", "screen-03.jpg"],
    highlights: [
      "Fast by default: no framework, fonts or third-party scripts.",
      "A single content file for every project and journey."
    ],
    links: [
      { label: "Source code", url: "https://github.com/NandoErniDev/naerdev-website" }
    ]
  },
  {
    slug: "demo-website",
    title: "Demo site for a local business",
    kicker: "Web · Studio",
    year: "2025",
    summary: "A sample website for a fictional painter, showing what a simple, fast site can feel like.",
    details: "Part of an idea to offer thoughtful, hand-built websites to small local businesses. The focus is on clear storytelling, excellent typography and a site that loads before a visitor has time to leave.",
    role: "Design & development",
    platform: "Web",
    status: "Demo",
    tone: 350,
    tags: ["HTML", "CSS", "Web design"],
    featured: false,
    cover: "images/projects/demo-website/cover.jpg",
    gallery: ["screen-01.jpg", "screen-02.jpg", "screen-03.jpg"],
    highlights: [
      "A complete visual identity in one afternoon.",
      "Mobile-first, accessible and easy to edit."
    ],
    links: []
  }
];
