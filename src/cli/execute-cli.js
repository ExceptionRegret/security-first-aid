import path from "node:path";

import { runScan } from "../application/run-scan.js";
import { writeBaseline } from "../domain/policy/write-baseline.js";
import { getRuleCatalog } from "../domain/rules/get-rule-catalog.js";
import { writeOutputFile } from "../infrastructure/filesystem/write-output-file.js";
import { renderJsonReport } from "../reporters/render-json-report.js";
import { renderMarkdownReport } from "../reporters/render-markdown-report.js";
import { renderSarifReport } from "../reporters/render-sarif-report.js";
import { renderTerminalReport } from "../reporters/render-terminal-report.js";

const helpText = `Security First Aid

Deterministic, local-first security scanning for repositories and CI/CD configuration.

Quick start:
  sfa scan . --format terminal
  sfa rules list --format json
  sfa baseline create . --output ./.sfa-baseline.json

Usage:
  sfa scan <target-path> [--format json|markdown|sarif|terminal] [--baseline <path>] [--config <path>] [--severity-threshold low|medium|high|critical] [--output <path>]
  sfa baseline create <target-path> [--output <path>] [--config <path>]
  sfa rules list [--format json|markdown|terminal]
  sfa help

Examples:
  sfa scan . --format terminal
  sfa scan . --format markdown --output ./reports/security-report.md
  sfa scan . --format sarif --baseline ./.sfa-baseline.json
  sfa baseline create . --output ./.sfa-baseline.json
  sfa rules list --format json

More:
  README: https://github.com/ExceptionRegret/security-first-aid#readme
  npm:    https://www.npmjs.com/package/security-first-aid
`;

const usageText = helpText;

const severityRank = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4
};

const parseScanOptions = (argv) => {
  const [targetPath, ...rest] = argv;

  if (!targetPath) {
    return {
      error: usageText
    };
  }

  const options = {
    targetPath: path.resolve(targetPath),
    format: "terminal"
  };

  for (let index = 0; index < rest.length; index += 1) {
    const argument = rest[index];
    const nextArgument = rest[index + 1];

    if (argument === "--format" && nextArgument) {
      options.format = nextArgument;
      index += 1;
      continue;
    }

    if (argument === "--baseline" && nextArgument) {
      options.baselinePath = path.resolve(nextArgument);
      index += 1;
      continue;
    }

    if (argument === "--config" && nextArgument) {
      options.configPath = path.resolve(nextArgument);
      index += 1;
      continue;
    }

    if (argument === "--severity-threshold" && nextArgument) {
      options.severityThreshold = nextArgument;
      index += 1;
      continue;
    }

    if (argument === "--output" && nextArgument) {
      options.outputPath = path.resolve(nextArgument);
      index += 1;
      continue;
    }

    return {
      error: `Unknown or incomplete argument: ${argument}\n\n${usageText}`
    };
  }

  if (!["json", "markdown", "sarif", "terminal"].includes(options.format)) {
    return {
      error: `Unsupported format: ${options.format}\n\n${usageText}`
    };
  }

  if (options.severityThreshold && !(options.severityThreshold in severityRank)) {
    return {
      error: `Unsupported severity threshold: ${options.severityThreshold}\n\n${usageText}`
    };
  }

  return {
    options
  };
};

const parseRulesListOptions = (argv) => {
  const options = {
    format: "terminal"
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const nextArgument = argv[index + 1];

    if (argument === "--format" && nextArgument) {
      options.format = nextArgument;
      index += 1;
      continue;
    }

    return {
      error: `Unknown or incomplete argument: ${argument}\n\n${usageText}`
    };
  }

  if (!["json", "markdown", "terminal"].includes(options.format)) {
    return {
      error: `Unsupported format: ${options.format}\n\n${usageText}`
    };
  }

  return {
    options
  };
};

const parseBaselineCreateOptions = (argv) => {
  const [targetPath, ...rest] = argv;

  if (!targetPath) {
    return {
      error: usageText
    };
  }

  const options = {
    targetPath: path.resolve(targetPath)
  };

  for (let index = 0; index < rest.length; index += 1) {
    const argument = rest[index];
    const nextArgument = rest[index + 1];

    if (argument === "--output" && nextArgument) {
      options.outputPath = path.resolve(nextArgument);
      index += 1;
      continue;
    }

    if (argument === "--config" && nextArgument) {
      options.configPath = path.resolve(nextArgument);
      index += 1;
      continue;
    }

    return {
      error: `Unknown or incomplete argument: ${argument}\n\n${usageText}`
    };
  }

  if (!options.outputPath) {
    options.outputPath = path.join(options.targetPath, ".sfa-baseline.json");
  }

  return {
    options
  };
};

const renderReport = (format, result) => {
  if (format === "json") {
    return renderJsonReport(result);
  }

  if (format === "markdown") {
    return renderMarkdownReport(result);
  }

  if (format === "sarif") {
    return renderSarifReport(result);
  }

  return renderTerminalReport(result);
};

const shouldFail = (findings, severityThreshold) => {
  const thresholdRank = severityRank[severityThreshold];

  return findings.some((finding) => severityRank[finding.severity] >= thresholdRank);
};

const renderRuleCatalog = (catalog, format) => {
  if (format === "json") {
    return JSON.stringify({ rules: catalog }, null, 2);
  }

  if (format === "markdown") {
    const lines = ["# Rule Catalog", ""];

    for (const rule of catalog) {
      lines.push(`- \`${rule.id}\` ${rule.title} (${rule.defaultSeverity})`);
    }

    return lines.join("\n");
  }

  return catalog
    .map((rule) => `${rule.id} ${rule.defaultSeverity.toUpperCase()} ${rule.title}`)
    .join("\n");
};

export const executeCli = async (argv) => {
  const [command, ...rest] = argv;

  if (!command || command === "help" || command === "--help" || command === "-h") {
    return {
      exitCode: 0,
      stdout: `${helpText}\n`,
      stderr: ""
    };
  }

  if (command === "scan") {
    const parsed = parseScanOptions(rest);

    if (parsed.error) {
      return {
        exitCode: 1,
        stdout: "",
        stderr: parsed.error
      };
    }

    const result = await runScan(parsed.options);
    const output = renderReport(parsed.options.format, result);
    const effectiveSeverityThreshold = parsed.options.severityThreshold ?? result.policy.severityThreshold ?? "high";

    if (parsed.options.outputPath) {
      await writeOutputFile({
        outputPath: parsed.options.outputPath,
        contents: output
      });
    }

    return {
      exitCode: shouldFail(result.findings, effectiveSeverityThreshold) ? 1 : 0,
      stdout: `${output}\n`,
      stderr: ""
    };
  }

  if (command === "baseline" && rest[0] === "create") {
    const parsed = parseBaselineCreateOptions(rest.slice(1));

    if (parsed.error) {
      return {
        exitCode: 1,
        stdout: "",
        stderr: parsed.error
      };
    }

    const result = await runScan({
      targetPath: parsed.options.targetPath,
      configPath: parsed.options.configPath,
      ignoreBaseline: true
    });
    const outputPath = await writeBaseline({
      outputPath: parsed.options.outputPath,
      findings: result.findings
    });

    return {
      exitCode: 0,
      stdout: `${JSON.stringify({ outputPath, fingerprints: result.findings.map((finding) => finding.fingerprint) }, null, 2)}\n`,
      stderr: ""
    };
  }

  if (command === "rules" && rest[0] === "list") {
    const parsed = parseRulesListOptions(rest.slice(1));

    if (parsed.error) {
      return {
        exitCode: 1,
        stdout: "",
        stderr: parsed.error
      };
    }

    const catalog = getRuleCatalog();
    const output = renderRuleCatalog(catalog, parsed.options.format);

    return {
      exitCode: 0,
      stdout: `${output}\n`,
      stderr: ""
    };
  }

  return {
    exitCode: 1,
    stdout: "",
    stderr: `Unknown command: ${command}\n\n${helpText}`
  };
};
