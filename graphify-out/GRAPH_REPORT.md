# Graph Report - entre-sinos  (2026-10-22)

## Corpus Check
- 21 files · ~191,948 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 183 nodes · 212 edges · 12 communities (10 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- DualStage.svelte
- narrative.schema.ts
- package.json
- GameState.svelte.ts
- compilerOptions
- PhoneShell.svelte
- compilerOptions
- devDependencies
- DialogueBox.svelte
- Svelte + TS + Vite
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `gameState` - 17 edges
2. `compilerOptions` - 15 edges
3. `compilerOptions` - 10 edges
4. `scripts` - 5 edges
5. `lucide-svelte` - 5 edges
6. `Choice` - 5 edges
7. `DialogueNode` - 5 edges
8. `Svelte + TS + Vite` - 4 edges
9. `zod` - 3 edges
10. `@sveltejs/vite-plugin-svelte` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (12 total, 2 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.09
Nodes (16): lucide-svelte, isLight, locations, { onClose }, Props, activeImg, backgroundImages, { location, timeOfDay = 'manha', isLight = false } (+8 more)

### Community 1 - "narrative.schema.ts"
Cohesion: 0.11
Nodes (17): Chapter, ChapterSchema, ChoiceSchema, DialogueNodeSchema, DressCodeCriteria, DressCodeCriteriaSchema, PersonagemEnum, PersonagemId (+9 more)

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, dexie, howler, lucide-svelte, zod, name, private, scripts (+20 more)

### Community 3 - "GameState.svelte.ts"
Cohesion: 0.20
Nodes (9): zod, DiaryEntry, HistoryEntry, EquippedOutfit, EquippedOutfitSchema, WardrobeCategory, WardrobeCategoryEnum, WardrobeItem (+1 more)

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
Cohesion: 0.09
Nodes (11): displayedText, isAutoPlay, isLight, isTyping, { node, onSelectChoice, onTogglePhone, onOpenHistory }, Props, speakerAccent, speakerAccents (+3 more)

### Community 11 - "Svelte + TS + Vite"
Cohesion: 0.40
Nodes (4): Need an official Svelte framework?, Recommended IDE Setup, Svelte + TS + Vite, Technical considerations

## Knowledge Gaps
- **125 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 146 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lucide-svelte` connect `DualStage.svelte` to `DialogueBox.svelte`, `package.json`, `PhoneShell.svelte`?**
  _High betweenness centrality (0.185) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.08666666666666667 - nodes in this community are weakly interconnected._
- **Why does `gameState` connect `DialogueBox.svelte` to `DualStage.svelte`, `narrative.schema.ts`, `GameState.svelte.ts`, `PhoneShell.svelte`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Should `narrative.schema.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06854838709677419 - nodes in this community are weakly interconnected._