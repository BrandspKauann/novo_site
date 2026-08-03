import { cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateSitemap } from "./generate-sitemap.mjs";
import { generateStaticContent } from "./generate-static-content.mjs";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const siteDir = path.join(rootDir, "site");
const distDir = path.join(rootDir, "dist");

await generateStaticContent();
await generateSitemap();

await rm(distDir, { recursive: true, force: true });
await cp(siteDir, distDir, { recursive: true });

console.log(`Static site copied to ${distDir}`);
