# Mobbin adapter

Read before making Mobbin calls. This documents the connected tool contracts reviewed on 2026-09-09. Live tool descriptions and schemas take precedence if the service changes.

## Discover by service and capability

Confirm that the tool belongs to Mobbin from its description/provider, not merely that its name contains "search". Typical capability names are `search_screens`, `search_flows`, and `search_sections`; some hosts prefix these with a server name or `mobbin_`. Discover them at runtime rather than embedding a host-specific namespace.

| Need | Capability | Arguments and limits |
| --- | --- | --- |
| One screen, page, or component in context | Screen search | `query`, `platform: "ios"` or `"web"`; optional `limit`, `mode: "standard"` or `"deep"`, `exclude_screen_ids`, `image_format`, `task_intent`. No page or cursor argument in the reviewed schema. |
| A multistep journey | Flow search | `query`, `platform: "ios"` or `"web"`; optional `limit`, `page` (1-based, maximum 20), `image_format`, `task_intent`. Follow `has_next_page` only when more evidence is needed. |
| A website hero, pricing block, footer, or other section | Section search | `query`; optional `limit`, `page` (1-based), `image_format`, `task_intent`. No platform argument. Follow `has_next_page` as needed. |

Use `standard` for straightforward screen queries; use `deep` when nuanced requirements or weak initial matches justify it. The deprecated `fast` alias is unnecessary. For additional screen results, refine the question or exclude inspected IDs; do not invent cursor pagination.

The current tools do **not** expose app revenue/download rankings, credit balances, saved boards, similar-screen lookup by ID, full-app enumeration, or Android-specific search. Do not translate Appllama operations into fictional Mobbin endpoints.

For Android work, iOS results can illustrate transferable hierarchy and content patterns. Label the source platform and validate controls, back behavior, and presentation using Android evidence/runtime. Do not label iOS examples Android results.

## Write one concrete query per call

Describe visible content and its arrangement, or a single journey. Use the dedicated platform field for screens/flows; do not repeat the platform in the query. Avoid disconnected keyword lists, negations, or vague adjectives such as "modern".

Examples (pass these objects to the discovered matching tool):

```json
{"query":"pricing section with three plans and a feature comparison table","limit":3,"page":1}
```

```json
{"query":"analytics dashboard with a revenue chart and a recent transactions table","platform":"web","limit":4,"mode":"standard"}
```

```json
{"query":"onboarding with personalization questions followed by notification permission","platform":"ios","limit":3,"page":1}
```

For screens and flows, naming an app in the query can narrow the search (for example, "Duolingo onboarding with personalization questions"). Do not assume a dedicated app-ID filter exists.

When sending `task_intent`, use one short English sentence summarizing the overall task and keep it identical across the task's calls. Never include verbatim user messages, conversation history, file contents, or personal data. Generalize sensitive briefs into interface needs before searching.

## Read the results accurately

Screen results include IDs, app names, platform, `image_url`, and `mobbin_url`. Flow results include a canonical URL, screen count, and screens with positions and image URLs; inline images may be evenly spaced previews. Section results include site names, image URLs, and canonical URLs.

Inspect inline images first. If you need a particular returned screen that was not shown inline, use an allowed image-viewing path for its returned URL. A returned URL alone is not proof that you inspected the image. Report inspected positions and omitted steps when coverage matters. Never infer motion from a static sequence.

Cite each reference you discuss using its returned `mobbin_url`. Do not construct canonical links from guessed IDs. Current image URLs expire after 30 days; prefer canonical links and IDs in durable notes. Re-run the relevant search if a media URL expires; there is no direct get-by-ID tool in the reviewed interface.

Use `image_format: "jpg"` if the host cannot render WebP. Keep result limits small enough to inspect the images rather than filling the context with unused references.

## Failures

- No results: refine the visible requirements or broaden one constraint; report if relevant evidence remains unavailable.
- Authentication/connection failure: explain what connection is needed, use supplied references, and continue independent analysis.
- Rate limit: respect the tool's retry guidance; avoid repeated calls while limited.
- Changed schema or unsupported arguments: reread the live schema and correct the request. Do not repeatedly retry the same failing call.
- Media unavailable: describe only verified metadata and mark visual analysis incomplete.

Connection instructions: [Mobbin MCP](https://mobbin.com/mcp). Connecting the service is separate from installing this skill.
