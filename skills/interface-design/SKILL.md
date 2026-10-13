---
name: interface-design
description: Design, implement, and polish web and mobile interfaces using real references and platform-appropriate verification. Use for screens, pages, flows, responsive layouts, navigation, and interaction polish while preserving the project's stack and design system.
license: MIT
metadata:
  author: joshuatonga
  version: "0.2.0"
---
# Interface Design

Build an interface that serves the product's audience, reflects an intentional design direction, and works in its target runtime. Match the deliverable to the request: design advice alone does not authorize code changes.

## Establish the target

Inspect the project, existing screens, dependencies, routing, and design tokens before choosing an approach. Determine the target surface from the brief and project evidence. A narrow browser viewport is still web, not a native app. A shared Expo project may target multiple runtimes.

Preserve the project's stack and components. For a new mobile project with no stack decision, Expo / React Native is a useful default; do not migrate an existing project to it. Ask only when an unresolved platform or product choice materially changes the work.

Read only the applicable guidance:

- [Web](references/web.md): websites, browser apps, and browser targets of shared projects.
- [Mobile](references/mobile.md): native mobile screens, navigation, forms, and state.
- [iOS](references/ios.md): required for iOS targets; Apple HIG, native bars/controls, and SwiftUI/UIKit/Expo mappings.
- [Motion](references/motion.md): when changing transitions, gestures, or feedback.
- [Performance](references/performance.md): performance-sensitive work or a measured responsiveness problem.
- [Assets](references/assets.md): choosing, generating, or preparing visual assets.
- [Copy and design review](references/copy-and-design.md): apply when writing UI and before completing any interface change.
- [Verification](references/verification.md): before reporting implementation complete.

For both web and native targets, read and validate both branches. For other native stacks, keep their framework and use the transferable mobile principles, checking platform documentation rather than forcing React Native APIs.

## Research the decision

Use `design-research` if installed and references would resolve an actual uncertainty. Reuse an adequate existing research brief or the user's chosen references instead of repeating research.

Standalone fallback: inspect supplied references first. Otherwise discover connected Mobbin screen, flow, or website-section tools by provider and capability, read their live schemas, and search a small relevant set. Use web results for browser work; iOS results can inform mobile layout but are not Android behavior evidence. Inspect actual returned images, cite each discussed reference's canonical `mobbin_url`, and distinguish observed patterns from inference. Sampled flow previews do not establish a complete journey. Keep query content generic and free of private context; if using `task_intent`, keep one short English summary identical across calls. Expand only for unresolved decisions.

If research tools or images are unavailable, use existing project evidence and supplied references, state the gap, and continue independent work. Do not invent studied examples or block a straightforward fix on connecting a service.

## Choose and implement the direction

State the important choices briefly: primary action, reading order, layout, component roles, navigation, and relevant states. Use research to explain decisions, not to copy a competitor's brand or impose a different product scope.

For a new product, establish a small explicit system before building across screens: type roles, semantic colors, spacing and shape scales, component states, and an asset direction if needed. Record the primary journeys and presentation/back decisions. For a small fix, reuse these decisions rather than producing a new design document.

- Reuse the product's typography, palette, spacing, and shape tokens. Add tokens deliberately where needed. No universal accent-color count or blanket ban on a type pairing replaces the brand brief.
- Make hierarchy visible through grouping, type, spacing, and emphasis. Prefer a clear dominant task to several competing actions.
- Design relevant loading, empty, error, disabled, and success states. Keep partial updates local and preserve user input through failures.
- Use real or representative content lengths. Protect readable contrast, accessible names, focus/reading order, and text resizing. Honor supported themes; do not silently add a new theme requirement.
- Keep presentation state local where practical and use the project's existing data/cache/form patterns. Introduce dependencies or restructure state only when the requested behavior or measured problem warrants it.
- Use optimistic updates only where recovery is understandable and safe for the action. Never invent successful payments or durable saves before confirmation.
- Give motion a purpose. Prefer existing native or browser behavior when it meets the need, respect reduced motion, and measure performance before claiming an improvement.

Build within the user's authorized scope. Do not add unrelated features, analytics, backend migrations, or paid assets merely because references contain them.

## Verify and report

Run the affected surface and inspect it using [the verification workflow](references/verification.md). Exercise the important interaction and adjacent navigation/state paths, fix observed defects, and recheck the changed behavior. Scale verification to the change rather than promising endless perfection.

Apply the [copy and design review](references/copy-and-design.md) and correct findings directly. For a new app or substantial flow, assess the complete affected journey, including exits and recovery, rather than judging isolated screens.

Report the resulting behavior, important design choices and reference links, the checks actually performed, and any remaining limitations. If no runtime was available, distinguish implementation from pending visual/interaction verification. Recordings can reveal visible defects; they do not prove frame rate or release-device performance.
