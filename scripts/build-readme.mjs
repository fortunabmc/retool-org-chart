import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { generateOptionsMarkdown } from "./generateOptionsMarkdown.mjs";

const FENCE = "EMBED";
const START = `<!-- ${FENCE}:START -->`;
const END = `<!-- ${FENCE}:END -->`;
const regex = new RegExp(`${START}[\\s\\S]*?${END}`);

const filePath = path.join(process.cwd(), "README.md");

try {
  const readme = readFileSync(filePath, "utf8");
  const options = generateOptionsMarkdown();

  // Check if the START and END markers exist
  if (!regex.test(readme)) {
    throw new Error(
      `Markers ${START} and ${END} are not found in ${filePath}. Ensure the fences are present in the file.`
    );
  }

  const updatedContent = readme.replace(
    regex,
    `${START}\n${options.trim()}\n${END}`
  );

  writeFileSync(filePath, updatedContent, "utf8");
  console.log("Markdown file updated successfully!");
} catch (error) {
  console.error(`Failed to update Markdown file: ${error.message}`);
}
