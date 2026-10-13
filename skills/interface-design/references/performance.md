# Interface performance

Read for new substantial scrolling/input surfaces, performance-sensitive flows, or reported responsiveness problems. Preserve the project's libraries until measurement identifies a reason to change them.

## Measure the interaction

1. Reproduce a named interaction with representative data and content size.
2. Record device/runtime, build mode, starting state, and a baseline using the appropriate profiler.
3. Change the bottleneck indicated by that evidence.
4. Repeat the measurement and check correctness, memory, and accessibility for regressions.

Use release/profile builds on representative hardware for performance conclusions. A simulator and development server can expose defects but are not substitutes for device performance. Distinguish JS, main/UI-thread, rendering, network, and image costs. Do not prescribe memoization, a new store, or uncontrolled forms from component size alone.

## Common surfaces

| Symptom | Investigate and act on evidence |
| --- | --- |
| Scroll stalls or blank cells | Virtualize growing collections; stable keys, bounded row work, suitable recycling, and correctly sized images. Use existing native lists or a compatible library. |
| Typing lags | Profile per-keystroke work; isolate input state and defer expensive derived results. Preserve validation, composition/IME, autofill, and cursor behavior. |
| Transition hitch | Check heavy work during presentation and image decoding. Defer nonessential work; retain correct loading and cancellation behavior. |
| Slow first useful screen | Measure cold start separately from warm resume. Inspect synchronous initialization, storage, SDK work, and data dependencies. Resolve essential session state before navigation without leaving an indefinite splash. |
| Repeated network wait | Use existing cache and appropriate prefetching. Cancel stale requests; avoid speculative requests with side effects. Keep partial updates local. |
| Memory grows over repeated visits | Compare snapshots over enter/exit cycles; inspect subscriptions, timers, retained views, caches, and large images. Confirm memory settles rather than judging one peak. |
| Bundle/app size grows | Compare release artifacts and inspect added dependencies/assets. Investigate meaningful regressions; do not rewrite imports without evidence. |

For images, request dimensions near rendered pixel size, reserve layout space, use supported caching/placeholders, and reset recycled image identity where required. For optimistic actions, define rollback and retry without pretending an unconfirmed transaction succeeded.

## Budgets and evidence

Set task-specific budgets before optimizing. At 60 Hz the frame interval is about 16.7 ms; at 120 Hz it is about 8.3 ms. Use the device's applicable refresh rate and measured hitches/frame times rather than declaring all apps must run at one rate. Agree on startup/input latency targets appropriate to device, workload, and baseline; avoid arbitrary universal budgets.

Report before/after metrics with the same build, device, data, and procedure. Inspect visually as well: improving one number does not excuse wrong state, blank content, or dropped input. If profiling is unavailable, report observed runtime behavior and the measurement still needed.

Sources: [React Native performance](https://reactnative.dev/docs/performance), [Reanimated performance](https://docs.swmansion.com/react-native-reanimated/docs/guides/performance/), [Xcode performance measurement](https://developer.apple.com/documentation/xcode/improving-your-app-s-performance), [web performance tools](https://developer.chrome.com/docs/devtools/performance).
