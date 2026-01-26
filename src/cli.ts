#!/usr/bin/env node

import { readManifest } from "./manifest";
import { resolveSource } from "./resolver";
import { slice } from "./slicer";
import { log } from "./logger";
import path from "path";

async function main() {
  const forceRemote = process.argv.includes("--remote");
  const manifestPath = path.resolve(
    process.cwd(),
    "kit.manifest.json"
  );

  const manifest = await readManifest(manifestPath);
  const source = await resolveSource(manifest, {
    forceRemote
  });
  
  await slice(manifest, source);
  log.info("Kit sync complete");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
