#!/usr/bin/env node

import { executeCli } from "./execute-cli.js";

const result = await executeCli(process.argv.slice(2));

if (result.stdout) {
  process.stdout.write(result.stdout);
}

if (result.stderr) {
  process.stderr.write(result.stderr);
}

process.exit(result.exitCode);
