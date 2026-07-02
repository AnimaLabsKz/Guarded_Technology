import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");
const indexFile = resolve(distDir, "index.html");
const notFoundFile = resolve(distDir, "404.html");

if (!existsSync(indexFile)) {
  throw new Error(`Expected built entrypoint at ${indexFile}`);
}

copyFileSync(indexFile, notFoundFile);
console.log("Prepared GitHub Pages SPA fallback at dist/404.html");
