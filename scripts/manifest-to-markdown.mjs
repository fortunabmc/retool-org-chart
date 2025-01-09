import { readFileSync, writeFile, writeFileSync } from "node:fs";
import { join } from "node:path";

// Load the manifest file
const filePath = join(process.cwd(), "retool-custom-component-manifest.json");
const outputPath = join(process.cwd(), "OPTIONS.md");

const contents = readFileSync(filePath, "utf8");
const manifest = JSON.parse(contents);
const components = manifest.components || {};

let markdown = "# Org Chart Options\n";

for (const [_, component] of Object.entries(components)) {
  if (component.model && component.model.length > 0) {
    markdown +=
      "| Name | Type | Description | Initial Value | Inspector | Enum Definition |\n";
    markdown +=
      "|------|------|-------------|---------------|-----------|----------------|\n";

    component.model.forEach((option) => {
      markdown += `| ${option.label ?? option.name ?? "undefined"} | ${option.type || ""} | ${option.description || ""} | ${option.initialValue !== undefined ? option.initialValue : ""} | ${option.inspector || ""} | ${option.enumDefinition ? option.enumDefinition.join(", ") : ""} |\n`;
    });
  } else {
    markdown += "No options defined for this component.\n\n";
  }

  markdown += "\n";
}

writeFileSync(outputPath, markdown);
console.log(`\nOPTIONS.md was generated.\n`);
