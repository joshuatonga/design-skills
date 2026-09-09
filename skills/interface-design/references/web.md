# Web interfaces

Apply to websites and browser applications, including mobile browsers and Expo web. Preserve the existing framework, router, component library, and rendering strategy.

## Layout and content

Use the content's needs to determine breakpoints. Check a narrow viewport, a typical desktop width, and the transition between layouts. Prefer flexible grids, wrapping, sensible minimums, and constrained reading widths over a fixed desktop canvas squeezed onto a phone.

Keep meaningful DOM order consistent with reading and keyboard order. Make dense tables usable through an appropriate narrow-screen presentation or a clearly bounded scroll region; do not hide decision-critical values merely to fit.

Reserve image space to prevent unexpected shifts. Test realistic long headings, empty collections, validation text, and localized content where supported. Reuse established responsive patterns before introducing new ones.

## Controls and accessibility

Use semantic HTML: links for destinations, buttons for actions, labeled form fields, headings for structure, and tables for tabular data. Prefer existing accessible components over inventing keyboard interactions.

Make every interactive control reachable and understandable by keyboard. Keep focus visible. For modal dialogs, move focus appropriately, contain it while modal, support expected dismissal, and return focus to a sensible location. Avoid applying focus traps to non-modal content.

Provide text alternatives for meaningful imagery and accessible names for icon-only controls. Do not communicate errors or selected state through color alone. Verify text resizing, readable contrast, and reduced motion using the project's accessibility requirements.

Source: [MDN semantic HTML and accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML).

## Forms and navigation

Keep labels visible and associate errors with the relevant inputs. Choose appropriate input types and autocomplete. Preserve entered data through validation and recoverable request failures. Show pending state and prevent accidental duplicate submissions where needed.

Use the existing router for navigation. Check direct URLs, refresh, browser back/forward, and relevant query state. Keep links usable through standard browser actions such as opening a new tab. A completed authentication or purchase flow needs correct state guards, not history manipulation that merely hides a broken state.

Choose dialogs for bounded tasks and routes for durable destinations according to the product's existing conventions. Do not import native push/sheet rules unchanged into browser navigation.

## Motion and performance

Favor CSS and existing animation primitives for simple feedback. Keep interaction responsive and allow interruption where expected. Honor `prefers-reduced-motion` without hiding essential feedback. Avoid decorative movement that competes with the content.

Measure a reported performance problem with browser tools before changing caching or memoization. A visually smooth screen recording is not a measured frame-rate or loading-performance result.

Source: [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

## Runtime checks

Use an available browser tool or the project's existing browser test runner. Check narrow/wide layouts, keyboard-only operation, primary forms, relevant content states, browser navigation, and supported themes. Run automated accessibility checks if available, then manually exercise focus and reading order. Load the shared [verification workflow](verification.md) for reporting and limits.
