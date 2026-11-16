# Personal website

A complete personal website in plain HTML, CSS and JavaScript. No framework, no build step, no database.
Every page is a file you can open and read. Works on any static host.

```
index.html  about.html  projects.html  travel.html  trip.html  contact.html  404.html
content/    <- the files you edit (site.js, trips.js, projects.js)
images/     <- your photographs
css/ js/    <- design and behaviour (touch only if you want to change them)
tools/      <- two optional helper scripts (need Node.js)
```

Pages that are not needed yet (Apple and technology, Music, Journey, Hobbies, Journal) are parked in the folder `parked-pages/`
next to this folder. They are not part of the website. See "Bringing parked pages back" at the end.

## Preview it on your computer

Open a terminal in this folder and run **one** of these, then open <http://localhost:8000>:

```
python3 -m http.server 8000        # macOS has Python 3 built in
npx serve .                        # if you have Node.js
```

Double-clicking `index.html` also works for most pages, but a local server behaves like the real website.
While previewing, empty photo slots show the file name they expect. Visitors never see that text.

## First things to personalise (10 minutes)

1. `content/site.js`: your name, email, region, social links.
2. `images/about/portrait.jpg`: your portrait (optional; a quiet placeholder shows until then).
3. Read `about.html` and `index.html` and rewrite anything that is not true or not yours.
4. `content/projects.js`: check the status and add links to your projects.
5. `node tools/set-domain.js yourdomain.ch` (see Publishing).

## Travel journal (one scroll-through per trip)

Each trip (Europareise 1 to 4) is its own cinematic, Apple-style story, read by scrolling in the order you travelled. The design uses SF Pro, large display type, calm grids and images first:
- A full-width hero with the cover, countries, title, year/duration and number of places.
- A short introduction, a few facts, and a small collapsible route diagram (one dot per place).
- Country chapters with a flag and country name, followed by a deliberately varied rhythm: cinematic full-width photographs, text beside a photograph, asymmetric collages of two or three places, and quiet lists for places passed through.
- Every place appears exactly once. The rhythm is chosen automatically from the number of stops and their country, so the page feels composed rather than random. A place can ask for a bigger moment with `layout: "feature"` or `layout: "split"`.
- Short personal notes (`note`), captions, dates and statistics are optional; empty fields simply take less space.
The overview page lists the four journeys with large covers, flags, counts and introductions.

**How many photographs?** One to four per place, more for places you want to dwell on. Choose your favourites; the page gets longer with every photograph. A complete per-place checklist with exact folders, crop suggestions and minimum/recommended counts is in `PHOTO-LIST.md`.

```
images/travel/europareise-1/cover.jpg        <- cover of the trip
images/travel/europareise-1/colmar/*.jpg     <- the photographs of Colmar
images/travel/europareise-1/luxemburg/*.jpg
...
```
All 80 place folders already exist. File names inside a folder do not matter (alphabetical order: `IMG_0001.jpg`, `IMG_0002.jpg` ... work fine).
The rhythm of layouts is chosen from the stops and countries; each photograph's orientation decides whether it gets a portrait or a landscape frame.

### Adding photographs (the everyday workflow)
1. Copy the photographs into the place's folder, e.g. `images/travel/europareise-1/colmar/`. The trip cover goes to `images/travel/europareise-1/cover.jpg`.
2. Run `node tools/scan-photos.js`. It finds every photograph, detects portrait vs. landscape and writes `content/photo-index.js`. It also warns about folder names that do not match `trips.js`.
3. Preview (see above). Places with photographs (or a text) appear in the scroll; the others stay in "The route" in grey until you add some.

Without Node.js, list photographs by hand: in `content/trips.js` add `photos: ["IMG_0001.jpg", "IMG_0002.jpg"]` to a place. A place with its own `photos` list ignores the scan.

### Editing trips and places (one file: `content/trips.js`)
- **Order of the scroll:** move the lines in `stops`. Nothing else has to change, because the folder names carry no numbers. (Example: Grenzmarkt in Poland sits in the middle of Europareise 3. If it belongs somewhere else, move its line.)
- **Country and flag:** `country: "PL"` (two-letter code). The flag and the country name are added automatically; a place without `country` uses the country of the place before it. The trip's flags and the list of countries are worked out from the places. Codes: CH DE FR IT ES AT NL BE LU PL CZ SK HU HR SI MC AD PT GB IE DK SE NO and more (see the list at the top of `js/travel.js`).
- **A story for a place:** add `note: "One or two sentences."` to the place. `date: "3 July"` adds a small date.
- **A bigger moment:** add `layout: "feature"` (full-width photograph) or `layout: "split"` (text beside the photograph) to a place. Leave it out for the automatic rhythm.
- **Title, year, introduction:** `title`, `year`, `duration`, `dates`, `intro`, `closing` and `description` at the top of each trip. Empty fields are left out of the page.
- **Cover:** the file `cover.jpg` in the trip folder, or `cover: "other.jpg"`. `coverFocus: "50% 30%"` chooses which part stays visible when it is cropped.
- **Captions:** `captions: { "IMG_0004.jpg": "Early morning" }` on a place (shown in the viewer and on hover).
- **Removing a photograph:** delete the file and run the scan again (or delete its line if you list photographs by hand). **Replacing:** use the same file name.
- **Adding or renaming a place:** add a line to `stops` and create its folder (the `folder` value is the folder name).
- **Hiding a trip for now:** `hidden: true`.

### Adding a fifth trip
1. Create `images/travel/europareise-5/` with `cover.jpg` and one folder per place.
2. In `content/trips.js` copy a whole trip block to the end of the list and change `id` (= folder name), `title` and the places (with `country` codes).
3. Add photographs, run the scan, preview, publish. The design does not change.

### Publishing a change
Upload the changed files (or push to Git). If you use the scan, upload `content/photo-index.js` too. Run `node tools/set-domain.js` (no argument) once to refresh `sitemap.xml`. If you change `css/style.css`, `css/travel.css` or `js/travel.js`, bump the `?v=20261116` date in the HTML links so returning visitors do not keep an old cached copy.

### Photo tips
- Export JPEGs at about 2400 px on the long edge, quality 75 to 82 (roughly 300 to 600 KB each). This site does not resize images for you, so full-size camera files make it slow, especially with many photographs per place.
- Keep file names simple.
- Photographs load lazily; the cover of the page you open loads first.
- The photo count on the overview is the number of photographs found by the scan (or listed by hand).
- Flag emojis show as two letters on Windows computers; on iPhone, Mac and Android they show as flags. The country name is always written next to the flag.
- Visitors who prefer reduced motion get the same page without the movement; on phones the movement is calmer.

## Projects

Copy a block in `content/projects.js`. `featured: true` also shows it on the homepage (first three).

## Publishing on your own domain

Any static host works. Three simple options (all have free tiers, check current limits):

- **Cloudflare Pages or Netlify:** create a project, upload this folder (drag and drop, or connect a Git repository). There is no build command; the publish directory is the folder itself.
- **GitHub Pages:** push the folder to a repository and enable Pages for the main branch.
- **Classic web hosting (SFTP):** upload the folder contents to the `public_html` / `htdocs` directory.

Then connect your domain: add it in the host's "Custom domain" settings; the host shows the DNS records to create at your registrar (usually a `CNAME` for `www` and an `A`/`ALIAS` record for the bare domain). HTTPS certificates are issued automatically by these hosts. DNS changes can take from minutes to a day.

Before you go live, run once:
```
node tools/set-domain.js yourdomain.ch
```
This sets the address in the canonical links, social previews, `sitemap.xml` and `robots.txt`. Later: upload changed files, or push to Git, and the host republishes.

## Accessibility and performance notes
- Semantic landmarks, skip link, visible focus, keyboard-operable menu and photo viewer, alt text on every photograph (override with `alt`/`coverAlt`).
- The photo viewer closes with Esc, the close button, or a click on the background; arrow keys, Home/End and swipe navigate; the page behind does not scroll.
- Light and dark mode follow the visitor's system. Reduced-motion preferences switch off animations.
- No cookies, no trackers, no external fonts or scripts. The type uses the visitor's system fonts (SF Pro on Apple devices).
- Pages need JavaScript for header, footer and the content from the `content/` files; without it a plain link list is shown.

## Known limits
- Responsive image sizes (`srcset`) are not generated: it would need a build step. Export reasonably sized files instead.
- Trip addresses use `?id=`; search engines can read them and the sitemap lists them, but they are not "pretty" URLs.
- The contact form opens the visitor's email app (no server). For a real form, add a form service later.

## Bringing parked pages back
`parked-pages/` contains `apple.html`, `music.html`, `journey.html`, `hobbies.html`, `journal.html`, `js/journal.js` and `content/articles.js`.
To bring a page back: copy the file into this folder (`journal.html` also needs `js/journal.js` and `content/articles.js` in the same places),
add a line for it to `nav` in `content/site.js`, then run `node tools/set-domain.js` to refresh the sitemap.
