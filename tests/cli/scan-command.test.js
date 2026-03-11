import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { executeCli } from "../../src/cli/execute-cli.js";

const fixturesRoot = path.resolve("tests/fixtures");

test("CLI exits non-zero and emits JSON when findings meet the default threshold", async () => {
  const result = await executeCli([
    "scan",
    path.join(fixturesRoot, "insecure-service"),
    "--format",
    "json"
  ]);

  assert.equal(result.exitCode, 1);

  const payload = JSON.parse(result.stdout);
  assert.equal(payload.summary.totalFindings, 15);
  assert.equal(payload.summary.bySeverity.high, 6);
});

test("CLI exits zero when the repository has no findings", async () => {
  const result = await executeCli([
    "scan",
    path.join(fixturesRoot, "secure-service"),
    "--format",
    "json"
  ]);

  assert.equal(result.exitCode, 0);

  const payload = JSON.parse(result.stdout);
  assert.equal(payload.summary.totalFindings, 0);
});

test("CLI honors severity threshold from repository policy config", async () => {
  const sourcePath = path.join(fixturesRoot, "insecure-service");
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sfa-cli-policy-"));

  await fs.cp(sourcePath, tempDir, { recursive: true });
  await fs.writeFile(
    path.join(tempDir, ".sfa.json"),
    JSON.stringify({
      severityThreshold: "critical"
    }, null, 2),
    "utf8"
  );

  const result = await executeCli([
    "scan",
    tempDir,
    "--format",
    "json"
  ]);

  assert.equal(result.exitCode, 0);
});

test("CLI baseline create writes a baseline file with finding fingerprints", async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sfa-cli-baseline-"));
  const outputPath = path.join(tempDir, ".sfa-baseline.json");

  const result = await executeCli([
    "baseline",
    "create",
    path.join(fixturesRoot, "insecure-service"),
    "--output",
    outputPath
  ]);

  assert.equal(result.exitCode, 0);

  const payload = JSON.parse(await fs.readFile(outputPath, "utf8"));

  assert.equal(Array.isArray(payload.fingerprints), true);
  assert.equal(payload.fingerprints.length, 15);
});

test("CLI can write a markdown report to an output file", async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sfa-cli-output-"));
  const outputPath = path.join(tempDir, "report.md");

  const result = await executeCli([
    "scan",
    path.join(fixturesRoot, "insecure-service"),
    "--format",
    "markdown",
    "--output",
    outputPath
  ]);

  assert.equal(result.exitCode, 1);

  const contents = await fs.readFile(outputPath, "utf8");

  assert.match(contents, /^# Security First Aid Report/m);
  assert.match(contents, /SFA_GHA_004/);
});

test("CLI rules list returns the rule catalog in JSON", async () => {
  const result = await executeCli([
    "rules",
    "list",
    "--format",
    "json"
  ]);

  assert.equal(result.exitCode, 0);

  const payload = JSON.parse(result.stdout);

  assert.equal(Array.isArray(payload.rules), true);
  assert.equal(payload.rules.some((rule) => rule.id === "SFA_GHA_004"), true);
  assert.equal(payload.rules.some((rule) => rule.id === "SFA_CONFIG_005"), true);
  assert.equal(payload.rules.length >= 15, true);
});

test("CLI with no arguments prints a quick-start guide", async () => {
  const result = await executeCli([]);

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /Security First Aid/);
  assert.match(result.stdout, /Quick start:/);
  assert.match(result.stdout, /sfa scan \. --format terminal/);
  assert.match(result.stdout, /sfa rules list --format json/);
});

test("CLI supports explicit help flags", async () => {
  const result = await executeCli(["--help"]);

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /sfa baseline create/);
  assert.match(result.stdout, /sfa help/);
});

test("CLI unknown command points users to the built-in guide", async () => {
  const result = await executeCli(["wat"]);

  assert.equal(result.exitCode, 1);
  assert.match(result.stderr, /Unknown command: wat/);
  assert.match(result.stderr, /Quick start:/);
});
