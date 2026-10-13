# Validation history

## Version 0.2.0 — 2026-10-14

Packaging, independent installations, and skill validation passed. An independently generated SwiftUI sample built and passed two simulator UI tests after review corrections. See the [dated evaluation record](validation-0.2.0.md) for observed behavior, visual inspection, defects, and unverified coverage.

## Version 0.1.0 — initial validation

Reviewed on 2026-09-09 for version 0.1.0.

### Automated checks

- Repository validation passed for exactly two skill entrypoints, required frontmatter, portable notices, and local file links.
- Four validator tests passed, including invalid YAML, missing descriptions, broken references, sibling-file dependencies, and accidental nested skills.
- Skills CLI 1.5.25 discovered exactly two skills and installed each separately and both together into temporary Codex project directories. Installed files were compared byte-for-byte with the source, including references, UI metadata, licenses, and attribution notices.

These checks validate packaging and structural invariants. They do not demonstrate an agent's behavior on every possible prompt.

### Live Mobbin lookup

Used the connected Mobbin website-section search with one result for a pricing section containing three plans and a comparison table. The returned image was inspected inline.

Observed: [Sprig's pricing section](https://mobbin.com/sites/sections/1e145713-ded2-4c06-8b03-1743da1c1813) shows Free, Starter, and Enterprise columns above aligned feature rows, with a separate action under each plan. Group headers divide the comparison into categories.

Interpretation: putting comparable values on shared rows helps a reader inspect differences; this is a proposed design rationale, not measured evidence of conversion lift. The lookup verified capability selection, image availability, visual inspection, and canonical citation for section search. It did not test screen/flow search or a manually configured connection. No reference images or signed media URLs are stored here.

### Instruction review

The cases in [scenarios.md](scenarios.md) were reviewed against the written instructions:

| Case | Review outcome |
| --- | --- |
| Web pricing research | Section routing is documented and was exercised live; research-only scope is explicit. |
| Responsive dashboard | Web branch includes responsive layout, keyboard/focus, and browser history; existing stack takes precedence. Reviewed, not run in a sample app. |
| Mobile onboarding | Mobile branch covers completed-state guards and per-platform back verification. Reviewed, not run in a simulator. |
| Existing-screen polish | Playbook diagnoses first and scales research/verification to the change. |
| Missing Mobbin | Both entrypoints support supplied references and disclose unavailable evidence. |
| Individual skills | No sibling-file links; design has a standalone fallback. Both individual installations passed. |
| Different tool prefixes | Discovery uses service and capability rather than a hard-coded namespace. Only the plugin connection was tested live. |
| Sampled flows | Coverage gaps and inference limits are explicit. No complete-flow runtime claim is made. |
| Missing runtime or images | Guidance requires honest limitations; it does not substitute metadata for visual inspection or recordings for performance measurements. |
| Existing brand | Product tokens and brand choices override arbitrary style quotas. |

No autonomous application-build evaluation, simulator run, or browser implementation test was performed for this instruction-only release.
