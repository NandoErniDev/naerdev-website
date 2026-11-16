/* ====================================================================
   TRAVEL JOURNAL  -  every trip and every place lives in this one file.

   DRAFT COPY
   The introductions, closings and place notes below are first drafts written
   for review. Replace them with your own memories before publishing.

   THE STORY OF A TRIP
   A trip page is a scroll story. It follows the order of the "stops" list
   below, top to bottom, exactly as you travelled. For every place:
   its name, a country flag, an optional short text and its photographs.
   When the country changes, a large flag introduces the next country.
   To change the order of the story, move the lines in "stops".

   WHERE THE PHOTOGRAPHS GO
     images/travel/<trip id>/cover.jpg             cover photograph of the trip
     images/travel/<trip id>/<place folder>/*.jpg  all photographs of one place
   A place without photographs (and without text) is only listed in the route.

   ADD PHOTOGRAPHS TO A PLACE
     1. Copy the files into its folder, e.g. images/travel/europareise-1/colmar/
     2. Run:  node tools/scan-photos.js   (finds them automatically)
        or list them yourself, see "photos" below.

   ADD A NEW TRIP
     Copy a whole trip block to the end of the list. Change id (= its folder
     name in images/travel/), title and the stops. Create the folders.
   The list order is the website order (first = top).

   TRIP FIELDS (all optional except id and title)
     id           Folder name inside images/travel/
     title        Name of the trip
     year         Year, e.g. "2024" (shown in the hero and the facts)
     duration     Approximate length, e.g. "3 weeks"
     dates        Free text, e.g. "12 July – 3 August 2024" (optional)
     description  One sentence for the journal index
     intro        2–4 personal sentences at the top of the journey
     closing      Optional last line of the story
     countryNotes Optional line per country: { BE: "..." }
     destination  Optional. Normally empty: the countries are taken from the stops
     cover        Cover file name (default "cover.jpg")
     coverAlt     Describes the cover for screen readers
     coverFocus   Part of the cover that stays visible when cropped, e.g. "50% 30%"
     stops        The places, see below
     hidden       true = keep the trip off the website for now

   STOP FIELDS
     name         Name of the place (the heading)
     country      Two-letter country code: CH DE FR IT ES AT NL BE LU PL CZ SK HU
                  HR SI MC AD PT GB IE DK SE NO ... (the flag is added automatically).
                  Left out = same country as the previous place.
     folder       Folder inside the trip folder, e.g. "colmar"
     note         Optional short memory about the place (one or two sentences)
     date         Optional, e.g. "3 July" — shown beside the place name
     layout       Optional override: "feature" or "split" for a bigger moment.
                  Normally leave empty: the journey mixes the layouts by itself.
     photos       Optional. Leave out to use the folder scan. Or list them:
                  "photo-01.jpg"
                  { file: "photo-02.jpg", caption: "...", alt: "...",
                    location: "...", orientation: "portrait" }
     captions     Optional shortcut: { "photo-03.jpg": "Caption text" }
   ==================================================================== */

window.TRIPS = [
  {
    id: "europareise-1",
    title: "Europareise 1",
    year: "2024",
    duration: "2 months",
    dates: "Summer 2024",
    description: "A summer loop from Alsace through Luxembourg, Belgium and the Netherlands to the German North Sea.",
    intro: "In the summer of 2024 I travelled north from Alsace into Luxembourg and Belgium, then followed the coast and the Dutch canals up to the German North Sea. It was a trip of short hops, old towns and long evenings, with the route loosely planned and room to change my mind. What stayed with me was how quickly the light, the language and the architecture shifted, and how easily each place became familiar.",
    closing: "Some trips are measured in miles; this one is measured in the places I still think about.",
    cover: "cover.jpg",
    coverAlt: "",
    coverFocus: "50% 50%",
    stops: [
      { name: "Colmar",             country: "FR", folder: "colmar", note: "Half-timbered houses, canals and the feeling that the trip had properly begun." },
      { name: "Luxemburg",          country: "LU", folder: "luxemburg", note: "A city of bridges and steep valleys; I walked the ramparts until the light went soft." },
      { name: "Brüssel",            country: "BE", folder: "bruessel", note: "Grand squares, chocolate shops and a city that felt more layered than I expected." },
      { name: "Antwerpen",          country: "BE", folder: "antwerpen", note: "The station alone was worth the stop; beyond it, wide streets and a slow afternoon by the river." },
      { name: "Gent",               country: "BE", folder: "gent", note: "Canals, brick and bicycles — the kind of city that rewards wandering without a plan." },
      { name: "Brügge",             country: "BE", folder: "bruegge", note: "Beautiful and busy, but early in the morning the canals still felt like a secret." },
      { name: "Oostende",           country: "BE", folder: "oostende", note: "Wind off the North Sea, a long promenade and chips eaten while walking." },
      { name: "De Panne",           country: "BE", folder: "de-panne", note: "Dunes, wide sand and a horizon that made the coast feel much further away." },
      { name: "Dinant",             country: "BE", folder: "dinant", note: "The river, the cliffs and the saxophone shops — a small town with a dramatic setting." },
      { name: "Pairi Daiza",        country: "BE", folder: "pairi-daiza", note: "A garden as much as a zoo; I remember the quiet paths and the strange, beautiful plants." },
      { name: "Amsterdam",          country: "NL", folder: "amsterdam", note: "Bicycles everywhere, canal light and the pleasure of getting slightly lost." },
      { name: "Zaanse Schans",      country: "NL", folder: "zaanse-schans", note: "Windmills, green houses and the smell of wood and water." },
      { name: "Alkmaar",            country: "NL", folder: "alkmaar", note: "A market town with a lived-in centre and far fewer crowds than I expected." },
      { name: "Volendam",           country: "NL", folder: "volendam", note: "A harbour village that felt like a postcard, especially in the evening." },
      { name: "Marken",             country: "NL", folder: "marken", note: "Small houses, narrow lanes and the water always close by." },
      { name: "Utrecht",            country: "NL", folder: "utrecht", note: "Canals below street level, cafés along the wharf and a very easy afternoon." },
      { name: "Gouda",              country: "NL", folder: "gouda", note: "Cheese, stained glass and a square that felt made for sitting still." },
      { name: "Rotterdam",          country: "NL", folder: "rotterdam", note: "Modern, bold and full of surprises after the older Dutch towns." },
      { name: "Kinderdijk",         country: "NL", folder: "kinderdijk", note: "Windmills in a line across the water; the flatness made the sky enormous." },
      { name: "Norddeutschland",    country: "DE", folder: "norddeutschland", note: "A wide, quiet landscape of fields and wind, with the sea never far away." },
      { name: "Cuxhaven",           country: "DE", folder: "cuxhaven", note: "Mudflats, cold air and a walk that felt like the edge of the country." },
      { name: "Bremerhaven",        country: "DE", folder: "bremerhaven", note: "Harbour cranes, big skies and a sense of the North Sea as a working place." },
      { name: "Hamburg",            country: "DE", folder: "hamburg", note: "A big city with a maritime heart; the harbour at dusk was the highlight." },
      { name: "Lüneburg",           country: "DE", folder: "lueneburg", note: "Brick Gothic, salt history and a pretty centre that felt unhurried." },
      { name: "Lüneburger Heide",   country: "DE", folder: "lueneburger-heide", note: "Purple heather, sandy paths and a silence that was hard to find elsewhere." },
      { name: "Heidelberg",         country: "DE", folder: "heidelberg", note: "The castle above the river, the old town below and a last evening that felt like a proper ending." }
    ]
  },
  {
    id: "europareise-2",
    title: "Europareise 2",
    year: "2025",
    duration: "2 months",
    dates: "Summer 2025",
    description: "From the Italian Alps to the Ligurian coast, across Provence and the Camargue to Spain and Andorra.",
    intro: "In the summer of 2025 I followed the Alps down to the Ligurian coast, then crossed into France and kept moving west through Provence, the Camargue and the Spanish border. The days were long and warm, and the trip moved between mountains, sea and stone villages. I remember the heat, the colours and the way every region had its own rhythm.",
    closing: "The south has a way of slowing you down. I came home with more light than I left with.",
    cover: "cover.jpg",
    coverAlt: "",
    coverFocus: "50% 50%",
    stops: [
      { name: "Aosta",                country: "IT", folder: "aosta", note: "Mountains on every side and a compact Roman centre; a good first taste of the Alps." },
      { name: "Turin",                country: "IT", folder: "turin", note: "Elegant arcades, wide squares and a coffee culture I happily sank into." },
      { name: "Alassio",              country: "IT", folder: "alassio", note: "The Ligurian sea, a long beach and the first real heat of the trip." },
      { name: "Sanremo",              country: "IT", folder: "sanremo", note: "Palms, faded glamour and a promenade made for an evening walk." },
      { name: "Ventimiglia",          country: "IT", folder: "ventimiglia", note: "A border town with a busy market and the feeling of one country becoming another." },
      { name: "Monaco",               country: "MC", folder: "monaco", note: "Harbour, hills and a level of polish that was fascinating for an afternoon." },
      { name: "Nizza",                country: "FR", folder: "nizza", note: "The Promenade des Anglais at sunset, with the sea turning from blue to silver." },
      { name: "Antibes",              country: "FR", folder: "antibes", note: "Old walls, small beaches and a harbour that felt relaxed after Nice." },
      { name: "Cannes",               country: "FR", folder: "cannes", note: "The film festival glamour was quiet in the daytime; I liked the backstreets more." },
      { name: "Grasse",               country: "FR", folder: "grasse", note: "Perfume workshops, steep lanes and air that really did smell of flowers." },
      { name: "Menton",               country: "FR", folder: "menton", note: "Lemon trees, pastel houses and a border town with a gentle pace." },
      { name: "Valensole",            country: "FR", folder: "valensole", note: "Lavender fields to the horizon and a heat that made the colours feel unreal." },
      { name: "Gorges du Verdon",     country: "FR", folder: "gorges-du-verdon", note: "Turquoise water far below, white rock and a road that kept opening onto another view." },
      { name: "Abbaye de Sénanque",   country: "FR", folder: "abbaye-de-senanque", note: "Stone, silence and lavender; the abbey felt like a place outside of time." },
      { name: "Provence",             country: "FR", folder: "provence", note: "Slow villages, markets and long lunches — the part of the trip I slowed down for." },
      { name: "Arles",                country: "FR", folder: "arles", note: "Roman stones, yellow houses and a sense of history in the everyday streets." },
      { name: "Camargue",             country: "FR", folder: "camargue", note: "Flooded fields, birds and horses; a landscape that felt completely different from the coast." },
      { name: "Nîmes",                country: "FR", folder: "nimes", note: "The arena and the old streets made the Roman past feel very present." },
      { name: "Avignon",              country: "FR", folder: "avignon", note: "The palace, the bridge and a city that seemed to hold the whole south in one place." },
      { name: "Carcassonne",          country: "FR", folder: "carcassonne", note: "The walled city at dusk, with the crowds gone and the stones turning gold." },
      { name: "Barcelona",            country: "ES", folder: "barcelona", note: "Gaudí, the sea and a city that stays awake much longer than I did." },
      { name: "Girona",               country: "ES", folder: "girona", note: "The old quarter, the river and a quieter Catalonia that I liked immediately." },
      { name: "Besalú",               country: "ES", folder: "besalu", note: "A stone bridge, a small square and a village that felt almost untouched." },
      { name: "Costa Brava",          country: "ES", folder: "costa-brava", note: "Coves, pine trees and water so clear it looked artificial." },
      { name: "Lloret de Mar",        country: "ES", folder: "lloret-de-mar", note: "Busy and bright, but the coast beyond the town was still beautiful." },
      { name: "Andorra",              country: "AD", folder: "andorra", note: "Mountains, duty-free shops and a strange, compact country in between." },
      { name: "Annecy",               country: "FR", folder: "annecy", note: "The lake, the canals and a walk that made me want to stay longer." },
      { name: "Le Puy-en-Velay",      country: "FR", folder: "le-puy-en-velay", note: "Volcanic hills, a chapel on a rock and a last quiet evening in France." }
    ]
  },
  {
    id: "europareise-3",
    title: "Europareise 3",
    year: "2026",
    duration: "2.5 weeks",
    dates: "February 2026",
    description: "A winter journey through the Czech spa towns, Saxon Switzerland, Berlin and Poland.",
    intro: "In February 2026 I went east through the Czech spa towns, Saxon Switzerland and Berlin, then into Poland and back west through Potsdam, Würzburg and Rothenburg. It was a winter trip: short days, cold air and quiet streets, with long meals and early nights. The contrast between the baroque towns and Berlin's scale is what I remember most.",
    closing: "Winter made everything quieter, and somehow more memorable.",
    cover: "cover.jpg",
    coverAlt: "",
    coverFocus: "50% 50%",
    stops: [
      { name: "Karlovy Vary",               country: "CZ", folder: "karlovy-vary", note: "Colonnades, hot springs and a winter morning that felt almost theatrical." },
      { name: "Františkovy Lázně",          country: "CZ", folder: "frantiskovy-lazne", note: "Small, elegant spa streets and a silence that suited the season." },
      { name: "Sächsische Schweiz",         country: "DE", folder: "saechsische-schweiz", note: "Sandstone towers, frost on the paths and views that made the cold worthwhile." },
      { name: "Berlin",                     country: "DE", folder: "berlin", note: "A city of layers; I walked for hours and still felt I had only scratched the surface." },
      { name: "Lübbenau",                   country: "DE", folder: "luebbenau", note: "The Spreewald begins here — canals, small bridges and a slower rhythm." },
      { name: "Spreewald",                  country: "DE", folder: "spreewald", note: "Flat water, reeds and a boat ride that felt miles away from Berlin." },
      { name: "Grenzmarkt",                 country: "PL", folder: "grenzmarkt", note: "A border market, pragmatic and busy, with the strange energy of two countries meeting." },
      { name: "Potsdam",                    country: "DE", folder: "potsdam", note: "Parks, palaces and a winter walk that was more about the light than the buildings." },
      { name: "Würzburg",                   country: "DE", folder: "wuerzburg", note: "The Residenz, the river and a cold, clear evening in Franconia." },
      { name: "Rothenburg ob der Tauber",   country: "DE", folder: "rothenburg-ob-der-tauber", note: "The walls, the towers and a town that looks almost too perfect in winter." }
    ]
  },
  {
    id: "europareise-4",
    title: "Europareise 4",
    year: "2026",
    duration: "6 weeks",
    dates: "Summer 2026",
    description: "A summer route from Salzburg through Slovakia, Hungary, Croatia and Slovenia to northern Italy.",
    intro: "In the summer of 2026 I started in Salzburg and followed the Danube and the Adriatic south, looping through Slovakia, Hungary, Croatia and Slovenia before ending in northern Italy. It was a trip of lakes, old centres and long coastal evenings. The light on the water and the sudden change from city to landscape stayed with me.",
    closing: "I ended in the mountains, already planning the next road south.",
    cover: "cover.jpg",
    coverAlt: "",
    coverFocus: "50% 50%",
    stops: [
      { name: "Salzburg",         country: "AT", folder: "salzburg", note: "The river, the fortress and a first evening that felt like the start of summer." },
      { name: "Linz",             country: "AT", folder: "linz", note: "A compact centre, the Danube and a surprisingly lively arts scene." },
      { name: "Chiemsee",         country: "DE", folder: "chiemsee", note: "The lake, the islands and a boat ride with the mountains still in view." },
      { name: "Bratislava",       country: "SK", folder: "bratislava", note: "A small capital with a big castle and a relaxed old town." },
      { name: "Győr",             country: "HU", folder: "gyor", note: "Baroque streets, quiet squares and a pause between bigger places." },
      { name: "Balaton",          country: "HU", folder: "balaton", note: "Warm shallow water, long evenings and the feeling of a proper summer holiday." },
      { name: "Zagreb",           country: "HR", folder: "zagreb", note: "Coffee culture, green markets and a city that felt easy to settle into." },
      { name: "Ljubljana",        country: "SI", folder: "ljubljana", note: "The river, the bridges and a centre that felt designed for walking." },
      { name: "Postojna-Höhle",   country: "SI", folder: "postojna-hoehle", note: "The cave was vast and strange; the scale is impossible to photograph properly." },
      { name: "Bled",             country: "SI", folder: "bled", note: "The island, the water and the castle above — a place that earns its postcard." },
      { name: "Opatija",          country: "HR", folder: "opatija", note: "Austro-Hungarian villas, a seaside promenade and a very civilised afternoon." },
      { name: "Medulin",          country: "HR", folder: "medulin", note: "A small harbour, clear water and the smell of pine and salt." },
      { name: "Pula",             country: "HR", folder: "pula", note: "The Roman arena in the middle of town, still used and still impressive." },
      { name: "Fažana",           country: "HR", folder: "fazana", note: "A fishing village pace, with boats and the sea just across the road." },
      { name: "Rovinj",           country: "HR", folder: "rovinj", note: "Narrow lanes, a church on the hill and the Adriatic all around." },
      { name: "Trento",           country: "IT", folder: "trento", note: "Mountains, a handsome centre and a last stop that felt like a gateway back home." }
    ]
  }
];
