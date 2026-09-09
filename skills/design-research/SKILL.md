---
name: design-research
description: Research real interface patterns using connected Mobbin tools or supplied references. Use for design references, screen critiques, flow comparisons, and component studies across web and mobile; deliver evidence and design decisions without implementing unless requested.
license: MIT
metadata:
  author: joshuatonga
  version: "0.1.0"
---
# Design Research

Turn reference images into decisions for the user's interface. Preserve the requested scope: a research question ends with findings; it does not authorize building an app or changing its feature set.

## Establish the question

Inspect the brief and available project context first. Identify the target platform, audience, existing brand/components, and the specific uncertainty to resolve. Ask only about consequential information that cannot be inferred.

Research should answer a question such as "How can users compare these plans?" or "Where should we request notification permission?" Avoid a generic search for attractive screens.

## Connect to the evidence

Discover available tools through the host's tool discovery mechanism. Identify tools described as searching **Mobbin** screens, user flows, and website sections; prefixes vary between plugins and direct MCP servers. Inspect their live argument schemas before calling them. If two connections expose the same capability, select one working connection rather than duplicating calls.

Read [the Mobbin adapter](references/mobbin.md) before the first Mobbin call in a task. It contains capability routing, query examples, pagination, and evidence limits.

Use supplied references first when the user selected them. If Mobbin is absent or authentication fails, state that limitation, continue with accessible references, and complete analysis that does not depend on unavailable evidence. Do not install or configure a connection without a request to do so.

## Choose the depth

Start with a small relevant batch, usually 3–5 examples. Refine or expand only when it could change a design decision; stop when the question is answered. Follow an explicit user request for deeper research.

Read only the matching playbook:

- [New interface](references/new-interface.md): establish a direction for a new screen or flow.
- [Improve a screen](references/improve-screen.md): diagnose an existing interface and research its specific gaps.
- [Flows and components](references/flows-and-components.md): compare journeys, controls, and presentation patterns.

## Inspect before interpreting

Actually view the returned images through the host's supported image tools. An unseen image is not visual evidence. If an image cannot be opened, identify the gap rather than describing it from metadata.

Separate observed layout/content, inferred behavior, and proposed changes. Screenshots cannot establish animation timing, interaction behavior, conversion lift, or why a company chose a design. Revenue or design success must not be invented from brand recognition.

A flow may have sampled inline previews. Compare returned screen positions with the reported count before claiming coverage. Label gaps; do not invent omitted steps or call a partial view a complete journey.

Use patterns to inform the user's design system and goals. Do not reproduce third-party branding, watermarks, or assets as if they belong to the user's product.

## Deliver the brief

Keep the output proportionate to the question:

- **Question and scope:** target platform and the decision being researched.
- **Selected references:** each named reference linked to its returned canonical Mobbin URL, with one concrete reason it matters. Cite supplied references by their actual source.
- **Observed patterns:** hierarchy, control choices, content, and flow structure supported by inspected evidence.
- **Proposed decisions:** what to adopt, adapt, or reject for this product, including relevant tradeoffs.
- **Uncertainty:** missing steps, untested interactions, or questions requiring product data or user testing.

For implementation requests, hand these decisions to `interface-design` if available, or continue with the project's implementation guidance. Never require that sibling skill to finish a research task.

For substantial work, keep notes and canonical links in the project's designated working area. Keep reference downloads, signed image URLs, and private product context out of public commits. Use the host's media policy; downloading every reference is not required.
