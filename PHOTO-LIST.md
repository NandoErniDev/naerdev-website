# Travel photo list

Every photograph for the Travel section, in the order it appears on the site. The folder names below already exist; you only need to copy files in. **All paths are relative to the website root (this folder).**

## At a glance

| Trip | Places | Cover | Minimum place photos | Recommended (2 per place) |
|---|---:|---|---:|---:|
| Europareise 1 | 26 | `images/travel/europareise-1/cover.jpg` | 26 | 52 |
| Europareise 2 | 28 | `images/travel/europareise-2/cover.jpg` | 28 | 56 |
| Europareise 3 | 10 | `images/travel/europareise-3/cover.jpg` | 10 | 20 |
| Europareise 4 | 16 | `images/travel/europareise-4/cover.jpg` | 16 | 32 |
| **Total** | **80** | **4 covers** | **80** | **160** |

**Absolute minimum to remove every empty frame: 84 files** — one cover per trip plus one photograph per place.
**Recommended: 164 files** — a landscape and a portrait (or a detail) for each place, giving the page a choice of crop and the viewer more to see.

The page normally shows one photograph per place; a split section can show a second 4:3 detail. Extra files are still used in the full-screen viewer. A place with no photograph stays visible as a designed placeholder.

## File rules

- **Where:** each place has its own folder, listed below. The trip cover sits directly in the trip folder, not inside a place folder.
- **Names:** any name works; files are sorted naturally. Use `01.jpg`, `02.jpg`, `03.jpg` for predictable order.
- **Formats:** JPEG is best (`.jpg` or `.jpeg`). PNG, WebP, AVIF and GIF are also read. The scanner detects portrait vs. landscape, including phone rotation.
- **Size:** export place photos at about **2400 px on the long edge**, sRGB, quality 75–82, roughly 300–600 KB. Covers: **3000 × 2000 px** (3:2) or **3000 × 1688 px** (16:9), same quality.
- **Crop safety:** covers are cropped to 21:9 on the journal index and to the full screen on the journey. Keep the subject away from the edges; `coverFocus` in `content/trips.js` can shift the crop.
- **After copying:** run `node tools/scan-photos.js` from the `site` folder. It writes `content/photo-index.js` and warns about folder mismatches.

## Trip covers

| Trip | Put the cover here | Shape |
|---|---|---|
| Europareise 1 | `images/travel/europareise-1/cover.jpg` | Landscape 3:2 or 16:9, 3000 px wide |
| Europareise 2 | `images/travel/europareise-2/cover.jpg` | Landscape 3:2 or 16:9, 3000 px wide |
| Europareise 3 | `images/travel/europareise-3/cover.jpg` | Landscape 3:2 or 16:9, 3000 px wide |
| Europareise 4 | `images/travel/europareise-4/cover.jpg` | Landscape 3:2 or 16:9, 3000 px wide |

## Europareise 1 — 26 places

Cover: `images/travel/europareise-1/cover.jpg`

| # | Place | Country | Page layout | Best first photo | Put the file here | Optional extras |
|---:|---|---|---|---|---|---|
| 01 | Colmar | France | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-1/colmar/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 02 | Luxemburg | Luxembourg | Feature | Landscape 3:2 | `images/travel/europareise-1/luxemburg/01.jpg` | `02.jpg`, `03.jpg` |
| 03 | Brüssel | Belgium | Split | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-1/bruessel/01.jpg` | `02.jpg`, `03.jpg` |
| 04 | Antwerpen | Belgium | Feature | Landscape 3:2 | `images/travel/europareise-1/antwerpen/01.jpg` | `02.jpg`, `03.jpg` |
| 05 | Gent | Belgium | Trio | Landscape 3:2 | `images/travel/europareise-1/gent/01.jpg` | `02.jpg`, `03.jpg` |
| 06 | Brügge | Belgium | Trio | Portrait 3:4 | `images/travel/europareise-1/bruegge/01.jpg` | `02.jpg`, `03.jpg` |
| 07 | Oostende | Belgium | Trio | Portrait 4:5 | `images/travel/europareise-1/oostende/01.jpg` | `02.jpg`, `03.jpg` |
| 08 | De Panne | Belgium | Pair | Landscape 3:2 | `images/travel/europareise-1/de-panne/01.jpg` | `02.jpg`, `03.jpg` |
| 09 | Dinant | Belgium | Pair | Portrait 4:5 | `images/travel/europareise-1/dinant/01.jpg` | `02.jpg`, `03.jpg` |
| 10 | Pairi Daiza | Belgium | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-1/pairi-daiza/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 11 | Amsterdam | Netherlands | Feature | Landscape 3:2 | `images/travel/europareise-1/amsterdam/01.jpg` | `02.jpg`, `03.jpg` |
| 12 | Zaanse Schans | Netherlands | Split | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-1/zaanse-schans/01.jpg` | `02.jpg`, `03.jpg` |
| 13 | Alkmaar | Netherlands | Pair | Landscape 3:2 | `images/travel/europareise-1/alkmaar/01.jpg` | `02.jpg`, `03.jpg` |
| 14 | Volendam | Netherlands | Pair | Portrait 4:5 | `images/travel/europareise-1/volendam/01.jpg` | `02.jpg`, `03.jpg` |
| 15 | Marken | Netherlands | Quiet list | Portrait 4:5 | `images/travel/europareise-1/marken/01.jpg` | `02.jpg`, `03.jpg` |
| 16 | Utrecht | Netherlands | Quiet list | Portrait 4:5 | `images/travel/europareise-1/utrecht/01.jpg` | `02.jpg`, `03.jpg` |
| 17 | Gouda | Netherlands | Quiet list | Portrait 4:5 | `images/travel/europareise-1/gouda/01.jpg` | `02.jpg`, `03.jpg` |
| 18 | Rotterdam | Netherlands | Pair | Landscape 3:2 | `images/travel/europareise-1/rotterdam/01.jpg` | `02.jpg`, `03.jpg` |
| 19 | Kinderdijk | Netherlands | Pair | Portrait 4:5 | `images/travel/europareise-1/kinderdijk/01.jpg` | `02.jpg`, `03.jpg` |
| 20 | Norddeutschland | Germany | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-1/norddeutschland/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 21 | Cuxhaven | Germany | Feature | Landscape 3:2 | `images/travel/europareise-1/cuxhaven/01.jpg` | `02.jpg`, `03.jpg` |
| 22 | Bremerhaven | Germany | Trio | Landscape 3:2 | `images/travel/europareise-1/bremerhaven/01.jpg` | `02.jpg`, `03.jpg` |
| 23 | Hamburg | Germany | Trio | Portrait 3:4 | `images/travel/europareise-1/hamburg/01.jpg` | `02.jpg`, `03.jpg` |
| 24 | Lüneburg | Germany | Trio | Portrait 4:5 | `images/travel/europareise-1/lueneburg/01.jpg` | `02.jpg`, `03.jpg` |
| 25 | Lüneburger Heide | Germany | Pair | Landscape 3:2 | `images/travel/europareise-1/lueneburger-heide/01.jpg` | `02.jpg`, `03.jpg` |
| 26 | Heidelberg | Germany | Pair | Portrait 4:5 | `images/travel/europareise-1/heidelberg/01.jpg` | `02.jpg`, `03.jpg` |

## Europareise 2 — 28 places

Cover: `images/travel/europareise-2/cover.jpg`

| # | Place | Country | Page layout | Best first photo | Put the file here | Optional extras |
|---:|---|---|---|---|---|---|
| 01 | Aosta | Italy | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-2/aosta/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 02 | Turin | Italy | Feature | Landscape 3:2 | `images/travel/europareise-2/turin/01.jpg` | `02.jpg`, `03.jpg` |
| 03 | Alassio | Italy | Trio | Landscape 3:2 | `images/travel/europareise-2/alassio/01.jpg` | `02.jpg`, `03.jpg` |
| 04 | Sanremo | Italy | Trio | Portrait 3:4 | `images/travel/europareise-2/sanremo/01.jpg` | `02.jpg`, `03.jpg` |
| 05 | Ventimiglia | Italy | Trio | Portrait 4:5 | `images/travel/europareise-2/ventimiglia/01.jpg` | `02.jpg`, `03.jpg` |
| 06 | Monaco | Monaco | Feature | Landscape 3:2 | `images/travel/europareise-2/monaco/01.jpg` | `02.jpg`, `03.jpg` |
| 07 | Nizza | France | Split | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-2/nizza/01.jpg` | `02.jpg`, `03.jpg` |
| 08 | Antibes | France | Feature | Landscape 3:2 | `images/travel/europareise-2/antibes/01.jpg` | `02.jpg`, `03.jpg` |
| 09 | Cannes | France | Trio | Landscape 3:2 | `images/travel/europareise-2/cannes/01.jpg` | `02.jpg`, `03.jpg` |
| 10 | Grasse | France | Trio | Portrait 3:4 | `images/travel/europareise-2/grasse/01.jpg` | `02.jpg`, `03.jpg` |
| 11 | Menton | France | Trio | Portrait 4:5 | `images/travel/europareise-2/menton/01.jpg` | `02.jpg`, `03.jpg` |
| 12 | Valensole | France | Pair | Landscape 3:2 | `images/travel/europareise-2/valensole/01.jpg` | `02.jpg`, `03.jpg` |
| 13 | Gorges du Verdon | France | Pair | Portrait 4:5 | `images/travel/europareise-2/gorges-du-verdon/01.jpg` | `02.jpg`, `03.jpg` |
| 14 | Abbaye de Sénanque | France | Quiet list | Portrait 4:5 | `images/travel/europareise-2/abbaye-de-senanque/01.jpg` | `02.jpg`, `03.jpg` |
| 15 | Provence | France | Quiet list | Portrait 4:5 | `images/travel/europareise-2/provence/01.jpg` | `02.jpg`, `03.jpg` |
| 16 | Arles | France | Quiet list | Portrait 4:5 | `images/travel/europareise-2/arles/01.jpg` | `02.jpg`, `03.jpg` |
| 17 | Camargue | France | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-2/camargue/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 18 | Nîmes | France | Feature | Landscape 3:2 | `images/travel/europareise-2/nimes/01.jpg` | `02.jpg`, `03.jpg` |
| 19 | Avignon | France | Pair | Landscape 3:2 | `images/travel/europareise-2/avignon/01.jpg` | `02.jpg`, `03.jpg` |
| 20 | Carcassonne | France | Pair | Portrait 4:5 | `images/travel/europareise-2/carcassonne/01.jpg` | `02.jpg`, `03.jpg` |
| 21 | Barcelona | Spain | Feature | Landscape 3:2 | `images/travel/europareise-2/barcelona/01.jpg` | `02.jpg`, `03.jpg` |
| 22 | Girona | Spain | Split | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-2/girona/01.jpg` | `02.jpg`, `03.jpg` |
| 23 | Besalú | Spain | Pair | Landscape 3:2 | `images/travel/europareise-2/besalu/01.jpg` | `02.jpg`, `03.jpg` |
| 24 | Costa Brava | Spain | Pair | Portrait 4:5 | `images/travel/europareise-2/costa-brava/01.jpg` | `02.jpg`, `03.jpg` |
| 25 | Lloret de Mar | Spain | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-2/lloret-de-mar/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 26 | Andorra | Andorra | Split | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-2/andorra/01.jpg` | `02.jpg`, `03.jpg` |
| 27 | Annecy | France | Feature | Landscape 3:2 | `images/travel/europareise-2/annecy/01.jpg` | `02.jpg`, `03.jpg` |
| 28 | Le Puy-en-Velay | France | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-2/le-puy-en-velay/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |

## Europareise 3 — 10 places

Cover: `images/travel/europareise-3/cover.jpg`

| # | Place | Country | Page layout | Best first photo | Put the file here | Optional extras |
|---:|---|---|---|---|---|---|
| 01 | Karlovy Vary | Czechia | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-3/karlovy-vary/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 02 | Františkovy Lázně | Czechia | Feature | Landscape 3:2 | `images/travel/europareise-3/frantiskovy-lazne/01.jpg` | `02.jpg`, `03.jpg` |
| 03 | Sächsische Schweiz | Germany | Feature | Landscape 3:2 | `images/travel/europareise-3/saechsische-schweiz/01.jpg` | `02.jpg`, `03.jpg` |
| 04 | Berlin | Germany | Split | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-3/berlin/01.jpg` | `02.jpg`, `03.jpg` |
| 05 | Lübbenau | Germany | Pair | Landscape 3:2 | `images/travel/europareise-3/luebbenau/01.jpg` | `02.jpg`, `03.jpg` |
| 06 | Spreewald | Germany | Pair | Portrait 4:5 | `images/travel/europareise-3/spreewald/01.jpg` | `02.jpg`, `03.jpg` |
| 07 | Grenzmarkt | Poland | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-3/grenzmarkt/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 08 | Potsdam | Germany | Feature | Landscape 3:2 | `images/travel/europareise-3/potsdam/01.jpg` | `02.jpg`, `03.jpg` |
| 09 | Würzburg | Germany | Split | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-3/wuerzburg/01.jpg` | `02.jpg`, `03.jpg` |
| 10 | Rothenburg ob der Tauber | Germany | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-3/rothenburg-ob-der-tauber/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |

## Europareise 4 — 16 places

Cover: `images/travel/europareise-4/cover.jpg`

| # | Place | Country | Page layout | Best first photo | Put the file here | Optional extras |
|---:|---|---|---|---|---|---|
| 01 | Salzburg | Austria | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-4/salzburg/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 02 | Linz | Austria | Feature | Landscape 3:2 | `images/travel/europareise-4/linz/01.jpg` | `02.jpg`, `03.jpg` |
| 03 | Chiemsee | Germany | Feature | Landscape 3:2 | `images/travel/europareise-4/chiemsee/01.jpg` | `02.jpg`, `03.jpg` |
| 04 | Bratislava | Slovakia | Split | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-4/bratislava/01.jpg` | `02.jpg`, `03.jpg` |
| 05 | Győr | Hungary | Feature | Landscape 3:2 | `images/travel/europareise-4/gyor/01.jpg` | `02.jpg`, `03.jpg` |
| 06 | Balaton | Hungary | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-4/balaton/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 07 | Zagreb | Croatia | Split | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-4/zagreb/01.jpg` | `02.jpg`, `03.jpg` |
| 08 | Ljubljana | Slovenia | Feature | Landscape 3:2 | `images/travel/europareise-4/ljubljana/01.jpg` | `02.jpg`, `03.jpg` |
| 09 | Postojna-Höhle | Slovenia | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-4/postojna-hoehle/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 10 | Bled | Slovenia | Split | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-4/bled/01.jpg` | `02.jpg`, `03.jpg` |
| 11 | Opatija | Croatia | Split + detail | Landscape 3:2 or portrait 4:5 | `images/travel/europareise-4/opatija/01.jpg` | `02.jpg` (4:3 detail), `03.jpg` |
| 12 | Medulin | Croatia | Feature | Landscape 3:2 | `images/travel/europareise-4/medulin/01.jpg` | `02.jpg`, `03.jpg` |
| 13 | Pula | Croatia | Trio | Landscape 3:2 | `images/travel/europareise-4/pula/01.jpg` | `02.jpg`, `03.jpg` |
| 14 | Fažana | Croatia | Trio | Portrait 3:4 | `images/travel/europareise-4/fazana/01.jpg` | `02.jpg`, `03.jpg` |
| 15 | Rovinj | Croatia | Trio | Portrait 4:5 | `images/travel/europareise-4/rovinj/01.jpg` | `02.jpg`, `03.jpg` |
| 16 | Trento | Italy | Feature | Landscape 3:2 | `images/travel/europareise-4/trento/01.jpg` | `02.jpg`, `03.jpg` |

## How the layout labels work

- **Feature** — full-width cinematic image. Give it your strongest landscape; it is a visual anchor of the journey.
- **Split** — image beside text. A landscape 3:2 or a portrait 4:5 both work. `Split + detail` can show a second 4:3 image on the page.
- **Pair / Trio** — two or three places side by side. The first slot prefers landscape, the middle one portrait; each place still needs only one photo.
- **Quiet list** — a small 4:5 thumbnail beside the place name. A portrait crop works best.

The layout labels reflect the current order in `content/trips.js`. If you reorder or add stops, the site recomposes the rhythm automatically; the one-photo-per-place rule stays the same.

No personal captions, dates or descriptions are invented here. Add those in `content/trips.js` when you have them.
