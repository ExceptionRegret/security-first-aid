import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import { runScan } from "../../src/application/run-scan.js";
import { renderSarifReport } from "../../src/reporters/render-sarif-report.js";

const fixturesRoot = path.resolve("tests/fixtures");

test("renderSarifReport produces SARIF output with rules and results", async () => {
  const result = await runScan({
    targetPath: path.join(fixturesRoot, "insecure-service")
  });

  const sarif = JSON.parse(renderSarifReport(result));

  assert.equal(sarif.version, "2.1.0");
  assert.equal(sarif.runs[0].tool.driver.name, "Security First Aid");
  assert.ok(sarif.runs[0].tool.driver.rules.length >= 15);
  assert.ok(sarif.runs[0].results.length >= 15);
});
