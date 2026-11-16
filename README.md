# naerdev.ch

A personal website by Nando Erni: software projects, a travel journal, music and a little about the person behind it. Plain HTML, CSS and JavaScript. No framework, no build step, no database, no trackers.

```
index.html      landing page
projects.html   project showcase with screenshots and case notes
travel.html     journey index
trip.html       one journey, told as a sticky scrollytelling story
hobbies.html    saxophone, Jugendmusik, photography, training, Lucerne
about.html      portrait, story, timeline and values
contact.html    email, form and availability
404.html        not found

content/        site.js, projects.js, trips.js, photo-index.js
images/         portraits, project screenshots, hobbies and travel photos
css/            style.css (system) + travel.css (journal)
js/             main.js, projects.js, travel.js, lightbox.js, contact.js
tools/          optional Node helpers
```

`parked-pages/` sits next to this folder. Those pages are not part of the site.

## Preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or `npx serve .`. Every page is a file; there is nothing to compile.

## What to edit

- **Site settings:** `content/site.js` (name, email, domain, navigation, social links).
- **Projects:** `content/projects.js`. Add a block, then drop screenshots into its folder.
- **Travel:** `content/trips.js`. All four journeys and all 80 places live there.
- **Photos:** see below.
- **Copy:** the HTML files are meant to be read and edited directly.

The current contact address is `hello@naerdev.ch` and the canonical domain is `https://naerdev.ch`. Change both in `content/site.js` if needed, then update the canonical URLs in the HTML and `sitemap.xml`.

## Project screenshots

```
images/projects/budget-app/cover.jpg       16:10 hero screenshot
images/projects/budget-app/screen-01.jpg   4:3 detail
images/projects/budget-app/screen-02.jpg
images/projects/budget-app/screen-03.jpg
```

The same pattern applies to `signbridge`, `lernpfad`, `this-website` and `demo-website`. The paths already exist in `content/projects.js`. Until a file is added, the page shows a designed placeholder rather than a broken image.

## Travel photographs

```
images/travel/europareise-1/cover.jpg
images/travel/europareise-1/colmar/IMG_0001.jpg
images/travel/europareise-1/colmar/IMG_0002.jpg
```

A trip cover is optional; the page has a designed cover until it exists. Place folders for all 80 stops already exist. Run:

```bash
node tools/scan-photos.js
```

to rebuild `content/photo-index.js` after adding images. The scan detects portrait and landscape files automatically.

The journey page uses a sticky visual stage on desktop: as you scroll the place notes, the image, number, country and progress update. On mobile the same media appears inside each place card. The layout works without photographs and without JavaScript for the surrounding page structure.

## Hobbies photographs

Expected files in `images/hobbies/`:

```
saxophon.jpg
jugendmusik.jpg
photography-1.jpg
photography-2.jpg
training.jpg
lucerne.jpg
```

Again, each missing file is shown as a composed placeholder, never as a broken image.

## Publishing

Any static host works. Push the contents of this folder to the repository root, or upload the folder to Cloudflare Pages, Netlify or classic hosting.

GitHub Pages works for this project because every internal link is relative. The site is also ready for a custom domain.

If you change `css/style.css`, `css/travel.css` or any file in `js/`, bump the `?v=20261116h` query in the HTML links so returning visitors get the new version.

## Notes

- Light and dark mode follow the visitor's system.
- The photo viewer supports keyboard arrows, Home/End, Escape and swipe.
- Reduced-motion preferences remove the reveals, parallax and smooth scrolling.
- No cookies, no external fonts, no analytics, no third-party scripts.
- The contact form opens the visitor's email app; there is no server.
