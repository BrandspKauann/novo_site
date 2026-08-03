import { cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const siteDir = path.join(rootDir, "site");
const distDir = path.join(rootDir, "dist");

await import(new URL("./generate-static-content.mjs", import.meta.url));
await import(new URL("./generate-sitemap.mjs", import.meta.url));

await rm(distDir, { recursive: true, force: true });
await cp(siteDir, distDir, { recursive: true });

console.log(`Static site copied to ${distDir}`);
