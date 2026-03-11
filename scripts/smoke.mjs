import { executeCli } from "../src/cli/execute-cli.js";

const result = await executeCli([
  "scan",
  "./tests/fixtures/insecure-service",
  "--format",
  "json"
]);

if (result.exitCode !== 1) {
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
  process.exit(result.exitCode);
}
