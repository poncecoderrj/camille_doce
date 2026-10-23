# Graph Report - entre-sinos  (2026-10-23)

## Corpus Check
- 30 files · ~1,135,500 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 304 nodes · 415 edges · 20 communities (12 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1167e0a8`
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
- TitleScreen.svelte
- gameState
- Svelte + TS + Vite
- tsconfig.json
- VisualNovelActor.svelte
- ProtagonistActor.svelte
- audioManager

## God Nodes (most connected - your core abstractions)
1. `gameState` - 35 edges
2. `audioManager` - 15 edges
3. `compilerOptions` - 15 edges
4. `compilerOptions` - 10 edges
5. `lucide-svelte` - 7 edges
6. `scripts` - 5 edges
7. `svelte` - 5 edges
8. `Choice` - 5 edges
9. `DialogueNode` - 5 edges
10. `triggerBlink()` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (20 total, 8 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.08
Nodes (21): lucide-svelte, isLight, locations, { onClose }, Props, EnvironmentLighting, LOCATION_PROFILES, LocationLightingProfile (+13 more)

### Community 1 - "DialogueBox.svelte"
Cohesion: 0.08
Nodes (23): zod, AudioSettings, displayedText, isAutoPlay, isLight, isTyping, { node, onSelectChoice, onTogglePhone, onOpenHistory }, Props (+15 more)

### Community 2 - "package.json"
Cohesion: 0.08
Nodes (26): dependencies, dexie, howler, lucide-svelte, zod, name, private, scripts (+18 more)

### Community 3 - "ProtagonistCustomizerModal.svelte"
Cohesion: 0.08
Nodes (28): BACKPACK_OPTIONS, BODY_ARCHETYPES, BOY_REACTIONS, HAIR_COLORS, HAIR_STYLES, OUTFIT_OPTIONS, resolveBackpackAsset(), BackpackEnum (+20 more)

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

### Community 8 - "TitleScreen.svelte"
Cohesion: 0.14
Nodes (4): svelte, isAudioSettingsOpen, isCreditsOpen, app

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
Cohesion: 0.09
Nodes (24): resolveProtagonistMasterIllustration(), ProtagonistCustomization, backpackAsset, cameraOrigin, cameraTransform, {
    customization,
    cameraFocus = 'corpo_inteiro',
    scale = 1,
    flipHorizontal = false,
    customClass = ''
  }, eyeBlinkProgress, faceTexture (+16 more)

## Knowledge Gaps
- **155 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+150 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 213 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `gameState` connect `gameState` to `DualStage.svelte`, `DialogueBox.svelte`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`, `TitleScreen.svelte`, `VisualNovelActor.svelte`, `ProtagonistActor.svelte`?**
  _High betweenness centrality (0.185) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _155 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.07956989247311828 - nodes in this community are weakly interconnected._
- **Why does `lucide-svelte` connect `DualStage.svelte` to `DialogueBox.svelte`, `package.json`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`, `TitleScreen.svelte`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Should `DialogueBox.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.08275862068965517 - nodes in this community are weakly interconnected._
- **Why does `audioManager` connect `audioManager` to `TitleScreen.svelte`, `DialogueBox.svelte`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07936507936507936 - nodes in this community are weakly interconnected._