import fs from "node:fs/promises";
import path from "node:path";

const normalizePolicy = (payload, basePath) => ({
  enabledRules: Array.isArray(payload.enabledRules) ? payload.enabledRules : [],
  disabledRules: Array.isArray(payload.disabledRules) ? payload.disabledRules : [],
  severityThreshold: typeof payload.severityThreshold === "string" ? payload.severityThreshold : undefined,
  baselinePath: typeof payload.baselinePath === "string"
    ? path.resolve(basePath, payload.baselinePath)
    : undefined
});

export const loadProjectPolicy = async ({ targetPath, configPath }) => {
  const resolvedConfigPath = configPath
    ? path.resolve(configPath)
    : path.join(path.resolve(targetPath), ".sfa.json");

  try {
    const contents = await fs.readFile(resolvedConfigPath, "utf8");
    const payload = JSON.parse(contents);

    return {
      configPath: resolvedConfigPath,
      ...normalizePolicy(payload, path.dirname(resolvedConfigPath))
    };
  } catch {
    return {
      configPath: resolvedConfigPath,
      enabledRules: [],
      disabledRules: [],
      severityThreshold: undefined,
      baselinePath: undefined
    };
  }
};
