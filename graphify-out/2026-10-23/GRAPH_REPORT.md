# Graph Report - entre-sinos  (2026-10-23)

## Corpus Check
- 57 files · ~22,063,858 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .gd 1, .css 1)

## Summary
- 457 nodes · 591 edges · 34 communities (28 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fac51eae`
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
- character_composer.py
- CharacterProfileModal.svelte
- audioManager
- narrative.schema.ts
- Pacote de personagens — Academia Lótus
- Beatriz
- Caio
- Dante
- Profª Helena Vance
- Íris
- Lucas
- Sra. Mara
- Melissa Prado
- Nina
- Rafael
- Ravi
- Theo

## God Nodes (most connected - your core abstractions)
1. `gameState` - 50 edges
2. `audioManager` - 20 edges
3. `compilerOptions` - 15 edges
4. `lucide-svelte` - 11 edges
5. `compilerOptions` - 10 edges
6. `Pacote de personagens — Academia Lótus` - 7 edges
7. `svelte` - 6 edges
8. `compose()` - 6 edges
9. `DialogueNode` - 6 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `currentChapterTitle` --calls--> `getChapterForNode()`  [EXTRACTED]
  src/layout/DualStage.svelte → src/features/dialogue/story-manifest.ts

## Import Cycles
- None detected.

## Communities (34 total, 6 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.07
Nodes (24): ALL_STORY_NODES, CHAPTER_LIST, ChapterMeta, FALLBACK_NODE_ID, getChapterForNode(), getStoryNode(), EnvironmentLighting, LOCATION_PROFILES (+16 more)

### Community 1 - "DialogueBox.svelte"
Cohesion: 0.13
Nodes (13): canRollback, CHOICE_LETTERS, displayedText, hasChoices, isAlarmBlocked, isLight, isProtagonistSpeaking, isTyping (+5 more)

### Community 2 - "package.json"
Cohesion: 0.08
Nodes (26): dependencies, dexie, howler, lucide-svelte, zod, name, private, scripts (+18 more)

### Community 3 - "ProtagonistCustomizerModal.svelte"
Cohesion: 0.05
Nodes (40): lucide-svelte, AudioSettings, isLight, locations, { onClose }, Props, BOY_REACTIONS, OUTFIT_OPTIONS (+32 more)

### Community 4 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 5 - "PhoneShell.svelte"
Cohesion: 0.10
Nodes (17): activeWallpaper, backupFeedback, calendarEvents, chatScrollContainer, contacts, emails, feedPosts, isPlayingAudio (+9 more)

### Community 6 - "compilerOptions"
Cohesion: 0.14
Nodes (13): @tsconfig/svelte/tsconfig.json, compilerOptions, allowArbitraryExtensions, allowJs, checkJs, module, moduleDetection, noEmit (+5 more)

### Community 7 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, svelte, svelte-check, @sveltejs/vite-plugin-svelte, tailwindcss, @tailwindcss/vite, @tsconfig/svelte, @types/howler (+4 more)

### Community 8 - "TitleScreen.svelte"
Cohesion: 0.12
Nodes (6): svelte, isAudioSettingsOpen, isCreditsOpen, isProfileModalOpen, profileModalMode, app

### Community 9 - "gameState"
Cohesion: 0.06
Nodes (3): Choice, DialogueNode, gameState

### Community 11 - "Svelte + TS + Vite"
Cohesion: 0.40
Nodes (4): Need an official Svelte framework?, Recommended IDE Setup, Svelte + TS + Vite, Technical considerations

### Community 14 - "VisualNovelActor.svelte"
Cohesion: 0.09
Nodes (22): BOYS_EXPRESSIONS, CHARACTER_MANIFESTS, EXPRESSION_ALIASES, IRIS_EXPRESSIONS, CHARACTER_FACIAL_METRICS, CharacterId, CharacterManifest, FacialMetrics (+14 more)

### Community 17 - "character_composer.py"
Cohesion: 0.18
Nodes (5): compose(), load_manifest(), main(), open_layer(), tint_preserve_luminance()

### Community 18 - "CharacterProfileModal.svelte"
Cohesion: 0.05
Nodes (41): zod, activeAspirationDetails, activeOutfitDetails, activeZodiacDetails, currentStep, draftAspiration, draftName, draftOutfit (+33 more)

### Community 20 - "narrative.schema.ts"
Cohesion: 0.09
Nodes (21): Chapter, ChapterSchema, ChoiceSchema, DialogueNodeSchema, DressCodeCriteria, DressCodeCriteriaSchema, PersonagemEnum, PersonagemId (+13 more)

### Community 21 - "Pacote de personagens — Academia Lótus"
Cohesion: 0.25
Nodes (7): Ferramentas, O que está aprovado, O que está disponível como protótipo, Pacote de personagens — Academia Lótus, Personagens, Regra de qualidade, Variações

### Community 22 - "Beatriz"
Cohesion: 0.50
Nodes (3): Beatriz, Próximo fluxo, Status

### Community 23 - "Caio"
Cohesion: 0.50
Nodes (3): Caio, Próximo fluxo, Status

### Community 24 - "Dante"
Cohesion: 0.50
Nodes (3): Dante, Próximo fluxo, Status

### Community 25 - "Profª Helena Vance"
Cohesion: 0.50
Nodes (3): Profª Helena Vance, Próximo fluxo, Status

### Community 26 - "Íris"
Cohesion: 0.50
Nodes (3): Próximo fluxo, Status, Íris

### Community 27 - "Lucas"
Cohesion: 0.50
Nodes (3): Lucas, Próximo fluxo, Status

### Community 28 - "Sra. Mara"
Cohesion: 0.50
Nodes (3): Próximo fluxo, Sra. Mara, Status

### Community 29 - "Melissa Prado"
Cohesion: 0.50
Nodes (3): Melissa Prado, Próximo fluxo, Status

### Community 30 - "Nina"
Cohesion: 0.50
Nodes (3): Nina, Próximo fluxo, Status

### Community 31 - "Rafael"
Cohesion: 0.50
Nodes (3): Próximo fluxo, Rafael, Status

### Community 32 - "Ravi"
Cohesion: 0.50
Nodes (3): Próximo fluxo, Ravi, Status

### Community 33 - "Theo"
Cohesion: 0.50
Nodes (3): Próximo fluxo, Status, Theo

## Knowledge Gaps
- **240 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+235 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 334 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `gameState` connect `gameState` to `DualStage.svelte`, `DialogueBox.svelte`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`, `narrative.schema.ts`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _240 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `lucide-svelte` connect `ProtagonistCustomizerModal.svelte` to `DualStage.svelte`, `DialogueBox.svelte`, `package.json`, `PhoneShell.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `DialogueBox.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `audioManager` connect `audioManager` to `DualStage.svelte`, `DialogueBox.svelte`, `ProtagonistCustomizerModal.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07936507936507936 - nodes in this community are weakly interconnected._