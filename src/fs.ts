import fs from "fs/promises";
import path from "path";

export async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true });
}

export function resolvePath(...parts: string[]) {
  return path.resolve(...parts);
}
