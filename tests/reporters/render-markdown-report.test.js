import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import { runScan } from "../../src/application/run-scan.js";
import { renderMarkdownReport } from "../../src/reporters/render-markdown-report.js";

const fixturesRoot = path.resolve("tests/fixtures");

test("renderMarkdownReport includes summary and findings sections", async () => {
  const result = await runScan({
    targetPath: path.join(fixturesRoot, "insecure-service")
  });

  const markdown = renderMarkdownReport(result);

  assert.match(markdown, /^# Security First Aid Report/m);
  assert.match(markdown, /^## Summary/m);
  assert.match(markdown, /^## Findings/m);
  assert.match(markdown, /SFA_SECRET_001/);
  assert.match(markdown, /SFA_GHA_003/);
  assert.match(markdown, /SFA_CONFIG_004/);
  assert.match(markdown, /SFA_ENV_001/);
});
