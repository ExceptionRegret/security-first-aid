import fs from "node:fs/promises";
import path from "node:path";

import { classifyArtifactKind } from "./classify-artifact-kind.js";

const ignoredDirectoryNames = new Set([
  ".git",
  "node_modules",
  "dist",
  "coverage"
]);

const collectFiles = async (directoryPath) => {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (ignoredDirectoryNames.has(entry.name)) {
        continue;
      }

      files.push(...await collectFiles(entryPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
};

const parseJsonPayload = (contents) => {
  try {
    return JSON.parse(contents);
  } catch {
    return null;
  }
};

export const discoverArtifacts = async ({ targetPath }) => {
  const files = await collectFiles(targetPath);
  const artifacts = [];

  for (const filePath of files) {
    const kind = classifyArtifactKind(filePath);

    if (kind === "unknown") {
      continue;
    }

    const contents = await fs.readFile(filePath, "utf8");

    artifacts.push({
      absolutePath: filePath,
      filePath: path.relative(targetPath, filePath).split(path.sep).join("/"),
      kind,
      contents,
      jsonPayload: kind === "json-file" ? parseJsonPayload(contents) : null
    });
  }

  return artifacts;
};
