import fs from "node:fs/promises";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("usage: node scripts/extract-release-notes.mjs <version> [--output <path>]");
  process.exit(1);
}

const stripVersionPrefix = (value) => value.replace(/^v/, "");
const escapeForRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const version = stripVersionPrefix(args[0]);
let outputPath;

for (let index = 1; index < args.length; index += 1) {
  const argument = args[index];
  const nextArgument = args[index + 1];

  if (argument === "--output" && nextArgument) {
    outputPath = nextArgument;
    index += 1;
    continue;
  }

  console.error(`unknown or incomplete argument: ${argument}`);
  process.exit(1);
}

const changelog = await fs.readFile(new URL("../CHANGELOG.md", import.meta.url), "utf8");
const headingPattern = new RegExp(
  `^## \\[${escapeForRegex(version)}\\] - \\d{4}-\\d{2}-\\d{2}$`,
  "m"
);
const match = changelog.match(headingPattern);

if (!match || match.index === undefined) {
  console.error(`CHANGELOG.md does not contain release notes for ${version}`);
  process.exit(1);
}

const afterHeading = changelog.slice(match.index);
const nextHeadingIndex = afterHeading.slice(1).search(/^## \[/m);
const section = nextHeadingIndex === -1
  ? afterHeading
  : afterHeading.slice(0, nextHeadingIndex + 1);

const notes = [
  `# security-first-aid ${version}`,
  "",
  section.trim(),
  ""
].join("\n");

if (outputPath) {
  await fs.writeFile(outputPath, notes, "utf8");
} else {
  process.stdout.write(notes);
}
