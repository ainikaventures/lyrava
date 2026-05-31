/**
 * Postbuild URL aliasing.
 *
 * Why this exists: Astro's "file" output format generates services.html at
 * the dist/ root, alongside a services/ folder that holds the four detail
 * pages. When Apache's mod_dir sees a request for /services and a directory
 * with that name exists, it 301-redirects to /services/ — which then 404s
 * because the directory has no index. The fix is the simplest one: copy the
 * section index into the folder as index.html so both URLs resolve.
 *
 * Add new entries here whenever we introduce a section that has both a
 * sibling .html file AND a same-named subfolder. Right now: just /services.
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";

const DIST = resolve("dist");

const ALIASES = [
  { from: "services.html", to: "services/index.html" },
  // future: { from: "blog.html", to: "blog/index.html" } once we ship blog posts
];

let copied = 0;
for (const { from, to } of ALIASES) {
  const src = resolve(DIST, from);
  const dst = resolve(DIST, to);
  if (!existsSync(src)) {
    console.warn(`[postbuild] skip: source missing — ${from}`);
    continue;
  }
  mkdirSync(dirname(dst), { recursive: true });
  copyFileSync(src, dst);
  console.log(`[postbuild] aliased ${from} -> ${to}`);
  copied++;
}

console.log(`[postbuild] done (${copied} aliases)`);
