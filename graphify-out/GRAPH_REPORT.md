# Graph Report - entre-sinos  (2026-10-22)

## Corpus Check
- 20 files · ~133,514 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 183 nodes · 206 edges · 19 communities (12 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8379ecca`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DualStage.svelte
- DialogueBox.svelte
- package.json
- dependencies
- compilerOptions
- PhoneShell.svelte
- compilerOptions
- devDependencies
- narrative.schema.ts
- gameState
- Svelte + TS + Vite
- tsconfig.json
- scripts
- SceneryBackground.svelte

## God Nodes (most connected - your core abstractions)
1. `gameState` - 22 edges
2. `compilerOptions` - 15 edges
3. `compilerOptions` - 10 edges
4. `scripts` - 5 edges
5. `lucide-svelte` - 5 edges
6. `Choice` - 5 edges
7. `DialogueNode` - 5 edges
8. `Svelte + TS + Vite` - 4 edges
9. `@sveltejs/vite-plugin-svelte` - 2 edges
10. `@tailwindcss/vite` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (19 total, 7 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.11
Nodes (12): lucide-svelte, isLight, locations, { onClose }, Props, activeBg, currentNode, darkBackgrounds (+4 more)

### Community 1 - "DialogueBox.svelte"
Cohesion: 0.14
Nodes (12): displayedText, isAutoPlay, isLight, isTyping, { node, onSelectChoice, onTogglePhone, onOpenHistory }, Props, speakerAccent, speakerAccents (+4 more)

### Community 2 - "package.json"
Cohesion: 0.10
Nodes (18): name, private, type, version, dexie, howler, svelte, svelte-check (+10 more)

### Community 3 - "dependencies"
Cohesion: 0.40
Nodes (5): dependencies, dexie, howler, lucide-svelte, zod

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

### Community 8 - "narrative.schema.ts"
Cohesion: 0.12
Nodes (16): zod, Chapter, ChapterSchema, ChoiceSchema, DialogueNodeSchema, DressCodeCriteria, DressCodeCriteriaSchema, PersonagemEnum (+8 more)

### Community 11 - "Svelte + TS + Vite"
Cohesion: 0.40
Nodes (4): Need an official Svelte framework?, Recommended IDE Setup, Svelte + TS + Vite, Technical considerations

### Community 14 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, check, dev, preview

### Community 18 - "SceneryBackground.svelte"
Cohesion: 0.40
Nodes (4): activeImg, backgroundImages, { location, timeOfDay = 'manha', isLight = false }, Props

## Knowledge Gaps
- **118 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+113 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 148 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lucide-svelte` connect `DualStage.svelte` to `DialogueBox.svelte`, `package.json`, `PhoneShell.svelte`?**
  _High betweenness centrality (0.196) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _118 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.11052631578947368 - nodes in this community are weakly interconnected._
- **Why does `gameState` connect `gameState` to `DualStage.svelte`, `DialogueBox.svelte`, `PhoneShell.svelte`, `narrative.schema.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `DialogueBox.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.13970588235294118 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1038961038961039 - nodes in this community are weakly interconnected._