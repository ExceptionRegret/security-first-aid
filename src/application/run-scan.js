import path from "node:path";

import { calculateSummary } from "../domain/findings/calculate-summary.js";
import { loadProjectPolicy } from "../domain/policy/load-project-policy.js";
import { createDefaultRules } from "../domain/rules/create-default-rules.js";
import { loadBaseline } from "../domain/policy/load-baseline.js";
import { splitFindingsByBaseline } from "../domain/policy/split-findings-by-baseline.js";
import { discoverArtifacts } from "../infrastructure/discovery/discover-artifacts.js";

const sortFindings = (left, right) => {
  const severityRank = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1
  };

  const rankDifference = severityRank[right.severity] - severityRank[left.severity];

  if (rankDifference !== 0) {
    return rankDifference;
  }

  const pathDifference = left.filePath.localeCompare(right.filePath);

  if (pathDifference !== 0) {
    return pathDifference;
  }

  return left.ruleId.localeCompare(right.ruleId);
};

export const runScan = async ({
  targetPath,
  baselinePath,
  configPath,
  ignoreBaseline = false,
  rules = createDefaultRules()
}) => {
  const absoluteTargetPath = path.resolve(targetPath);
  const policy = await loadProjectPolicy({
    targetPath: absoluteTargetPath,
    configPath
  });
  const artifacts = await discoverArtifacts({ targetPath: absoluteTargetPath });
  const ruleCatalog = rules.map((rule) => ({
    id: rule.id,
    title: rule.title,
    defaultSeverity: rule.defaultSeverity,
    category: rule.category,
    appliesTo: rule.appliesTo
  }));
  const rulesAllowedByPolicy = policy.enabledRules.length === 0
    ? rules
    : rules.filter((rule) => policy.enabledRules.includes(rule.id));
  const enabledRules = rulesAllowedByPolicy.filter((rule) => !policy.disabledRules.includes(rule.id));
  const findings = [];

  for (const artifact of artifacts) {
    for (const rule of enabledRules) {
      if (!rule.appliesTo.includes(artifact.kind)) {
        continue;
      }

      const emittedFindings = rule.evaluate(artifact);

      if (emittedFindings.length === 0) {
        continue;
      }

      findings.push(...emittedFindings);
    }
  }

  const effectiveBaselinePath = baselinePath ?? policy.baselinePath;
  const baselineFingerprints = ignoreBaseline
    ? new Set()
    : await loadBaseline({ baselinePath: effectiveBaselinePath });
  const { activeFindings, suppressedFindings } = splitFindingsByBaseline({
    findings: findings.sort(sortFindings),
    baselineFingerprints
  });

  return {
    generatedAt: new Date().toISOString(),
    targetPath: absoluteTargetPath,
    policy,
    ruleCatalog,
    findings: activeFindings,
    suppressedFindings,
    summary: calculateSummary(activeFindings),
    diagnostics: {
      scannedArtifactCount: artifacts.length
    }
  };
};
