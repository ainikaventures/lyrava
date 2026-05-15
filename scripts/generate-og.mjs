/**
 * Render the brand OG card from SVG → PNG at 2x and 1x.
 * Run after any update to lyrava-brand-assets/lyrava-og.svg or twitter.svg.
 *
 * Usage: node scripts/generate-og.mjs
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ASSETS = resolve(ROOT, "lyrava-brand-assets");
const OUT = resolve(ROOT, "public/brand");

async function render(svgPath, outPath, w, h) {
  const svg = readFileSync(svgPath);
  await sharp(svg, { density: 300 })
    .resize(w, h, { fit: "contain", background: { r: 0x1a, g: 0x0e, b: 0x2c, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`✓ ${outPath} (${w}×${h})`);
}

await render(resolve(ASSETS, "lyrava-og.svg"), resolve(OUT, "lyrava-og.png"), 1200, 630);
await render(resolve(ASSETS, "lyrava-twitter.svg"), resolve(OUT, "lyrava-twitter.png"), 1200, 600);

console.log("\nDone — re-run after editing the brand SVGs.");
