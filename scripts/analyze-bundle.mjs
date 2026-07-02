import { existsSync } from "node:fs";
import { resolve } from "node:path";

const buildDirectory = resolve(process.cwd(), ".next");

if (!existsSync(buildDirectory)) {
  console.error("Bundle analysis requires a completed Next.js build.");
  process.exit(1);
}

console.log("Next.js build output is present for bundle analysis.");
