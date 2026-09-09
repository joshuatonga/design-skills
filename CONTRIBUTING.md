# Contributing

Small, evidence-backed improvements are welcome. Open an issue for a missing workflow or a reproducible failure, or submit a focused pull request.

## Local checks

Use Node.js 22.20.0 or later and npm:

```sh
npm ci
npm test
npm run test:install
```

The development package is private and exists only for repository validation. Users install the skills through the Skills CLI, not this package.

`npm test` checks frontmatter, skill discovery boundaries, local links, and the validator's failure cases. `npm run test:install` uses the pinned Skills CLI to discover and install both skills, individually and together, in temporary project directories. It does not install globally. It may need network access for the installer; CI needs no Mobbin account.

## Changes to skills

Keep entrypoints concise and put substantial conditional guidance in linked references. Keep each skill independently installable: no file links into its sibling skill. Preserve automatic discovery and precise trigger descriptions.

Match the task's scope, use supported tools, distinguish evidence from inference, and preserve existing project choices. Do not turn a single preference or example into an unconditional rule.

For tool changes, verify the live schema and update the review date in the adapter. For framework-specific changes, check current primary documentation and the relevant version rather than copying unverified snippets.

Use [the scenario checklist](tests/scenarios.md) to review behavior. Document which scenarios were actually exercised; static validation does not prove model behavior or UI performance.

## Public materials

Use invented product details in examples. Do not commit credentials, signed media URLs, private briefs, reference-screen downloads, or third-party product assets. Describe failures with redacted examples and canonical source links where appropriate.

Keep upstream notices in adapted material, including each independently installable skill's license. See [ATTRIBUTION.md](ATTRIBUTION.md). Update [CHANGELOG.md](CHANGELOG.md) for user-visible changes.
