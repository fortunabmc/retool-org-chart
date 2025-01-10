import { writeFileSync } from "node:fs";

import { generateOptionsMarkdown } from "./generateOptionsMarkdown.mjs";

const outputPath = path.join(process.cwd(), "OPTIONS.md");
const markdown = generateOptionsMarkdown();
writeFileSync(outputPath, markdown);
console.log(`\nOPTIONS.md was generated.\n`);
