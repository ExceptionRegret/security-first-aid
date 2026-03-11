import fs from "node:fs/promises";
import path from "node:path";

export const writeOutputFile = async ({ outputPath, contents }) => {
  const resolvedOutputPath = path.resolve(outputPath);

  await fs.mkdir(path.dirname(resolvedOutputPath), { recursive: true });
  await fs.writeFile(resolvedOutputPath, contents, "utf8");

  return resolvedOutputPath;
};
