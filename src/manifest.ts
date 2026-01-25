import fs from "fs/promises";
import { z } from "zod";
import { log } from "./logger";

export const ManifestSchema = z.object({
  kit: z.object({
    version: z.string(),

    source: z.object({
      type: z.enum(["github", "local"]),
      repo: z.string().optional(),
      ref: z.string().optional(),
      path: z.string().optional()
    }),

    target: z.object({
      dir: z.string()
    }),

    include: z.object({
      shared: z.array(z.string()).optional(),

      platform: z.record(
        z.string(),            // platform name (web, nextjs, expo)
        z.array(z.string())    // slices
      ).optional()
    })
  })
});

export type Manifest = z.infer<typeof ManifestSchema>;

export async function readManifest(
  file = "kit.manifest.json"
): Promise<Manifest> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    const json = JSON.parse(raw);
    return ManifestSchema.parse(json);
  } catch (err) {
    log.error(`Invalid or missing ${file}`);
    throw err;
  }
}
