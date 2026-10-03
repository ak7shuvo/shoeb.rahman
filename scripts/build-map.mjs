// Dev-only: regenerates lib/map.ts data. Run in a scratch folder with `npm i world-atlas topojson-client d3-geo`.
import fs from "node:fs";
import { feature } from "topojson-client";
import { geoMercator, geoPath } from "d3-geo";
const topo = JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-50m.json","utf8"));
const all = feature(topo, topo.objects.countries);
const bd = all.features.find(f=>f.id==="050");
const neighbours = all.features.filter(f=>["356","104","524","064"].includes(f.id)); // India, Myanmar, Nepal, Bhutan
const W=420,H=520;
const proj = geoMercator().fitExtent([[24,16],[W-24,H-46]], bd).clipExtent([[0,0],[W,H]]);
const path = geoPath(proj).digits(1);
const pts = {
  dhaka:[90.3995,23.7340], cht:[92.18,22.65], sundarbans:[89.18,21.95], stmartin:[92.3240,20.6270], saturia:[90.03,23.92], bogura:[89.37,24.85]
};
const out={W,H,bd:path(bd),neighbours:neighbours.map(n=>path(n)).join(" "),points:Object.fromEntries(Object.entries(pts).map(([k,v])=>[k,proj(v).map(x=>+x.toFixed(1))]))};
// graticule-ish lat lines
out.lat=[21,22,23,24,25,26].map(l=>({l,y:+proj([90,l])[1].toFixed(1)}));
out.lon=[89,90,91,92].map(l=>({l,x:+proj([l,23])[0].toFixed(1)}));
fs.writeFileSync("map.json",JSON.stringify(out));
console.log(out.bd.length, out.neighbours.length, out.points, out.lat, out.lon);
