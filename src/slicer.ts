import path from "path";
import fs from "fs/promises";
import { Manifest } from "./manifest";

export async function slice(
  manifest: Manifest,
  sourceRoot: string
) {
  const destRoot = path.resolve(manifest.kit.target.dir);
  const include = manifest.kit.include;

  if (!include) {
    return;
  }

  await fs.rm(destRoot, { recursive: true, force: true });
  await fs.mkdir(destRoot, { recursive: true });

  // Shared slices
  if (include.shared) {
    for (const name of include.shared) {
      await copyDir(
        path.join(sourceRoot, "shared", name),
        path.join(destRoot, "shared", name)
      );
    }
  }

  // Platform slices
  if (include.platform) {
    for (const [platform, slices] of Object.entries(include.platform)) {
      for (const slice of slices) {
        await copyDir(
          path.join(sourceRoot, platform, slice),
          path.join(destRoot, platform, slice)
        );
      }
    }
  }
}

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  await fs.cp(src, dest, { recursive: true });
}
