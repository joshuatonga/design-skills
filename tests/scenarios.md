# Scenario review

These are behavioral acceptance cases, not claims of automated agent evaluation. Run applicable cases against the actual skills and record observable results when changing their behavior. Do not require private Mobbin credentials for CI.

| Request / environment | Expected observable behavior |
| --- | --- |
| Research web pricing sections; Mobbin connected | Select section search with a concrete query, inspect images, cite canonical URLs, and produce a research brief without editing UI code. |
| Improve a responsive dashboard in an existing web project | Preserve its stack and components, use web evidence, and check responsive layouts, keyboard/focus, and browser navigation. Do not require mobile packages or a simulator. |
| Build onboarding in an Expo iOS + Android app | Study relevant flows with iOS references labeled; apply mobile guidance; verify completion/skip/back and state guards separately on both targets or disclose unavailable targets. |
| Fix spacing on one existing screen | Diagnose before searching, reuse adequate references, limit changes and verification to affected behavior. Do not demand 60 screenshots or redesign the whole application. |
| Mobbin missing or authentication fails | State the limitation, use supplied references, and continue independent work without fictional calls or results. |
| Only design-research installed | Complete a cited research brief without requiring interface-design or any missing sibling files. |
| Only interface-design installed | Use the standalone reference workflow and appropriate platform guide without requiring design-research files. |
| Plugin and manual Mobbin tools have different prefixes | Discover by provider/capability and inspect the live schema; use one working connection without duplicate searches. |
| Flow reports 12 screens but only 3 previews are inspected | Identify inspected positions and coverage gaps; do not claim complete inspection or observed animation behavior. |
| Images or runtime are unavailable | Distinguish metadata from visual evidence and implementation from pending runtime verification. Do not report a passed check or measured FPS. |
| User supplies a distinct brand with multiple accent colors | Preserve the design system; do not impose an arbitrary single-accent or typeface rule. |
| Build a new SwiftUI iOS app with collections, search, settings, and item creation | Read the iOS branch; use appropriate native navigation, bars, controls, and sheets. Preserve SwiftUI. Check primary actions and cancellation in a simulator; disclose missing references/runtime coverage. |
| Improve an Expo app using an older SDK | Inspect installed versions before selecting native-tab/header/sheet APIs. Preserve routing for a scoped fix; do not paste the newest SDK's imports into an older project. |
| Add a composer reached from a feature tab | Preserve the originating tab and detail state after completion/cancellation; protect unsaved input through button and gesture exits; avoid duplicate saves. |
| Polish iOS materials and typography | Let system bars retain native materials, keep content legible, and inspect supported appearances, increased text sizes, and relevant accessibility settings. |
| Fix a slow growing list or typing surface | Measure the named interaction before changing libraries/state; re-measure under comparable conditions. Do not report recording FPS as app FPS. |
| Write product UI with empty, failed, and successful states | Apply the packaged copy/design review; use specific action labels and truthful outcomes; remove filler and unsupported decoration. |
| Prepare illustrations or app icons | Preserve visual direction, inspect edges and rendered density, and verify current output requirements. Do not force legacy raster assumptions onto a layered icon workflow. |
| Build a substantial mobile flow | Exercise the relevant device/settings/state matrix, lifecycle, and full affected journey; capture/review motion where tools permit and report missing coverage. |

For repeatable application-building evaluations, use [the iOS evaluation procedure](ios-evaluation.md). Keep its results separate from packaging tests.
