# Graph Report - entre-sinos  (2026-10-22)

## Corpus Check
- 30 files · ~1,224,417 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 263 nodes · 326 edges · 15 communities (12 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a0371bd8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DualStage.svelte
- DanteAvatar.svelte
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
1. `gameState` - 23 edges
2. `compilerOptions` - 15 edges
3. `compilerOptions` - 10 edges
4. `EquippedOutfit` - 7 edges
5. `lucide-svelte` - 6 edges
6. `scripts` - 5 edges
7. `Choice` - 5 edges
8. `DialogueNode` - 5 edges
9. `zod` - 4 edges
10. `Svelte + TS + Vite` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (15 total, 3 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.08
Nodes (17): lucide-svelte, isLight, locations, { onClose }, Props, activeImg, backgroundImages, { location, timeOfDay = 'manha', isLight = false } (+9 more)

### Community 1 - "DanteAvatar.svelte"
Cohesion: 0.18
Nodes (10): zod, BoyCharacterProps, CharacterExpression, CharacterExpressionEnum, { 
    expression = 'provocador', 
    timeOfDay = 'manha',
    outfit = 'rock_padrao',
    class: customClass = '' 
  }, isAngry, isBlush, isSmile (+2 more)

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, dexie, howler, lucide-svelte, zod, name, private, scripts (+20 more)

### Community 3 - "WardrobeModal.svelte"
Cohesion: 0.06
Nodes (31): currentEye, currentHair, currentSkin, { 
    outfit, 
    zoomMode = 'corpo_inteiro', 
    interactive = false,
    class: customClass = '' 
  }, Props, viewBox, BODY_PRESETS, BodyMorphologyPreset (+23 more)

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
Cohesion: 0.23
Nodes (8): CHARACTER_MANIFESTS, CharacterLayers, CharacterManifest, StandardExpression, { 
    characterId, 
    expression = 'neutro', 
    outfit = 'default', 
    overrideLayers = {}, 
    scale = 1, 
    flipHorizontal = false, 
    class: customClass = '' 
  }, manifest, Props, resolvedLayers

### Community 11 - "Svelte + TS + Vite"
Cohesion: 0.40
Nodes (4): Need an official Svelte framework?, Recommended IDE Setup, Svelte + TS + Vite, Technical considerations

### Community 14 - "AnimeProtagonistDisplay.svelte"
Cohesion: 0.12
Nodes (15): activeArchetype, activeArtPath, cameraTransform, curveRatio, hasCustomHairColor, heightRatio, isLightHair, microMassRatio (+7 more)

## Knowledge Gaps
- **169 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+164 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 201 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lucide-svelte` connect `DualStage.svelte` to `DialogueBox.svelte`, `package.json`, `WardrobeModal.svelte`, `PhoneShell.svelte`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _169 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.08307692307692308 - nodes in this community are weakly interconnected._
- **Why does `zod` connect `DanteAvatar.svelte` to `DialogueBox.svelte`, `package.json`, `WardrobeModal.svelte`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06854838709677419 - nodes in this community are weakly interconnected._
- **Why does `gameState` connect `gameState` to `DualStage.svelte`, `DialogueBox.svelte`, `WardrobeModal.svelte`, `PhoneShell.svelte`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `WardrobeModal.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.0627177700348432 - nodes in this community are weakly interconnected._