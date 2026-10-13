# Verify the running interface

## Choose checks that match the change

Run the project's relevant existing checks first. Open the affected interface in its target runtime and actually inspect the rendered result. Code review and a successful build do not establish visual or interaction quality.

Compare the result against the intended hierarchy, spacing, content, controls, and relevant inspected references. Exercise the primary interaction, its failure/recovery state, and nearby navigation affected by the change. Fix observed defects and recheck the changed paths.

For a small spacing fix, targeted visual checks may suffice. For onboarding or checkout changes, exercise the full affected flow and its important exits. Do not require a full-app recording for a change that cannot affect it.

For a new app or substantial flow, define acceptance criteria before the final pass: the primary journey, its exits/recovery, applicable device/settings coverage, and the intended reference comparison. A list of checks is not evidence they ran; record results as passed, failed, unavailable, or not applicable with a reason.

## Web checks

- Narrow and wide viewports, plus a layout transition where relevant; no accidental page overflow or inaccessible content.
- Keyboard navigation, visible focus, primary forms, dialogs, and focus restoration.
- Direct navigation, refresh, back/forward, and carried state where affected.
- Relevant loading, empty, error, and success states; long content; supported themes and text resizing.
- Reduced motion for changed animations; accessibility checks available in the project.

## Mobile checks

- Target iOS simulator/device and Android emulator/device when both are supported; report each separately.
- Safe areas, system bars, keyboard appearance/dismissal, text scaling, and supported themes.
- Primary actions, gestures, modal dismissal, back behavior, and adjacent state paths.
- Completed-flow guards: returning after sign-in, onboarding, or purchase must respect actual application state.
- Relevant loading, empty, error, and success states, including recoverable input/network failure.

For new mobile apps and substantial flow changes, use this matrix. For small changes, select the rows they can affect and explain any material coverage gap.

| Coverage | Exercise and inspect |
| --- | --- |
| Primary supported phone | Whole affected flow, scroll edges, system bars, bottom actions, and modal presentation/dismissal. |
| Smallest supported phone/layout | Long content, crowded toolbars, button reachability, and keyboard-up forms. A large-phone screenshot is not evidence for this row. |
| Supported iPad/tablet | Adaptive navigation, sheet/popover placement, resizing/multitasking, and orientation where supported. Do not require tablet behavior from a phone-only product. |
| OS coverage | Oldest supported and current target versions where available, especially for new material/navigation APIs. |
| Appearance | Light/dark for new dual-theme apps; intentional fixed-theme apps still need system-sheet and transition checks. |
| Text and assistive settings | Default, XL, and an accessibility text size; VoiceOver/TalkBack labels, values, order, and dismissal focus. Reduce Motion; on iOS, Reduce Transparency/Increase Contrast for affected materials. |
| Input/content | Empty and long collections, long labels, invalid input, keyboard appearance/dismissal, autofill/submit behavior, supported translations/RTL. |
| State/failure | Force loading, empty, failed, and successful states. Offline/retry must preserve input and explain what happened. Rapid taps must not duplicate submissions/navigation. |
| Lifecycle | Background mid-flow and resume. Kill/relaunch to check promised persistence and appropriate ephemeral-state reset. |
| Navigation | Back button, edge swipe/hardware back, tab switching/reselection, cancelled sheet drag, unsaved-work exit, deep-link cold start, and completed-flow guards where affected. |

Do not change a user's real data to manufacture an error. Prefer fixtures, dependency injection, local test modes, or a safe test account. Keep fault-injection and state-preview controls behind test/debug configuration or launch arguments; do not add them to ordinary product settings unless a demonstrator UI was requested. Restore simulator appearance/accessibility settings changed for the run and leave unrelated apps/data intact.

## Motion and performance evidence

When motion changes, exercise transitions, interrupted gestures, repeated taps, and keyboard movement. For new or substantially changed flows, record the full affected journey when capture and inspection tools are available; review at normal speed and inspect suspect intervals frame by frame for visible flashes, clipping, or jumps. A tiny layout fix only needs the affected interaction. If capture or playback is unavailable, exercise the flow live and disclose the missing recording review.

Use an explicit simulator ID to avoid acting on the wrong booted device. For example, `xcrun simctl io <device-id> screenshot <output.png>` or `xcrun simctl io <device-id> recordVideo <output.mov>` captures evidence; open the image or inspect the recording before making visual claims. Neither command interacts with controls. Use available UI automation or direct interaction for that, and stop recording cleanly.

Do not equate a recording's encoding frame rate with application frame rate. Report measured performance only with profiler/instrumentation evidence and the build/device/browser used. If release-device testing is unavailable, report that specific limitation rather than substituting simulator observation.

For a substantial flow with an available UI-test runner, preserve a small repeatable scenario covering the primary action, cancellation, and the highest-risk state transition. Assert observable behavior, not only the existence of a screenshot or implementation-specific view structure. Pair automation with visual inspection; neither replaces the other.

## Completion report

Apply the [copy and design review](copy-and-design.md). State the resulting behavior and significant design choices, with canonical links for references actually used. List the meaningful checks that ran, the build/device/settings used, and any unresolved defects or limitations. Keep evidence in the project's designated working area; do not commit private runtime data.

If browser/simulator tools, authentication, dependencies, or data prevent a check, identify what is unverified. Complete independent work, but do not claim the blocked runtime check passed. Stop iteration when the scoped acceptance criteria pass or a concrete blocker prevents further verification, not at an undefined promise of perfection.
