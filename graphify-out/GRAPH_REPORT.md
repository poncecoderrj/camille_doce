# Graph Report - entre-sinos  (2026-10-22)

## Corpus Check
- 27 files · ~1,131,457 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 265 nodes · 345 edges · 19 communities (12 shown, 7 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ca5e4121`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DualStage.svelte
- DialogueBox.svelte
- package.json
- ProtagonistCustomizerModal.svelte
- compilerOptions
- PhoneShell.svelte
- compilerOptions
- devDependencies
- CharacterSprite.svelte
- gameState
- Svelte + TS + Vite
- tsconfig.json
- VisualNovelActor.svelte
- ProtagonistActor.svelte

## God Nodes (most connected - your core abstractions)
1. `gameState` - 25 edges
2. `compilerOptions` - 15 edges
3. `compilerOptions` - 10 edges
4. `lucide-svelte` - 6 edges
5. `scripts` - 5 edges
6. `Choice` - 5 edges
7. `DialogueNode` - 5 edges
8. `triggerBlink()` - 4 edges
9. `step()` - 4 edges
10. `step()` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (19 total, 7 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.09
Nodes (16): lucide-svelte, isLight, locations, { onClose }, Props, activeImg, backgroundImages, { location, timeOfDay = 'manha', isLight = false } (+8 more)

### Community 1 - "DialogueBox.svelte"
Cohesion: 0.09
Nodes (22): zod, displayedText, isAutoPlay, isLight, isTyping, { node, onSelectChoice, onTogglePhone, onOpenHistory }, Props, speakerAccent (+14 more)

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, dexie, howler, lucide-svelte, zod, name, private, scripts (+20 more)

### Community 3 - "ProtagonistCustomizerModal.svelte"
Cohesion: 0.08
Nodes (27): BACKPACK_OPTIONS, BODY_ARCHETYPES, BOY_REACTIONS, HAIR_COLORS, HAIR_STYLES, OUTFIT_OPTIONS, BackpackEnum, BackpackOption (+19 more)

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

### Community 8 - "CharacterSprite.svelte"
Cohesion: 0.20
Nodes (9): ProtagonistCustomization, PersonagemId, characterProfiles, isLight, isProtagonist, profile, Props, protagonistCustomization (+1 more)

### Community 11 - "Svelte + TS + Vite"
Cohesion: 0.40
Nodes (4): Need an official Svelte framework?, Recommended IDE Setup, Svelte + TS + Vite, Technical considerations

### Community 14 - "VisualNovelActor.svelte"
Cohesion: 0.14
Nodes (18): CHARACTER_MANIFESTS, CHARACTER_FACIAL_METRICS, CharacterId, CharacterManifest, FacialMetrics, StandardExpression, { 
    characterId, 
    expression = 'neutro', 
    scale = 1, 
    flipHorizontal = false, 
    customClass = '' 
  }, eyeBlinkProgress (+10 more)

### Community 18 - "ProtagonistActor.svelte"
Cohesion: 0.15
Nodes (16): resolveBackpackAsset(), resolveProtagonistMasterIllustration(), backpackAsset, cameraOrigin, cameraTransform, {
    customization,
    cameraFocus = 'corpo_inteiro',
    scale = 1,
    flipHorizontal = false,
    customClass = ''
  }, eyeBlinkProgress, faceTexture (+8 more)

## Knowledge Gaps
- **149 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+144 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 190 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `gameState` connect `gameState` to `DualStage.svelte`, `DialogueBox.svelte`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`, `CharacterSprite.svelte`, `VisualNovelActor.svelte`, `ProtagonistActor.svelte`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _149 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.08666666666666667 - nodes in this community are weakly interconnected._
- **Why does `lucide-svelte` connect `DualStage.svelte` to `DialogueBox.svelte`, `package.json`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Should `DialogueBox.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.0873015873015873 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06854838709677419 - nodes in this community are weakly interconnected._