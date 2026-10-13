# Version 0.2.0 validation

Reviewed on 2026-10-14. This records packaging checks and one independent SwiftUI application evaluation of the working-tree skills. It is not a general reliability benchmark or proof of complete Apple HIG compliance.

## Repository checks

- `npm test`: four validator tests and repository validation passed.
- `npm run test:install`: exactly two skills discovered; each installed independently and both installed together. Installed contents matched source byte-for-byte, including the new references.
- Skill Creator's `quick_validate.py`: both skill entrypoints passed.
- `git diff --check`: passed.

## Evaluation setup

A fresh agent received the [Reading Queue prompt](ios-evaluation.md) and the local `interface-design` skill path, without the expected implementation or suspected defects. It built in `/private/tmp/reading-queue-eval-20261014`; no app source or screenshots are distributed with these skills. The evaluator used the working tree as it evolved, so this was an iterative evaluation, not a controlled comparison of frozen revisions. Exact evaluator model metadata was not recorded.

Environment: Xcode 27.0 (27A266a), iOS Simulator SDK 27.0, deployment target iOS 26.4. Runtime: iPhone 17 Pro simulator, iOS 26.4, device `446BD0AC-48D5-45E8-88C2-3F68D078FAC5`. The generated app is iPhone-only, bundle `dev.evaluation.readingqueue.20261014`.

The implementation uses SwiftUI `TabView`, `NavigationStack`, searchable `List`, a modal `Form`, native alerts and toggles, semantic text styles, local JSON article persistence, and `UserDefaults` preferences. Article content is invented and local; entered URLs are stored, not fetched. The agent consulted platform documentation and disclosed that it did not perform competitor-screen research.

From the workspace's `ReadingQueue` directory:

```sh
xcodebuild -project ReadingQueue.xcodeproj -scheme ReadingQueue -configuration Debug -destination 'platform=iOS Simulator,id=446BD0AC-48D5-45E8-88C2-3F68D078FAC5' -derivedDataPath /private/tmp/reading-queue-eval-20261014/DerivedData CODE_SIGNING_ALLOWED=NO build
xcodebuild -project ReadingQueue.xcodeproj -scheme ReadingQueue -configuration Debug -destination 'platform=iOS Simulator,id=446BD0AC-48D5-45E8-88C2-3F68D078FAC5' -derivedDataPath /private/tmp/reading-queue-eval-20261014/DerivedData -resultBundlePath /private/tmp/reading-queue-eval-20261014/JourneyChecked.xcresult -parallel-testing-enabled NO CODE_SIGNING_ALLOWED=NO -only-testing:ReadingQueueUITests test
```

Use a fresh result-bundle path when repeating the test. `--reset-fixtures` resets this evaluation app's fixtures; `--demo-states` exposes controlled error and empty-state previews.

## Observed results

Build passed. The final `JourneyChecked.xcresult` and `test-checked.log` report two UI tests with zero failures. Their 74.207-second duration measures test execution, not application performance.

| Check | Result and evidence |
| --- | --- |
| Browse and navigation | Passed UI assertions: seeded queue → detail → back. |
| Input and cancellation | Passed: blank title and invalid URL validation retain input; Keep Editing preserves the draft; Discard creates no article. |
| Save failure and retry | Passed: injected one-shot failure retains input; Retry saves exactly one row. This does not establish rapid-tap protection. |
| Persistence | Passed: saved article and reading-text preference survive termination and relaunch. Draft survival across termination was not promised or tested. |
| Empty and load-error states | Passed: empty preview → restore, and load-error preview → retry. These use controlled previews rather than corrupting stored files. |
| Search | Passed: title query filters unrelated rows, detail/back retains the query, and no-results Clear Search restores the list. |
| Test controls | Passed: normal launch hides demo controls. |
| Visual inspection | Inspected queue, detail, invalid form, cancellation, save failure, empty, load-error, no-results, and normal Preferences captures. Final queue inspected in light and dark. Native bars and controls were present; ordinary-size captures showed no unexpected clipping. |
| Larger text | Partial: reviewer inspected the queue at extra-large and accessibility-extra-extra-extra-large. Rows reflowed; the native large title truncated to “Reading Qu…” at the largest setting. Full-flow reachability and assistive-technology behavior remain unverified. |
| Motion and performance | Unverified: no complete-flow recording review, physical-device profiling, frame-rate or responsiveness measurements. |

## Defects and corrections

1. **Test controls exposed to users.** The first pass placed demo controls in normal Preferences. They were gated behind `--demo-states`, with a normal-launch UI assertion. The verification reference now explicitly keeps fault injection behind test/debug configuration or launch arguments.
2. **Cancellation presentation.** On this runtime, a `confirmationDialog` rendered as a popover without the explicit cancel-role Keep Editing button expected by the test. The app switched to a native alert with explicit Keep Editing and Discard actions, then passed the cancellation checks.
3. **Text contrast.** The reviewer sampled the first-pass category caption at approximately RGB(0, 205, 217) on white, about 1.96:1 contrast. Captions changed to semantic primary text, and light-mode action tint was darkened. The iOS reference now warns that a system accent color does not automatically meet the contrast needs of small text. Final light/dark screenshots were inspected; no claim is made that every color/state was measured.
4. **Test-driver targeting.** An initial XCTest tap hit the toggle label without enabling failure injection. The driver was corrected to tap the control and assert its enabled state before saving. This was a test defect, not evidence of a broken save path. The error/retry section was also moved above the fields for visibility.

The original source is retained at `evidence/ContentView.first-pass.swift`. Final screenshots include `evidence/final-light.png`, `evidence/final-dark.png`, `evidence/final-runtime/01-queue.png` through `09-normal-preferences.png`, `evidence/reviewer-xl.png`, and `evidence/reviewer-accessibility-xxxl.png`. Failed attempts and an incomplete initial result bundle remain distinguishable from the passing final run.

## Limits and environment restoration

The direct Xcode device-interaction tool required iOS 27 and rejected the available iOS 26.4 runtime. Initial CoreSimulator attempts were unstable; direct simulator boot/install and nonparallel XCTest succeeded.

No Expo, UIKit-only, Android, or browser implementation was evaluated. Smaller iPhones, other OS versions, physical devices, landscape, localization/RTL, VoiceOver, Reduce Motion, Reduce Transparency, Increase Contrast, edge-back gestures, dirty-sheet dragging, tab reselection, backgrounding mid-draft, rapid taps, full keyboard appearance/dismissal, loading appearance, and real disk-full/corrupt-file recovery remain unverified. iPad is outside this sample app's supported device family. Native scroll views were visible, but end-of-list reachability at all text sizes was not asserted.

Simulator appearance was restored to light and content size to its original `large` setting. The uniquely identified evaluation app and temporary artifacts remain available for inspection. This run supports the documented native SwiftUI choices and tested flows; it does not validate every new scenario or establish complete accessibility conformance.
