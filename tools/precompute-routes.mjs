#!/usr/bin/env node
/* Précalcule les tracés à pied entre les stations (OpenRouteService) et les écrit dans index.html,
   entre les repères « // ROUTES:START » et « // ROUTES:END ».

   La clé n'est lue que dans la variable d'environnement ORS_API_KEY : elle n'est écrite nulle
   part (ni fichier, ni journal, ni URL : elle passe par l'en-tête Authorization).

   Usage :
     ORS_API_KEY=... node tools/precompute-routes.mjs            calcule et écrit dans index.html
     ORS_API_KEY=... node tools/precompute-routes.mjs --dry-run  calcule et affiche, sans écrire
     node tools/precompute-routes.mjs --check                    vérifie que les tracés sont présents (sans clé)

   Après l'exécution : relire « git diff » (un seul bloc doit changer), tester, puis commiter. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HTML = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
const ORS_URL = 'https://api.openrouteservice.org/v2/directions/foot-walking/geojson';
const START = '// ROUTES:START';
const END = '// ROUTES:END';

/* ── Fonctions pures (testées hors ligne) ─────────────────────────────── */
export function parseStations(html) {
  const num = '(-?\\d+\\.\\d+)';
  const pair = `\\[\\s*${num}\\s*,\\s*${num}\\s*\\]`;
  const coordsBlock = html.match(/const ENIGMA_COORDS = \[([\s\S]*?)\n\];/);
  if (!coordsBlock) throw new Error('ENIGMA_COORDS introuvable dans index.html');
  const coords = [...coordsBlock[1].matchAll(new RegExp(pair, 'g'))].map(m => [+m[1], +m[2]]);
  const endBlock = html.match(/const ENIGMA_END_COORDS = \{([\s\S]*?)\};/);
  const ends = {};
  if (endBlock) for (const m of endBlock[1].matchAll(new RegExp(`(\\d+)\\s*:\\s*${pair}`, 'g'))) ends[m[1]] = [+m[2], +m[3]];
  return { coords, ends };
}

/* Étapes à calculer : legs[i] = (fin de i-1 ou i-1) vers i ; segments[i] = début vers fin du tronçon. */
export function planLegs({ coords, ends }) {
  const legs = [], segments = [];
  for (let i = 1; i < coords.length; i++) legs.push({ key: String(i), from: ends[i - 1] || coords[i - 1], to: coords[i] });
  for (const k of Object.keys(ends)) segments.push({ key: k, from: coords[+k], to: ends[k] });
  return { legs, segments };
}

const toRad = d => d * Math.PI / 180;
export function haversineM(a, b) {
  const x = Math.sin(toRad(b[0] - a[0]) / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(toRad(b[1] - a[1]) / 2) ** 2;
  return 2 * 6371000 * Math.asin(Math.sqrt(x));
}
export function lengthM(pts) { let m = 0; for (let i = 1; i < pts.length; i++) m += haversineM(pts[i - 1], pts[i]); return m; }

/* Douglas-Peucker en mètres, pour garder des tracés légers. */
export function simplify(pts, tolM = 1.5) {
  if (pts.length < 3) return pts.slice();
  const lat0 = pts[0][0], kx = Math.cos(toRad(lat0)) * 111320, ky = 110540;
  const P = pts.map(p => [p[1] * kx, p[0] * ky]);
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let dmax = 0, idx = -1;
    const [ax, ay] = P[a], [bx, by] = P[b], dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy;
    for (let i = a + 1; i < b; i++) {
      let t = L2 ? ((P[i][0] - ax) * dx + (P[i][1] - ay) * dy) / L2 : 0; t = Math.max(0, Math.min(1, t));
      const d = Math.hypot(P[i][0] - (ax + t * dx), P[i][1] - (ay + t * dy));
      if (d > dmax) { dmax = d; idx = i; }
    }
    if (dmax > tolM) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

const r6 = n => Math.round(n * 1e6) / 1e6;
export function renderBlock({ legs, segments }) {
  const fmt = pts => '[' + pts.map(p => `[${r6(p[0])},${r6(p[1])}]`).join(',') + ']';
  const obj = o => '{\n' + Object.entries(o).map(([k, v]) => `    "${k}": ${fmt(v)}`).join(',\n') + '\n  }';
  return `${START} (généré par tools/precompute-routes.mjs, ne pas modifier à la main)\nconst PRECOMPUTED_ROUTES = {\n  legs: ${obj(legs)},\n  segments: ${obj(segments)}\n};\n${END}`;
}

export function injectBlock(html, block) {
  const a = html.indexOf(START), b = html.indexOf(END);
  if (a < 0 || b < 0 || b < a) throw new Error('repères ROUTES:START / ROUTES:END introuvables dans index.html');
  return html.slice(0, a) + block + html.slice(b + END.length);
}

export function hasRoutes(html) {
  const a = html.indexOf(START), b = html.indexOf(END);
  if (a < 0 || b < 0) return { ok: false, why: 'repères introuvables' };
  const block = html.slice(a, b);
  const stations = parseStations(html);
  const plan = planLegs(stations);
  const missing = [...plan.legs.map(l => 'legs.' + l.key), ...plan.segments.map(s => 'segments.' + s.key)].filter(k => !new RegExp(`"${k.split('.')[1]}":\\s*\\[\\[`).test(block));
  return missing.length ? { ok: false, why: 'tracés manquants : ' + missing.join(', ') } : { ok: true };
}

/* ── Appel OpenRouteService (clé dans l'en-tête, jamais dans l'URL) ───── */
async function fetchRoute(from, to, key) {
  const res = await fetch(ORS_URL, {
    method: 'POST',
    headers: { 'Authorization': key, 'Content-Type': 'application/json', 'Accept': 'application/geo+json' },
    body: JSON.stringify({ coordinates: [[from[1], from[0]], [to[1], to[0]]] })
  });
  if (!res.ok) throw new Error(`OpenRouteService a répondu ${res.status} ${res.statusText}`);
  const data = await res.json();
  const line = data && data.features && data.features[0] && data.features[0].geometry && data.features[0].geometry.coordinates;
  if (!line || line.length < 2) throw new Error('réponse sans tracé');
  return line.map(c => [c[1], c[0]]);
}

async function main() {
  const args = process.argv.slice(2);
  const html = fs.readFileSync(HTML, 'utf8');
  if (args.includes('--check')) {
    const r = hasRoutes(html);
    console.log(r.ok ? 'Tracés présents pour toutes les étapes.' : 'Tracés incomplets : ' + r.why);
    process.exit(r.ok ? 0 : 1);
  }
  const key = process.env.ORS_API_KEY;
  if (!key) { console.error('ORS_API_KEY n\'est pas définie. Exemple : ORS_API_KEY=... node tools/precompute-routes.mjs'); process.exit(2); }
  const plan = planLegs(parseStations(html));
  const out = { legs: {}, segments: {} };
  const rows = [];
  for (const [kind, list] of [['legs', plan.legs], ['segments', plan.segments]]) {
    for (const st of list) {
      let route;
      try { route = simplify(await fetchRoute(st.from, st.to, key)); }
      catch (e) { console.error(`Echec ${kind}.${st.key} : ${e.message}`); process.exit(3); }
      out[kind][st.key] = route;
      const m = lengthM(route);
      rows.push(`${kind === 'legs' ? 'trajet vers la station ' + (+st.key + 1) : 'tronçon de la station ' + (+st.key + 1)}\t${route.length} points\t${Math.round(m)} m\t(arrondi : ${Math.round(m / 10) * 10} m)`);
      await new Promise(r => setTimeout(r, 1600)); // reste sous la limite de 40 requêtes par minute
    }
  }
  console.log(rows.join('\n'));
  if (args.includes('--dry-run')) { console.log('\n--dry-run : index.html non modifié.'); return; }
  fs.writeFileSync(HTML, injectBlock(html, renderBlock(out)));
  console.log('\nindex.html mis à jour entre ROUTES:START et ROUTES:END. Vérifie avec « git diff --stat » puis teste.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
