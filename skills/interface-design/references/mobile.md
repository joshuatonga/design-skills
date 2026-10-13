# Native mobile interfaces

Use for iOS and Android native targets. Implementation examples assume Expo / React Native when that matches the project. Read installed package versions and current official documentation before choosing version-sensitive APIs.

For iOS, also read [iOS platform guidance](ios.md). It contains the native component defaults and framework mappings; generic mobile guidance alone is not the iOS checklist.

## Platform fidelity

Use the target platform's established controls and navigation conventions where they fit the product. Prefer existing wrappers or native controls for switches, pickers, menus, and system sharing. A custom control must preserve accessibility and interaction behavior, not only its appearance.

Use the project's semantic tokens and supported themes. Choose iconography consistent with its platform and brand rather than mixing unrelated icon sets. Support text scaling, meaningful accessibility labels/states, logical reading order, and comfortable touch targets using platform guidance.

Use actual safe-area insets and responsive dimensions. Test content near system bars, camera cutouts, and the home indicator. Account for edge-to-edge Android layouts and the keyboard; hard-coded notch dimensions are not a layout strategy.

Source: [React Native accessibility](https://reactnative.dev/docs/accessibility).

## Navigation and state

Identify whether the destination is deeper content, a peer tab, a bounded modal task, or a replacement for a completed state. Preserve the existing navigator and its conventions.

For each new or changed flow, record its entry, presentation, completion destination, cancellation, and back behavior. Choose presentations by their relationship to the current task:

| Relationship or task | Default presentation and exit |
| --- | --- |
| Detail within the current hierarchy | Push; back returns to the source with its state intact. |
| Top-level destination | Peer tab; keep each tab's navigation and scroll state. Do not animate tab changes like pushes. |
| Bounded task such as creating an item | Modal with Cancel and a specific completion action; give multistep tasks their own stack. |
| Short filter or selection task | Sheet or popover appropriate to device/content; define immediate versus confirmed changes. |
| Immersive content | Full-screen presentation when it needs the space, with a discoverable exit. |
| Actions on an item | Native menu; confirm when the action's consequences warrant it. |
| Completed authentication, onboarding, transaction, or session | Update application state and remove invalid destinations; back must not replay the completed action. |

Share, photo selection, and browser tasks should use suitable system controllers or existing native wrappers. A deep-linkable destination needs navigable state, not only a local boolean that reveals a view.

In Expo Router, distinguish navigating to a destination, explicitly pushing a new entry, and replacing the current entry. Replacement alone does not clear every earlier invalid route; use the project's state guards and supported stack management to prevent return to completed onboarding or authentication screens.

After a feature-triggered sign-in or paywall, preserve the user's original intent and location. Do not send them to a generic home screen if they should return to the feature.

Test iOS back gestures and Android back behavior separately. Respect unsaved-work protection when required and provide clear cancellation/recovery. Preserve tab state where expected. Check deep links and initial session loading so users do not briefly see an inappropriate screen.

Test reselecting the active tab using the navigator's supported pop-to-root/scroll-to-top behavior; do not bolt on a competing gesture. Present full-attention tasks above the tab hierarchy when appropriate. Cold-start deep links need a sensible parent or explicit exit, not an orphan detail screen.

Let back dismiss transient UI before leaving a screen where the platform expects it. Do not disable back to retain people in onboarding, upsells, or rating prompts. Protect genuine unsaved work, and narrowly guard an irreversible in-flight operation only when necessary, with visible status and recovery. Cover gesture dismissal and explicit Cancel/Close.

Source: [Expo Router navigation](https://docs.expo.dev/router/basics/navigation/).

## Forms, lists, and data

Choose the correct keyboard and autofill semantics, keep focused inputs visible, and test submit/next behavior. Preserve entered content and explain validation failures near the field. Profile actual typing delays before replacing the project's controlled-input strategy.

Keep field labels available after typing. Configure secure entry and one-time-code autofill where relevant; allow password managers and paste. Choose validation timing by the task, avoiding errors before the user has had a chance to enter a value. Test keyboard appearance and dismissal inside sheets as well as full screens.

Use suitable virtualization for long or growing lists, stable identities, and appropriately sized images. Prefer the project's established list and image components; adding FlashList or a new image library is not a prerequisite for every screen.

Keep server, local presentation, and persisted state responsibilities clear while preserving the existing architecture. Optimize the measured bottleneck rather than prescribing a new store, query library, or storage engine.

Keep pending work visible and prevent duplicate submission. Preserve drafts through recoverable failure. Use layout-matched skeletons for predictable content, progressive loading otherwise; do not replace a usable screen with a spinner for a partial update. Define offline and resume behavior for flows that save or fetch data.

## Motion and testing

Use native transitions and system feedback where possible. For custom gestures, keep feedback continuous, interruptible, and consistent with release velocity using the installed animation/gesture libraries. Check supported APIs rather than copying examples for a different major version.

Haptics should complement visible feedback and platform conventions. Respect reduced motion and avoid hiding essential state changes when animation is reduced.

Inspect on the relevant simulator/emulator or device. For Android support, iOS references and an iOS-only test are insufficient. For performance-sensitive work, use profiling on a representative release build/device where available and disclose the environment actually measured.

Read [motion](motion.md), [performance](performance.md), or [assets](assets.md) when those surfaces are in scope, then the shared [verification workflow](verification.md).
