import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { runScan } from "../../src/application/run-scan.js";

const fixturesRoot = path.resolve("tests/fixtures");

test("runScan detects high-signal findings in an insecure repository", async () => {
  const result = await runScan({
    targetPath: path.join(fixturesRoot, "insecure-service")
  });

  const ruleIds = result.findings.map((finding) => finding.ruleId).sort();

  assert.deepEqual(ruleIds, [
    "SFA_CONFIG_001",
    "SFA_CONFIG_002",
    "SFA_CONFIG_003",
    "SFA_CONFIG_004",
    "SFA_CONFIG_005",
    "SFA_DOCKER_001",
    "SFA_DOCKER_002",
    "SFA_DOCKER_003",
    "SFA_ENV_001",
    "SFA_GHA_001",
    "SFA_GHA_002",
    "SFA_GHA_003",
    "SFA_GHA_004",
    "SFA_GHA_005",
    "SFA_SECRET_001"
  ]);
  assert.equal(result.summary.totalFindings, 15);
  assert.equal(result.summary.bySeverity.high, 6);
  assert.equal(result.summary.bySeverity.medium, 7);
  assert.equal(result.summary.bySeverity.low, 2);
});

test("runScan returns a clean result for a secure repository", async () => {
  const result = await runScan({
    targetPath: path.join(fixturesRoot, "secure-service")
  });

  assert.equal(result.findings.length, 0);
  assert.equal(result.summary.totalFindings, 0);
});

test("runScan honors disabledRules from a repository policy file", async () => {
  const sourcePath = path.join(fixturesRoot, "insecure-service");
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sfa-policy-"));

  await fs.cp(sourcePath, tempDir, { recursive: true });
  await fs.writeFile(
    path.join(tempDir, ".sfa.json"),
    JSON.stringify({
      disabledRules: ["SFA_SECRET_001", "SFA_CONFIG_002"]
    }, null, 2),
    "utf8"
  );

  const result = await runScan({
    targetPath: tempDir
  });

  const ruleIds = result.findings.map((finding) => finding.ruleId);

  assert.equal(result.summary.totalFindings, 13);
  assert.equal(ruleIds.includes("SFA_SECRET_001"), false);
  assert.equal(ruleIds.includes("SFA_CONFIG_002"), false);
});

test("runScan honors enabledRules from a repository policy file", async () => {
  const sourcePath = path.join(fixturesRoot, "insecure-service");
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sfa-enabled-rules-"));

  await fs.cp(sourcePath, tempDir, { recursive: true });
  await fs.writeFile(
    path.join(tempDir, ".sfa.json"),
    JSON.stringify({
      enabledRules: ["SFA_SECRET_001", "SFA_GHA_003"]
    }, null, 2),
    "utf8"
  );

  const result = await runScan({
    targetPath: tempDir
  });

  const ruleIds = result.findings.map((finding) => finding.ruleId).sort();

  assert.deepEqual(ruleIds, ["SFA_GHA_003", "SFA_SECRET_001"]);
  assert.equal(result.summary.totalFindings, 2);
});

test("runScan suppresses findings that exist in the baseline file", async () => {
  const insecurePath = path.join(fixturesRoot, "insecure-service");
  const initial = await runScan({ targetPath: insecurePath });
  const [firstFinding] = initial.findings;

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sfa-baseline-"));
  const baselinePath = path.join(tempDir, ".sfa-baseline.json");

  await fs.writeFile(
    baselinePath,
    JSON.stringify({ fingerprints: [firstFinding.fingerprint] }, null, 2),
    "utf8"
  );

  const result = await runScan({
    targetPath: insecurePath,
    baselinePath
  });

  assert.equal(result.findings.length, 14);
  assert.equal(result.suppressedFindings.length, 1);
  assert.equal(result.suppressedFindings[0].fingerprint, firstFinding.fingerprint);
});
