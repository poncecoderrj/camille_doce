# Graph Report - entre-sinos  (2026-10-22)

## Corpus Check
- 28 files · ~1,130,360 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 261 nodes · 330 edges · 18 communities (12 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `33ac237d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DualStage.svelte
- zod
- package.json
- WardrobeModal.svelte
- compilerOptions
- PhoneShell.svelte
- compilerOptions
- devDependencies
- DialogueBox.svelte
- gameState
- PaperdollActor.svelte
- Svelte + TS + Vite
- tsconfig.json
- AnimeProtagonistDisplay.svelte

## God Nodes (most connected - your core abstractions)
1. `gameState` - 25 edges
2. `compilerOptions` - 15 edges
3. `compilerOptions` - 10 edges
4. `lucide-svelte` - 6 edges
5. `EquippedOutfit` - 6 edges
6. `scripts` - 5 edges
7. `Choice` - 5 edges
8. `DialogueNode` - 5 edges
9. `zod` - 4 edges
10. `triggerBlink()` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (18 total, 6 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.09
Nodes (16): lucide-svelte, isLight, locations, { onClose }, Props, activeImg, backgroundImages, { location, timeOfDay = 'manha', isLight = false } (+8 more)

### Community 1 - "zod"
Cohesion: 0.40
Nodes (4): zod, BoyCharacterProps, CharacterExpression, CharacterExpressionEnum

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, dexie, howler, lucide-svelte, zod, name, private, scripts (+20 more)

### Community 3 - "WardrobeModal.svelte"
Cohesion: 0.08
Nodes (25): ACCESSORIES, BODY_ARCHETYPES, BODY_PRESETS, EYE_COLORS, HAIR_COLORS, HAIR_STYLES, OUTFIT_OPTIONS, OUTFIT_PRESETS (+17 more)

### Community 4 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 5 - "PhoneShell.svelte"
Cohesion: 0.11
Nodes (15): activeWallpaper, backupFeedback, calendarEvents, chatLogs, contacts, emails, feedPosts, isPlayingAudio (+7 more)

### Community 6 - "compilerOptions"
Cohesion: 0.14
Nodes (13): @tsconfig/svelte/tsconfig.json, compilerOptions, allowArbitraryExtensions, allowJs, checkJs, module, moduleDetection, noEmit (+5 more)

### Community 7 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, svelte, svelte-check, @sveltejs/vite-plugin-svelte, tailwindcss, @tailwindcss/vite, @tsconfig/svelte, @types/howler (+4 more)

### Community 8 - "DialogueBox.svelte"
Cohesion: 0.07
Nodes (28): displayedText, isAutoPlay, isLight, isTyping, { node, onSelectChoice, onTogglePhone, onOpenHistory }, Props, speakerAccent, speakerAccents (+20 more)

### Community 10 - "PaperdollActor.svelte"
Cohesion: 0.13
Nodes (14): CHARACTER_MANIFESTS, CHARACTER_FACIAL_METRICS, CharacterFacialMetrics, CharacterLayers, StandardExpression, { 
    characterId, 
    expression = 'neutro', 
    outfit = 'default', 
    overrideLayers = {}, 
    scale = 1, 
    flipHorizontal = false, 
    class: customClass = '' 
  }, eyeBlinkProgress, manifest (+6 more)

### Community 11 - "Svelte + TS + Vite"
Cohesion: 0.40
Nodes (4): Need an official Svelte framework?, Recommended IDE Setup, Svelte + TS + Vite, Technical considerations

### Community 14 - "AnimeProtagonistDisplay.svelte"
Cohesion: 0.13
Nodes (19): cameraTransform, eyeBlinkProgress, hasCustomHairColor, heightRatio, masterIllustration, microMassRatio, mouthOpenAmount, muscleContrast (+11 more)

## Knowledge Gaps
- **158 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+153 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 193 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lucide-svelte` connect `DualStage.svelte` to `DialogueBox.svelte`, `package.json`, `WardrobeModal.svelte`, `PhoneShell.svelte`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _158 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.08666666666666667 - nodes in this community are weakly interconnected._
- **Why does `gameState` connect `gameState` to `DualStage.svelte`, `WardrobeModal.svelte`, `PhoneShell.svelte`, `DialogueBox.svelte`, `PaperdollActor.svelte`, `AnimeProtagonistDisplay.svelte`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06854838709677419 - nodes in this community are weakly interconnected._
- **Why does `zod` connect `zod` to `DialogueBox.svelte`, `package.json`, `WardrobeModal.svelte`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Should `WardrobeModal.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.0766488413547237 - nodes in this community are weakly interconnected._