const isGlobalInstall = process.env.npm_config_global === "true";
const isCi = process.env.CI === "true";

if (!isGlobalInstall || isCi) {
  process.exit(0);
}

const lines = [
  "",
  "Security First Aid installed.",
  "",
  "Start here:",
  "  sfa",
  "  sfa scan . --format terminal",
  "  sfa rules list --format json",
  "",
  "PowerShell note:",
  "  If `sfa` is blocked by execution policy, use `sfa.cmd` or `cmd /c sfa`.",
  "",
  "Docs:",
  "  README: https://github.com/ExceptionRegret/security-first-aid#readme",
  "  npm:    https://www.npmjs.com/package/security-first-aid",
  ""
];

process.stdout.write(`${lines.join("\n")}\n`);
