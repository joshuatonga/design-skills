# Visual assets

Read when sourcing, generating, or preparing illustrations, images, symbols, or app icons. Reuse suitable supplied assets and the established system first. Add artwork only when it supports content or product identity.

## Art direction and production

Define subject, layout role, style family, palette, lighting/texture, and background treatment. Keep these consistent across the set. Specify clear space for adjacent UI rather than baking interface text into illustrations. Keep meaningful text in the interface so it can localize and remain accessible.

Generate or source a small candidate set when a new direction needs exploration; select and refine against the real screen. Do not impose a generation quota on an existing suitable asset. Use available image tools and inspect output rather than treating a successful tool call as approval of the artwork.

Produce enough pixels for the maximum rendered size and intended display density. For example, 200 pt at 3× needs 600 pixels across. Downscale suitable originals; do not enlarge a small raster to hide missing detail. Use vectors where suitable and supported, and supported compressed raster formats for photographs and illustrations.

Export the scale variants or asset-catalog representation required by the project. Trim with intentional consistent padding. Set a size budget appropriate to the asset's role and check decoded memory as well as download size; decorative artwork should not dominate a screen's loading cost.

## Inspect in context

- Composition fits the actual crop and does not compete with titles or actions.
- Edges are clean against the real background; inspect enlarged for halos, fringe, or unwanted mattes.
- Supported appearances work, including light/dark backgrounds where relevant.
- The set has consistent style, lighting, palette, scale, and line weight.
- There is no accidental text, watermark, malformed detail, or unlicensed third-party branding.
- Meaningful images have accessibility descriptions; decorative art adds no reading-order noise.

Use SF Symbols or the established platform icon system for standard actions instead of generating a replacement family. Never use competitor screenshots as shipping assets without appropriate rights.

## App icons and store artwork

Treat the app icon as a separate deliverable when requested. Follow current Apple icon/asset-catalog or Icon Composer requirements for the deployment target and build tools; do not assume every modern icon is one flattened PNG. For raster workflows that require a 1024 × 1024 source, meet that requirement without drawing the OS mask into the image. Check small-size recognition and all supplied appearance variants. Use available icon-specific tooling/skills when appropriate.

Store screenshots should accurately show implemented behavior and use current store device/output requirements. Keep their visual language consistent with the app. Preparing assets does not imply publishing them.

If final art cannot be produced, use an identified temporary or existing treatment and report outstanding work. Sources: [Apple app icons](https://developer.apple.com/design/human-interface-guidelines/app-icons), [Icon Composer](https://developer.apple.com/icon-composer/), [Expo images](https://docs.expo.dev/versions/latest/sdk/image/).
