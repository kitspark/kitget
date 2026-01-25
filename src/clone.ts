import { execSync } from "child_process";
import { log } from "./logger";

export function cloneRepo(repo: string, version: string, dest: string) {
  const tag = `v${version}`;
  log.info(`Cloning ${repo}@${tag}`);
  execSync(
    `git clone --depth 1 --branch ${tag} https://github.com/${repo}.git ${dest}`,
    { stdio: "inherit" }
  );
}
