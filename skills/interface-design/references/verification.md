# Verify the running interface

## Choose checks that match the change

Run the project's relevant existing checks first. Open the affected interface in its target runtime and actually inspect the rendered result. Code review and a successful build do not establish visual or interaction quality.

Compare the result against the intended hierarchy, spacing, content, controls, and relevant inspected references. Exercise the primary interaction, its failure/recovery state, and nearby navigation affected by the change. Fix observed defects and recheck the changed paths.

For a small spacing fix, targeted visual checks may suffice. For onboarding or checkout changes, exercise the full affected flow and its important exits. Do not require a full-app recording for a change that cannot affect it.

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

## Motion and performance evidence

When motion changes, exercise transitions, interrupted gestures, repeated taps, and keyboard movement. Use a recording if tools support recording and inspecting it; watch the relevant interval for visible flashes, clipping, or jumps.

Do not equate a recording's encoding frame rate with application frame rate. Report measured performance only with profiler/instrumentation evidence and the build/device/browser used. If release-device testing is unavailable, report that specific limitation rather than substituting simulator observation.

## Completion report

State the resulting behavior and significant design choices, with canonical links for references actually used. List the meaningful checks that ran and any unresolved defects or limitations.

If browser/simulator tools, authentication, dependencies, or data prevent a check, identify what is unverified. Complete independent work, but do not claim the blocked runtime check passed. Stop iteration when the scoped acceptance criteria pass or a concrete blocker prevents further verification, not at an undefined promise of perfection.
