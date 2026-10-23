# Graph Report - entre-sinos  (2026-10-23)

## Corpus Check
- 33 files · ~1,135,864 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 302 nodes · 407 edges · 20 communities (12 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `46d92373`
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
- CharacterProfileModal.svelte
- audioManager

## God Nodes (most connected - your core abstractions)
1. `gameState` - 40 edges
2. `audioManager` - 17 edges
3. `compilerOptions` - 15 edges
4. `compilerOptions` - 10 edges
5. `lucide-svelte` - 8 edges
6. `svelte` - 6 edges
7. `scripts` - 5 edges
8. `OutfitId` - 5 edges
9. `Choice` - 5 edges
10. `DialogueNode` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (20 total, 8 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.08
Nodes (21): lucide-svelte, isLight, locations, { onClose }, Props, EnvironmentLighting, LOCATION_PROFILES, LocationLightingProfile (+13 more)

### Community 1 - "DialogueBox.svelte"
Cohesion: 0.07
Nodes (29): AudioSettings, displayedText, isAutoPlay, isLight, isTyping, { node, onSelectChoice, onTogglePhone, onOpenHistory }, Props, speakerAccent (+21 more)

### Community 2 - "package.json"
Cohesion: 0.08
Nodes (26): dependencies, dexie, howler, lucide-svelte, zod, name, private, scripts (+18 more)

### Community 3 - "ProtagonistCustomizerModal.svelte"
Cohesion: 0.12
Nodes (18): zod, BOY_REACTIONS, OUTFIT_OPTIONS, resolveProtagonistLookImage(), OutfitId, OutfitIdEnum, OutfitOption, {
    outfitId = 'uniforme_lotus',
    scale = 1,
    flipHorizontal = false,
    customClass = ''
  } (+10 more)

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
Cohesion: 0.13
Nodes (5): svelte, isAudioSettingsOpen, isCreditsOpen, isProfileModalOpen, app

### Community 11 - "Svelte + TS + Vite"
Cohesion: 0.40
Nodes (4): Need an official Svelte framework?, Recommended IDE Setup, Svelte + TS + Vite, Technical considerations

### Community 14 - "VisualNovelActor.svelte"
Cohesion: 0.21
Nodes (10): CHARACTER_MANIFESTS, CHARACTER_FACIAL_METRICS, CharacterId, CharacterManifest, FacialMetrics, StandardExpression, { 
    characterId, 
    expression = 'neutro', 
    scale = 1, 
    flipHorizontal = false, 
    customClass = '' 
  }, manifest (+2 more)

### Community 18 - "CharacterProfileModal.svelte"
Cohesion: 0.08
Nodes (26): activeAspirationDetails, activeTab, activeZodiacDetails, boyAccents, draftAspiration, draftOutfit, draftTraits, draftZodiac (+18 more)

## Knowledge Gaps
- **158 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+153 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 220 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `gameState` connect `gameState` to `DualStage.svelte`, `DialogueBox.svelte`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`?**
  _High betweenness centrality (0.196) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _158 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.07956989247311828 - nodes in this community are weakly interconnected._
- **Why does `lucide-svelte` connect `DualStage.svelte` to `DialogueBox.svelte`, `package.json`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Should `DialogueBox.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.06756756756756757 - nodes in this community are weakly interconnected._
- **Why does `audioManager` connect `audioManager` to `TitleScreen.svelte`, `DialogueBox.svelte`, `CharacterProfileModal.svelte`, `ProtagonistCustomizerModal.svelte`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07936507936507936 - nodes in this community are weakly interconnected._