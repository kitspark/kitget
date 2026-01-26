import path from "path";
import fs from "fs/promises";
import { Manifest } from "./manifest";
import { cloneRepo } from "./clone";

export async function resolveSource(
  manifest: Manifest,
  opts?: { forceRemote?: boolean }
): Promise<string> {
  const { source, version } = manifest.kit;
  const forceRemote = opts?.forceRemote ?? false;

  if (source.type === "local" && source.path && !forceRemote) {
    return path.resolve(source.path);
  }

  if (source.type === "github") {
    if (!source.repo || !source.ref) {
      throw new Error("GitHub source requires repo and ref");
    }

    const tmp = path.join(".tmp-kit", "core");
    await fs.rm(tmp, { recursive: true, force: true });
    cloneRepo(source.repo, source.ref, tmp);
    return tmp;
  }

  throw new Error("Invalid kit.source configuration");
}
