#!/usr/bin/env node
/* Sets your domain everywhere (canonical links, social previews, sitemap, robots.txt)
   and rebuilds sitemap.xml from your trips and articles.
   Usage:   node tools/set-domain.js yourdomain.ch
   Run it again after adding trips or articles to refresh the sitemap. */
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const arg = process.argv[2];
const siteJs = path.join(root, "content", "site.js");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(siteJs, "utf8"), sandbox);
const old = sandbox.window.SITE.url.replace(/\/$/, "");
let next = old;
if (arg) next = ("https://" + arg.replace(/^https?:\/\//, "").replace(/\/$/, ""));
const files = fs.readdirSync(root).filter((f) => /\.(html|txt|xml)$/.test(f)).concat(["content/site.js"]);
if (next !== old) for (const f of files) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) continue;
  const s = fs.readFileSync(p, "utf8");
  if (s.includes(old)) fs.writeFileSync(p, s.split(old).join(next));
}
function load(f, key) { try { const sb = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(root, "content", f), "utf8"), sb); return sb.window[key] || []; } catch (e) { return []; } }
const pages = [""].concat(["about.html", "projects.html", "apple.html", "travel.html", "music.html", "journey.html", "hobbies.html", "journal.html", "contact.html"].filter((f) => fs.existsSync(path.join(root, f))));
load("trips.js", "TRIPS").filter((t) => !t.hidden).forEach((t) => pages.push("trip.html?id=" + encodeURIComponent(t.id)));
load("articles.js", "ARTICLES").filter((a) => !a.draft).forEach((a) => pages.push("journal.html?post=" + encodeURIComponent(a.slug)));
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map((p) => "  <url><loc>" + (next + "/" + p).replace(/&/g, "&amp;") + "</loc></url>").join("\n") + "\n</urlset>\n";
fs.writeFileSync(path.join(root, "sitemap.xml"), xml);
fs.writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: " + next + "/sitemap.xml\n");
console.log("Domain: " + next + "\nSitemap: " + pages.length + " pages");
