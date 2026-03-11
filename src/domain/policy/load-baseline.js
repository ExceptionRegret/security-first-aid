import fs from "node:fs/promises";

export const loadBaseline = async ({ baselinePath }) => {
  if (!baselinePath) {
    return new Set();
  }

  try {
    const contents = await fs.readFile(baselinePath, "utf8");
    const payload = JSON.parse(contents);

    if (!Array.isArray(payload.fingerprints)) {
      return new Set();
    }

    return new Set(payload.fingerprints);
  } catch {
    return new Set();
  }
};
