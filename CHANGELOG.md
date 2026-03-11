# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [Unreleased]

## [0.1.2] - 2026-03-11

### Added

- Global npm installs now print a short post-install quick-start guide so users immediately see how to run the CLI.

## [0.1.1] - 2026-03-11

### Added

- Tag-driven GitHub Actions release workflow that validates version metadata, builds a tarball and checksum, publishes to npm, and creates a GitHub release.
- Release helper scripts for changelog extraction and version/changelog validation.
- npm release scripts for repeatable validation and package checks.
- Built-in CLI quick-start guide for no-argument, `help`, `--help`, and `-h` invocation.

## [0.1.0] - 2026-03-11

### Added

- Deterministic scanner CLI with `scan`, `baseline create`, and `rules list` commands.
- Terminal, JSON, Markdown, and SARIF reporters.
- Repository policy loading from `.sfa.json` and baseline suppression/generation.
- Fifteen deterministic rules covering secrets, GitHub Actions, Docker, and common JSON config risks.
- Reusable GitHub Action wrapper and verification workflow.
- Production documentation baseline including ADRs, SOPs, contributing guidance, and durable project memory.
