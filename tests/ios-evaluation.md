# iOS behavioral evaluation

Use after substantial changes to native implementation guidance. This is an evaluation procedure, not an automated pass claim. A single run demonstrates behavior for that prompt and environment, not general reliability.

## Setup

Install or copy only the skill being evaluated into an isolated temporary workspace. Use invented data and a unique test bundle ID. Give a fresh agent the prompt and skill path without the expected implementation or suspected failures. Record model/host information when available, skill revision, prompt, framework/SDK, and output location. Do not install globally, publish, or touch unrelated app data.

Choose a framework the environment can build. A native SwiftUI run and an Expo run test different implementation guidance; one does not validate the other. Use the current existing project for a targeted-change evaluation when available.

## Example build prompt

> Use interface-design to build a small SwiftUI iOS app called Reading Queue. People can browse saved articles, search by title, open an article's details, add an article, and change reading preferences. Use invented local data and local persistence; no account or external service. Creation must be cancellable and explain invalid input without losing what was typed. Include empty and recoverable failure states that can be exercised. Build and verify the result using the available iPhone simulator. Keep all artifacts in this temporary workspace.

For an Expo run, replace SwiftUI with the pinned Expo project and SDK supplied to the agent. Separately evaluate a small existing-screen fix to ensure the skill does not trigger an unnecessary rewrite or exhaustive research.

## Observe the result

- Did the agent load relevant references, preserve the chosen stack, and state missing research honestly?
- Do the running screens use appropriate native bars, controls, presentations, typography, symbols, and semantic colors?
- Can a user complete the task, cancel safely, return to the original location, and recover from invalid input or failure without duplicate actions?
- Are text size, supported themes, safe areas, keyboard behavior, and the available device matrix actually inspected?
- Are copy and hierarchy specific to the product rather than generic template text?
- Were recordings inspected if captured? Are performance and untested accessibility/device claims properly limited?

Compile, run, inspect, and exercise the generated output. Prefer observable UI assertions with an available runner; inspect screenshots separately. Keep the original output and subsequent fixes distinguishable. If a defect suggests a skill gap, make the narrow instruction correction and repeat the affected case; do not tune universal rules to one screenshot.

## Record

Record the exact prompt, workspace/artifact location, build and execution commands, actual device/OS, observed outcomes, defects/fixes, and unavailable checks. Use passed/failed/unavailable/not-applicable per check. Restore changed simulator settings, remove only evaluation-owned temporary apps/devices when appropriate, and retain enough evidence to reproduce the findings. Link a dated result from the repository validation record; do not commit third-party images or personal data.
