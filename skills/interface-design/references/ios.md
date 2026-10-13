# iOS interfaces

Read for every iOS design or implementation task alongside the shared mobile guide. Start from the project's deployment target, SDK, framework, and supported devices. Use current Apple HIG for platform decisions and matching framework documentation for APIs. These mappings are starting points, not a reason to migrate a working app.

## Native structure first

Use system navigation bars, tab bars, toolbars, controls, and presentations by default. Brand the content and use supported customization before replacing system chrome. If a custom component is necessary, state the product need and verify equivalent semantics, hit regions, focus, gestures, scaling, and appearance. Looking native in a screenshot is insufficient.

| Need | SwiftUI | UIKit | Expo / React Native |
| --- | --- | --- | --- |
| Hierarchical navigation | `NavigationStack`, navigation title, toolbar items | `UINavigationController`, `navigationItem` | Existing native-stack navigator / Expo Router `Stack`; native header options |
| Peer destinations | `TabView`, independent navigation state per tab | `UITabBarController` | Native tabs when supported and appropriate; distinguish them from JavaScript/custom tabs |
| Search within a collection | `.searchable` in the relevant navigation/content scope | `UISearchController` | Native header search options when supported |
| Action | `Button` with semantic role and suitable system style | `UIButton` with supported configuration | Existing accessible button; native wrapper where needed. A `Pressable` alone is not a system-styled iOS button. |
| Collection / grouped settings | `List` / `Form`, sections and native row behavior | Table/collection views and list configurations | Existing virtualized list and platform-appropriate row/section components |
| User-requested refresh | `.refreshable` where supported | `UIRefreshControl` | `RefreshControl` on the existing scroll/list surface |
| Toggle, range, date | `Toggle`, `Slider`, `DatePicker` | `UISwitch`, `UISlider`, `UIDatePicker` | Native controls or maintained native wrappers compatible with installed versions |
| Small mutually exclusive choice | `Picker` with appropriate style | `UISegmentedControl` where options fit | Native segmented-control wrapper; picker/menu for longer choices |
| Item actions / confirmation | `Menu`, `.contextMenu`, `.confirmationDialog`, `.alert` | `UIMenu`, context menu interaction, `UIAlertController` | Native menu/alert/action-sheet wrapper; avoid recreating item actions as a web dropdown |
| Bounded task / short sheet | `.sheet`, presentation detents where supported | Sheet presentation controller | Navigator modal / form-sheet presentation or existing suitable sheet library |
| Share / photo / browser | `ShareLink`, `PhotosPicker`, system-controller bridge as needed | Activity, photo-picker, Safari controllers | Compatible system share, photo-picker, and browser modules |

Check availability before using these mappings. Expo's native-tab import path and component API vary by SDK; native tabs are not interchangeable with every JavaScript-tab customization. Preserve an existing navigator for a scoped change and explain any native-fidelity limitation rather than silently replacing routing.

## Bars, scrolling, and presentation

- Let the navigator own the title, back button, and large-title collapse. Use large titles for suitable top-level collections, inline titles for compact detail/task contexts. Avoid a second title row that duplicates a native header.
- Use tabs for destinations and toolbar buttons for actions. Keep destination labels recognizable, preserve state between tabs, and avoid hiding a destination because it is empty. Prefer a small understandable set over overflow; do not force an arbitrary tab count.
- Keep the tab hierarchy visible during normal drill-in navigation. A self-contained modal can cover it. On iPad, use adaptive tabs/sidebar or split navigation where it fits the content.
- Give sheets appropriate detents or content sizing, correct inner-scroll/drag handoff, and a clear completion/cancellation model. Verify keyboard-up dismissal and unsaved-work handling. Do not force every sheet to a guessed percentage height.
- Let backgrounds extend under bars where appropriate while keeping controls and final rows reachable. Use safe-area APIs and automatic scroll insets; avoid duplicate padding when the navigator already accounts for it.
- Verify the scroll edge at rest and after scrolling: title transition, bar legibility, last row, bottom accessory, home indicator, and focused input. Do not hard-code status-bar height or collapse distance.

Sources: [Apple tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars), [SwiftUI navigation](https://developer.apple.com/documentation/swiftui/navigation), [UIKit navigation bars](https://developer.apple.com/documentation/uikit/customizing-your-app-s-navigation-bar), [Expo Stack](https://docs.expo.dev/router/advanced/stack/), [Expo native tabs](https://docs.expo.dev/router/advanced/native-tabs/).

## Type, color, symbols, and materials

Use semantic text roles such as title, headline, body, and footnote rather than unrelated fixed sizes. SwiftUI text styles and UIKit preferred fonts provide the starting point; custom fonts need scaled metrics. In React Native, preserve font scaling and test the actual type ramp. Use monospaced/tabular digits when changing numbers would otherwise shift layout, and allow selection for useful copyable data.

Use SF Symbols for familiar iOS actions when suitable, with weight/scale aligned to adjacent text. Prefer the system's selected-symbol treatment; check framework behavior before manually switching outline/filled variants. Keep brand artwork distinct from UI symbols. Localize labels, dates, numbers, and currency using formatters; compact notation is a context choice, not a universal money-format rule. Use leading/trailing layout and test long translations and RTL when supported.

Choose colors by role: text, secondary text, background, grouped surface, separator, accent, and status. Use adaptive system colors or equivalent tested product tokens; avoid freezing system colors as copied hex values. Start new iOS apps with light/dark support unless the brief calls for a fixed appearance. Preserve an intentional existing theme policy, but check system sheets, keyboards, and transitions against it.

A system accent color is not automatically suitable for small text on a content background. Measure contrast for the actual foreground/background pair and text role in supported appearances; prefer semantic text colors or a tested adaptive brand token for captions. Native components do not validate the contrast of custom content you put inside them.

For implementation, use SwiftUI semantic foreground styles and adaptive `Color` assets, UIKit semantic `UIColor` values, or React Native [PlatformColor](https://reactnative.dev/docs/platformcolor)/[DynamicColorIOS](https://reactnative.dev/docs/dynamiccolorios) and the project's theme tokens as appropriate. Verify compatibility before passing native color objects into a custom animation library. SwiftUI safe-area modifiers, UIKit safe-area layout guides, or React Native safe-area insets and responsive window dimensions should drive layout; manual device-size tables should not.

Let native components supply their current OS materials. On OS/SDK combinations that provide Liquid Glass, keep it in the controls/navigation layer and avoid spreading it across content cards. Test Reduce Transparency and Increase Contrast. Older supported versions need a supported native fallback, not a hand-painted imitation. Use continuous corners for custom rounded surfaces when appropriate, a documented radius scale, and shadows only to communicate layering; system controls retain their own shapes.

Sources: [Apple typography](https://developer.apple.com/design/human-interface-guidelines/typography), [color](https://developer.apple.com/design/human-interface-guidelines/color), [SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols), [materials](https://developer.apple.com/design/human-interface-guidelines/materials), [Dynamic Type](https://developer.apple.com/videos/play/wwdc2024/10074/).

## Accessibility and feedback

For custom touch controls, use at least a 44 × 44 pt target as the normal iOS baseline; visible artwork can be smaller. Keep neighboring hit areas distinct. Retain native component sizing and verify accessibility rather than imposing a visual rectangle on every system item. See [Apple buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) for hit regions and press states.

Test ordinary text size, XL, and an accessibility size; XL alone is not an accessibility-size test. Permit wrapping and vertical growth, and rearrange crowded rows rather than shrinking text or disabling scaling. Check VoiceOver names, traits, values, reading order, adjustable controls, and focus after presentation/dismissal. Icon-only buttons need action names; decorative images should not become extra stops. Convey selection and errors through more than color.

Use system feedback first. Add haptics for meaningful selection or outcomes only when appropriate; avoid duplicating native feedback, triggering it on every render, or making it the sole confirmation. Simulator observation cannot establish physical haptic quality.

Read [verification](verification.md) for the device/state matrix. Check [Apple accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) and [React Native accessibility](https://reactnative.dev/docs/accessibility) for implementation-specific support.
