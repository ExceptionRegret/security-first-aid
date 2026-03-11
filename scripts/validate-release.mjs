import fs from "node:fs/promises";

const stripVersionPrefix = (value) => value.replace(/^v/, "");

const escapeForRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, "utf8"));

const readText = async (filePath) => fs.readFile(filePath, "utf8");

const packageJson = await readJson(new URL("../package.json", import.meta.url));
const changelog = await readText(new URL("../CHANGELOG.md", import.meta.url));

const requestedVersion = process.argv[2] ? stripVersionPrefix(process.argv[2]) : packageJson.version;
const errors = [];

if (!changelog.includes("## [Unreleased]")) {
  errors.push("CHANGELOG.md must contain an [Unreleased] section.");
}

if (requestedVersion !== packageJson.version) {
  errors.push(
    `Release version mismatch: package.json is ${packageJson.version} but validation target is ${requestedVersion}.`
  );
}

const headingPattern = new RegExp(
  `^## \\[${escapeForRegex(requestedVersion)}\\] - \\d{4}-\\d{2}-\\d{2}$`,
  "m"
);
const match = changelog.match(headingPattern);

if (!match || match.index === undefined) {
  errors.push(`CHANGELOG.md is missing a release heading for version ${requestedVersion}.`);
}

if (match && match.index !== undefined) {
  const afterHeading = changelog.slice(match.index);
  const nextHeadingIndex = afterHeading.slice(1).search(/^## \[/m);
  const section = nextHeadingIndex === -1
    ? afterHeading
    : afterHeading.slice(0, nextHeadingIndex + 1);
  const body = section
    .split("\n")
    .slice(1)
    .join("\n")
    .trim();

  if (!body) {
    errors.push(`CHANGELOG.md entry for version ${requestedVersion} is empty.`);
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`release validation error: ${error}`);
  }

  process.exit(1);
}

console.log(`release validation passed for ${requestedVersion}`);
