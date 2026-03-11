import fs from "node:fs/promises";
import path from "node:path";

export const writeBaseline = async ({ outputPath, findings }) => {
  const resolvedOutputPath = path.resolve(outputPath);
  const fingerprints = findings.map((finding) => finding.fingerprint);

  await fs.mkdir(path.dirname(resolvedOutputPath), { recursive: true });
  await fs.writeFile(
    resolvedOutputPath,
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      fingerprints
    }, null, 2),
    "utf8"
  );

  return resolvedOutputPath;
};
