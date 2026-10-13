# Motion and interaction feedback

Read when changing transitions, gestures, keyboard movement, or feedback. Preserve native motion before designing replacements. Use installed framework versions and current documentation; numeric values below are starting points for custom motion, not Apple requirements.

## Choose the behavior

| Interaction | Default |
| --- | --- |
| Frequent navigation, tab changes, scrolling, keyboard | Native behavior; do not add another animation layer. |
| Press or selection | Immediate visible feedback. Prefer native highlight/opacity; avoid scaling dense rows and moving readable data. |
| Direct manipulation | Track the finger continuously; settle from the live position using release velocity. |
| System-driven state change | Short transition that explains the change; a restrained 150–300 ms is a useful starting range. |
| Rare celebration | Deliberate brand moment only when warranted; no routine confetti or perpetual decorative movement. |

Name the purpose: feedback, continuity, state change, explanation, or a brand moment. Delete movement that does not serve one. Use a shared motion vocabulary; exits can be quicker than entrances, but do not override platform transitions to enforce a timing rule.

## Custom gestures

Capture the current position when grabbed, including during an unfinished animation. Choose the destination from distance and projected momentum so a flick can complete naturally. Respect boundaries, cancellation, scroll handoff, and the ability to grab again mid-settle. Test slow drag, fast flick, reversal, interruption, and repeated taps.

In React Native, keep per-frame gesture/animation work on the supported UI-thread path using shared values/worklets when installed libraries provide it. Avoid React state updates and JS round trips on each gesture frame. Bridge only discrete effects that need it. Reanimated and Worklets APIs vary by major version; verify imports and supported accessors rather than pasting an old `runOnJS` or spring example.

In SwiftUI/UIKit, use native transitions first and framework animation/gesture primitives for custom content. Keep expensive work out of the main-thread interaction path. Prefer transforms/opacity for custom effects when they fit; measure unavoidable layout animation. Do not animate every recycled list row on re-entry.

## Keyboard, accessibility, and haptics

Use system keyboard layout/animation coordination or the project's tested native wrapper. Do not guess the keyboard's duration from an event and run a second competing animation. Inspect appearance and dismissal, including inside a sheet and while navigating back.

Honor Reduce Motion using a nonspatial or immediate state change that preserves meaning. Let system transitions honor system settings themselves. Avoid an animated fallback if even a fade interferes with the task. Haptics accompany appropriate visible feedback; do not double-trigger feedback supplied by a native control.

## Verify

Run the affected flow, including interrupted gestures, keyboard movement, back, and sheet cancellation. Record and inspect at normal speed and around suspect frames for flashes, clipping, jumps, and wrong-theme surfaces. Recordings establish visible behavior, not measured FPS. Use [performance](performance.md) for performance claims and [verification](verification.md) for completion.

Sources: [Apple motion](https://developer.apple.com/design/human-interface-guidelines/motion), [Reanimated performance](https://docs.swmansion.com/react-native-reanimated/docs/guides/performance/), [Reanimated reduced motion](https://docs.swmansion.com/react-native-reanimated/docs/guides/accessibility/).
