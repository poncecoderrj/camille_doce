# Graph Report - entre-sinos  (2026-10-22)

## Corpus Check
- 21 files · ~190,698 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 167 nodes · 196 edges · 13 communities (11 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- DualStage.svelte
- narrative.schema.ts
- package.json
- gameState
- compilerOptions
- PhoneShell.svelte
- compilerOptions
- devDependencies
- DialogueBox.svelte
- scripts
- Svelte + TS + Vite
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `gameState` - 13 edges
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

## Communities (13 total, 2 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.10
Nodes (13): svelte, activeImg, backgroundImages, { location, timeOfDay = 'manha', isLight = false }, Props, activeBg, currentNode, darkBackgrounds (+5 more)

### Community 1 - "narrative.schema.ts"
Cohesion: 0.10
Nodes (19): zod, Chapter, ChapterSchema, Choice, ChoiceSchema, DialogueNode, DialogueNodeSchema, DressCodeCriteria (+11 more)

### Community 2 - "package.json"
Cohesion: 0.10
Nodes (21): dependencies, dexie, howler, lucide-svelte, zod, name, private, type (+13 more)

### Community 3 - "gameState"
Cohesion: 0.13
Nodes (9): PersonagemId, gameState, characterProfiles, characterSprites, isLight, profile, Props, { speaker, speakerName = '', expression = 'neutral', timeOfDay = 'manha' } (+1 more)

### Community 4 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 5 - "PhoneShell.svelte"
Cohesion: 0.13
Nodes (12): lucide-svelte, isLight, locations, { onClose }, Props, activeWallpaper, chatLogs, contacts (+4 more)

### Community 6 - "compilerOptions"
Cohesion: 0.14
Nodes (13): @tsconfig/svelte/tsconfig.json, compilerOptions, allowArbitraryExtensions, allowJs, checkJs, module, moduleDetection, noEmit (+5 more)

### Community 7 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, svelte, svelte-check, @sveltejs/vite-plugin-svelte, tailwindcss, @tailwindcss/vite, @tsconfig/svelte, @types/howler (+4 more)

### Community 8 - "DialogueBox.svelte"
Cohesion: 0.20
Nodes (8): displayedText, isAutoPlay, isLight, isTyping, { node, onSelectChoice, onTogglePhone, onOpenHistory }, Props, speakerAccent, speakerAccents

### Community 10 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, check, dev, preview

### Community 11 - "Svelte + TS + Vite"
Cohesion: 0.40
Nodes (4): Need an official Svelte framework?, Recommended IDE Setup, Svelte + TS + Vite, Technical considerations

## Knowledge Gaps
- **116 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+111 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 130 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lucide-svelte` connect `PhoneShell.svelte` to `DialogueBox.svelte`, `DualStage.svelte`, `package.json`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _116 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Should `narrative.schema.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10144927536231885 - nodes in this community are weakly interconnected._
- **Why does `zod` connect `narrative.schema.ts` to `package.json`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09881422924901186 - nodes in this community are weakly interconnected._