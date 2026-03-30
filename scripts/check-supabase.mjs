/**
 * Verifica se as tabelas expostas pela Data API respondem (usa .env na raiz).
 * Uso: node scripts/check-supabase.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env");
if (!fs.existsSync(envPath)) {
  console.error("Falta .env na raiz do projeto.");
  process.exit(1);
}
const raw = fs.readFileSync(envPath, "utf8");
const url = (raw.match(/^VITE_SUPABASE_URL=(.+)$/m) || [])[1]?.trim();
const key = (raw.match(/^VITE_SUPABASE_PUBLISHABLE_KEY=(.+)$/m) || [])[1]?.trim();
if (!url || !key) {
  console.error("Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env");
  process.exit(1);
}
const base = url.replace(/\/$/, "");
const headers = { apikey: key, Authorization: `Bearer ${key}` };

// contact_leads: só INSERT para anon — GET pode falhar por RLS; confira no Table Editor.
const checks = [
  ["articles", `${base}/rest/v1/articles?select=id,site_id&limit=1`],
  ["login", `${base}/rest/v1/login?select=id&limit=1`],
];

let ok = true;
for (const [name, endpoint] of checks) {
  const res = await fetch(endpoint, { headers });
  const body = await res.text();
  let j;
  try {
    j = JSON.parse(body);
  } catch {
    j = body.slice(0, 200);
  }
  const pass = res.ok;
  if (!pass) ok = false;
  console.log(pass ? "OK  " : "FAIL", name, res.status, typeof j === "object" && j.message ? j.message : "");
}
process.exit(ok ? 0 : 1);
