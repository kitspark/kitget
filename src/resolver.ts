import path from "path";
import fs from "fs/promises";
import { cloneRepo } from "./clone";
import { Manifest } from "./manifest";

export async function resolveSource(
  manifest: Manifest,
  opts?: { forceRemote?: boolean }
): Promise<string> {
  const { source, version } = manifest.kit;
  const forceRemote = opts?.forceRemote ?? false;

  // Local mode
  if (!forceRemote && source.type === "local" && source.path) {
    return path.resolve(source.path);
  }

  // Remote mode
  if (source.type === "github") {
    if (!source.repo || !source.ref) {
      throw new Error("GitHub source requires repo and ref");
    }

    const tmp = path.join(".tmp-kit", "core");
    await fs.rm(tmp, { recursive: true, force: true });
    cloneRepo(source.repo, source.ref, tmp);
    return tmp;
  }

  throw new Error(
    forceRemote
      ? "forceRemote is set but no GitHub source is configured"
      : "Invalid kit.source configuration"
  );
}
