# Bildliste für naerdev.ch

Diese Liste sagt genau, welche Bilder die Website erwartet und wo sie hingehören.
Die Ordner sind bereits angelegt. Fehlende Dateien werden im Moment als gestaltete
Platzhalter angezeigt, nicht als kaputte Bilder.

## Kurzfassung

| Bereich | Minimum | Empfohlen |
|---|---:|---:|
| Reise-Cover | 4 | 4 |
| Reise-Orte (1–2 Fotos pro Ort) | 80 | 160 |
| Projekte (Cover + 3 Screens) | 20 | 20 |
| Hobbies | 6 | 6 |
| **Total** | **110** | **190** |

- **110 Dateien** = jeder Platzhalter ist ersetzt.
- **190 Dateien** = jedes Reiseziel hat zwei Fotos (Landschaft + Porträt/Detail).
- **Priorität 1: 15 Dateien** = die vier Reise-Cover, fünf Projekt-Cover und sechs
  Hobby-Fotos. Das verändert das Erscheinungsbild am stärksten.

## Priorität 1 — die 15 wichtigsten Bilder

### Reise-Cover (4)

```text
images/travel/europareise-1/cover.jpg
images/travel/europareise-2/cover.jpg
images/travel/europareise-3/cover.jpg
images/travel/europareise-4/cover.jpg
```

Querformat, am besten 3:2 oder 16:9, ca. 3000 px breit. Das Motiv sollte auch
stark beschnitten noch funktionieren, weil es im Reise-Index und auf der
Reise-Seite unterschiedlich beschnitten wird.

### Projekt-Cover (5)

```text
images/projects/budget-app/cover.jpg
images/projects/signbridge/cover.jpg
images/projects/lernpfad/cover.jpg
images/projects/this-website/cover.jpg
images/projects/demo-website/cover.jpg
```

Querformat **16:10**, zum Beispiel 2400 × 1500 px. Das ist das große Bild oben
auf der Projektseite und auf der Startseite.

### Hobby-Fotos (6)

```text
images/hobbies/jugendmusik.jpg
images/hobbies/saxophon.jpg
images/hobbies/photography-1.jpg
images/hobbies/photography-2.jpg
images/hobbies/training.jpg
images/hobbies/lucerne.jpg
```

Querformat **4:3**, ca. 2000 px lange Kante.

- `jugendmusik.jpg` — Nando mit der Jugendmusik, Probe, Konzert oder Gruppe.
- `saxophon.jpg` — Nando mit dem Saxophon, gerne auch ein Detail oder eine
  Aufnahme beim Spielen.
- `photography-1.jpg` und `photography-2.jpg` — zwei Lieblingsbilder von Reisen
  oder aus dem Alltag.
- `training.jpg` — Training, Sport oder draußen unterwegs.
- `lucerne.jpg` — Luzern, Altstadt, Kapellbrücke, KKL oder See.

## Projekte — alle 20 Dateien

Für jedes Projekt kommen ein Cover und drei Detail-Screens in den jeweiligen
Ordner:

```text
images/projects/budget-app/
  cover.jpg       16:10
  screen-01.jpg   4:3
  screen-02.jpg   4:3
  screen-03.jpg   4:3

images/projects/signbridge/
images/projects/lernpfad/
images/projects/this-website/
images/projects/demo-website/
```

Inhaltlich wären das die stärksten Motive:

| Projekt | Cover | Screens 01–03 |
|---|---|---|
| `budget-app` | Tagesbudget-Gauge | Ausgabenliste, Add-Formular, leerer Zustand |
| `signbridge` | Kamera-/Hand-Tracking | Buchstabe, Punktestand, Erklärung |
| `lernpfad` | Lektion oder Fortschritt | Lektion, Checkliste, Fortschrittsansicht |
| `this-website` | Startseite | Projektseite, Travel-Scrollytelling, Kontakt |
| `demo-website` | Maler-Startseite | Galerie, Über-Seite, Kontakt |

Bitte keine echten Kontodaten, Namen oder privaten Nachrichten in den
Screenshots. Demo-Daten reichen völlig.

## Reisen — 80 Orte

Pro Ort reicht **ein gutes Foto**. Ein zweites Foto ist optional und wird im
großen Bildbetrachter und in Split-Layouts verwendet.

```text
images/travel/<reise>/<ort>/01.jpg
images/travel/<reise>/<ort>/02.jpg   (optional)
```

- `europareise-1` — 26 Orte: Colmar, Luxemburg, Brüssel, Antwerpen, Gent,
  Brügge, Oostende, De Panne, Dinant, Pairi Daiza, Amsterdam, Zaanse Schans,
  Alkmaar, Volendam, Marken, Utrecht, Gouda, Rotterdam, Kinderdijk,
  Norddeutschland, Cuxhaven, Bremerhaven, Hamburg, Lüneburg,
  Lüneburger Heide, Heidelberg.
- `europareise-2` — 28 Orte: Aosta, Turin, Alassio, Sanremo, Ventimiglia,
  Monaco, Nizza, Antibes, Cannes, Grasse, Menton, Valensole,
  Gorges du Verdon, Abbaye de Sénanque, Provence, Arles, Camargue, Nîmes,
  Avignon, Carcassonne, Barcelona, Girona, Besalú, Costa Brava,
  Lloret de Mar, Andorra, Annecy, Le Puy-en-Velay.
- `europareise-3` — 10 Orte: Karlovy Vary, Františkovy Lázně,
  Sächsische Schweiz, Berlin, Lübbenau, Spreewald, Grenzmarkt, Potsdam,
  Würzburg, Rothenburg ob der Tauber.
- `europareise-4` — 16 Orte: Salzburg, Linz, Chiemsee, Bratislava, Győr,
  Balaton, Zagreb, Ljubljana, Postojna-Höhle, Bled, Opatija, Medulin,
  Pula, Fažana, Rovinj, Trento.

Die exakte Tabelle mit **jedem Ordnerpfad**, empfohlenem Bildformat und
Layout findet sich in [`PHOTO-LIST.md`](PHOTO-LIST.md). Die Ordnernamen sind
kleingeschrieben und ohne Umlaute, zum Beispiel `bruessel`, `bruegge`,
`nimes`, `gyor` und `fazana`.

Nach dem Kopieren im Ordner `site` ausführen:

```bash
node tools/scan-photos.js
```

Das Skript findet die Dateien, erkennt Hoch- und Querformat und aktualisiert
`content/photo-index.js`.

## Formate und Größen

| Bildtyp | Format | Größe | Hinweis |
|---|---|---|---|
| Reise-Cover | JPG | 3000 px breit, 3:2 oder 16:9 | Motiv nicht an den Rand legen |
| Reise-Ort | JPG | ca. 2400 px lange Kante | Hoch- oder Querformat beides okay |
| Projekt-Cover | JPG/PNG | 2400 × 1500 px (16:10) | UI-Screenshot, kein Geräterahmen nötig |
| Projekt-Screen | JPG/PNG | 1600 × 1200 px (4:3) | klare, lesbare UI |
| Hobby | JPG | ca. 2000 px lange Kante (4:3) | natürliches Licht wirkt am besten |

- Qualität ca. 75–82 %, sRGB, ca. 300–600 KB pro Bild.
- iPhone-HEIC vorher nach JPG exportieren.
- Die Website schneidet Bilder automatisch zu; wichtige Motive etwas mittiger
  platzieren.
- Für Reise-Orte sind auch andere Dateinamen möglich. `01.jpg`, `02.jpg` sind
  aber am einfachsten und ergeben eine feste Reihenfolge.

## Optional

Das Portrait auf der About-Seite existiert bereits als `images/nando.png`.
Wenn du es ersetzen willst: **4:5**, ca. 1200 × 1500 px.

Das Social-Preview-Bild ist `images/og.png` (1200 × 630 px). Es kann bleiben,
wenn du kein neues möchtest.

## So kannst du mir die Bilder geben

Am einfachsten: die Bilder in die oben genannten Ordner legen oder mir einen
Sammelordner/ZIP geben. Ich übernehme dann Benennung, Zuschnitt, Kompression,
`scan-photos.js`, die Kontrolle im Browser und den Push auf GitHub.

Wenn du zuerst nur die **15 Priorität-1-Bilder** schickst, sieht die Website
sofort deutlich fertiger aus. Die 80 Reise-Orte können danach in Ruhe folgen.
