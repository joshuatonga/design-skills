# Native mobile interfaces

Use for iOS and Android native targets. Implementation examples assume Expo / React Native when that matches the project. Read installed package versions and current official documentation before choosing version-sensitive APIs.

## Platform fidelity

Use the target platform's established controls and navigation conventions where they fit the product. Prefer existing wrappers or native controls for switches, pickers, menus, and system sharing. A custom control must preserve accessibility and interaction behavior, not only its appearance.

Use the project's semantic tokens and supported themes. Choose iconography consistent with its platform and brand rather than mixing unrelated icon sets. Support text scaling, meaningful accessibility labels/states, logical reading order, and comfortable touch targets using platform guidance.

Use actual safe-area insets and responsive dimensions. Test content near system bars, camera cutouts, and the home indicator. Account for edge-to-edge Android layouts and the keyboard; hard-coded notch dimensions are not a layout strategy.

Source: [React Native accessibility](https://reactnative.dev/docs/accessibility).

## Navigation and state

Identify whether the destination is deeper content, a peer tab, a bounded modal task, or a replacement for a completed state. Preserve the existing navigator and its conventions.

In Expo Router, distinguish navigating to a destination, explicitly pushing a new entry, and replacing the current entry. Replacement alone does not clear every earlier invalid route; use the project's state guards and supported stack management to prevent return to completed onboarding or authentication screens.

After a feature-triggered sign-in or paywall, preserve the user's original intent and location. Do not send them to a generic home screen if they should return to the feature.

Test iOS back gestures and Android back behavior separately. Respect unsaved-work protection when required and provide clear cancellation/recovery. Preserve tab state where expected. Check deep links and initial session loading so users do not briefly see an inappropriate screen.

Source: [Expo Router navigation](https://docs.expo.dev/router/basics/navigation/).

## Forms, lists, and data

Choose the correct keyboard and autofill semantics, keep focused inputs visible, and test submit/next behavior. Preserve entered content and explain validation failures near the field. Profile actual typing delays before replacing the project's controlled-input strategy.

Use suitable virtualization for long or growing lists, stable identities, and appropriately sized images. Prefer the project's established list and image components; adding FlashList or a new image library is not a prerequisite for every screen.

Keep server, local presentation, and persisted state responsibilities clear while preserving the existing architecture. Optimize the measured bottleneck rather than prescribing a new store, query library, or storage engine.

## Motion and testing

Use native transitions and system feedback where possible. For custom gestures, keep feedback continuous, interruptible, and consistent with release velocity using the installed animation/gesture libraries. Check supported APIs rather than copying examples for a different major version.

Haptics should complement visible feedback and platform conventions. Respect reduced motion and avoid hiding essential state changes when animation is reduced.

Inspect on the relevant simulator/emulator or device. For Android support, iOS references and an iOS-only test are insufficient. For performance-sensitive work, use profiling on a representative release build/device where available and disclose the environment actually measured.

Use [motion and assets](motion-and-assets.md) when those surfaces are in scope, then the shared [verification workflow](verification.md).
