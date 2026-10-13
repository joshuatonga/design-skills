# Design Skills

Study real interfaces. Build with a clear design direction. Verify the result where people use it.

Two agent skills for turning design references into thoughtful web and mobile interfaces. Use them together, or install just the one you need.

| Skill | What it does | Use it for |
| --- | --- | --- |
| [design-research](skills/design-research/SKILL.md) | Finds and inspects real examples through Mobbin, then turns observations into design decisions. | Reference gathering, screen critiques, onboarding and checkout research, component studies. |
| [interface-design](skills/interface-design/SKILL.md) | Applies research through web, mobile, and iOS guidance, then checks the running interface. | Websites, web apps, SwiftUI/UIKit and Expo / React Native screens, and polishing existing interfaces. |

## Install

Use the [Skills CLI](https://github.com/vercel-labs/skills) with Node.js and npm available:

```sh
npx skills add joshuatonga/design-skills
```

Choose either or both skills and your coding agent in the installer. Supported agents include Codex, Claude Code, and Cursor; see the CLI for the current list.

```sh
# See the two available skills
npx skills add joshuatonga/design-skills --list

# Install one skill
npx skills add joshuatonga/design-skills --skill design-research
npx skills add joshuatonga/design-skills --skill interface-design

# Install both for Codex in this project
npx skills add joshuatonga/design-skills --skill design-research interface-design --agent codex

# Make both available across your projects instead
npx skills add joshuatonga/design-skills --skill design-research interface-design --agent codex --global
```

Installation adds instructions to your agent. It does not connect Mobbin, change your application, or install application dependencies.

## Connect your references

For live reference searches, connect Mobbin through your agent's Mobbin plugin/app **or** the [Mobbin MCP setup](https://mobbin.com/mcp). Use an account with MCP access and complete authentication in your agent. One working connection is sufficient.

The research skill discovers the connected tools by their capabilities. It supports plugin and direct MCP connections without depending on a specific tool-name prefix. It can search screens, user flows, and website sections. If Mobbin is unavailable, it can still inspect references you provide and clearly identify any research gaps.

Mobbin is the supported search integration in this release. The repository's neutral name does not imply integrations with other design libraries.

## Try it

**Research a decision**

> Use design-research to compare web pricing sections with a plan comparison table. Show the references, explain the tradeoffs, and recommend a structure. Keep this to research.

**Improve a web interface**

> Use interface-design to improve this dashboard. Keep the existing component library, study relevant references, and check the result at narrow and wide widths and with keyboard navigation.

**Build a mobile flow**

> Use design-research and interface-design to build onboarding for this Expo app. Study relevant flows, explain the navigation choices, and test completion, skip, and back behavior.

**Work from your own reference**

> Use interface-design to implement the attached reference in this project. Preserve our typography and colors, and tell me which runtime checks you could complete.

Skill invocation syntax varies by agent. You can also ask naturally; each skill includes a description for automatic selection.

## How they work

1. **Frame the question.** Identify the audience, platform, existing design system, and the decision that research should resolve.
2. **Inspect the evidence.** Look at relevant images and flows, retain source links, and separate observed patterns from assumptions.
3. **Choose a direction.** Define hierarchy, controls, states, and navigation for your product. References inform the design; they are not a template to copy wholesale.
4. **Build and verify.** Use the existing stack, run the affected interface, compare it against the intended direction, and report what was actually checked.

Research scales with the task. There is no mandatory screenshot quota, new UI framework, or fixed visual style.

For iOS, the skill defaults to native bars, controls, and presentations, with Apple HIG links and framework-specific mappings. Supporting references cover navigation and state, motion, measured performance, asset preparation, and product copy. Every interface change includes a final copy/design review. Substantial mobile flows include device, accessibility, failure, and lifecycle checks, with unavailable coverage reported explicitly.

## Platform support

| Target | References | Implementation guidance |
| --- | --- | --- |
| Websites and web apps | Mobbin web screens, flows, and website sections | Responsive layout, semantic HTML, keyboard/focus behavior, forms, browser history, and browser verification. |
| iOS apps | Mobbin iOS screens and flows; Apple HIG for platform behavior | SwiftUI/UIKit and Expo / React Native mappings; native bars/controls, typography, symbols, materials, navigation, accessibility, and simulator/device verification. |
| Android apps | iOS examples for transferable patterns, plus supplied Android references | Expo / React Native with Android-specific behavior checked on Android. Mobbin's current tools do not expose Android-specific search. |

Existing project choices take precedence. Mobile examples do not require migrating another stack to Expo. Browser targets, including Expo web, need web verification; an iOS simulator result does not validate a browser or Android build.

Running UI checks requires the appropriate browser, simulator, emulator, or device tools in your environment. Missing access is reported, not treated as a passing check. The skills can be installed separately and do not require one another.

Repository tests validate packaging; application quality needs behavioral evaluation. See the [iOS evaluation procedure](tests/ios-evaluation.md) and [validation record](tests/validation.md) for the checks actually performed and their limits.

## Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for local checks and how to propose a change. Release notes are in [CHANGELOG.md](CHANGELOG.md).

## Credits and license

Adapted from [Appllama's skills](https://github.com/Appllama/appllama-skills), with Mobbin research support and a separate web workflow. See [ATTRIBUTION.md](ATTRIBUTION.md) for the source revision and changes.

[MIT licensed](LICENSE). Reference images and third-party product assets are not distributed by this repository and are not covered by its license.
