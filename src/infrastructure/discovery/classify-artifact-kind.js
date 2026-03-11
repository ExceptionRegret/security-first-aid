import path from "node:path";

export const classifyArtifactKind = (filePath) => {
  const normalizedPath = filePath.split(path.sep).join("/");
  const baseName = path.basename(filePath);

  if (baseName === ".env" || baseName.startsWith(".env.")) {
    return "env-file";
  }

  if (baseName === "Dockerfile") {
    return "dockerfile";
  }

  if (normalizedPath.includes("/.github/workflows/") && (baseName.endsWith(".yml") || baseName.endsWith(".yaml"))) {
    return "workflow-file";
  }

  if (baseName.endsWith(".json")) {
    return "json-file";
  }

  return "unknown";
};
