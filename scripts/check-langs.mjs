// Vérifie que tous les fichiers de langue ont exactement les mêmes clés que lang-en.js.
// Utilisé par le workflow CI ; exécutable localement : node scripts/check-langs.mjs
import { readdirSync } from "node:fs";

const distUrl = new URL("../dist/", import.meta.url);

const langFiles = readdirSync(distUrl).filter((f) => /^lang-[a-z]{2}\.js$/.test(f));

const keysOf = (mod) =>
  new Set(
    Object.entries(mod).flatMap(([section, entries]) =>
      Object.keys(entries).map((k) => `${section}.${k}`)
    )
  );

const ref = keysOf((await import(new URL("lang-en.js", distUrl))).default);

let failed = false;

for (const file of langFiles.sort()) {
  const keys = keysOf((await import(new URL(file, distUrl))).default);
  const missing = [...ref].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !ref.has(k));

  if (missing.length || extra.length) {
    failed = true;
    console.error(`${file}:`);
    for (const k of missing) console.error(`  missing: ${k}`);
    for (const k of extra) console.error(`  extra:   ${k}`);
  }
}

if (failed) {
  console.error("\nLanguage files out of sync with lang-en.js");
  process.exit(1);
}

console.log(`${langFiles.length} language files in sync (${ref.size} keys).`);
