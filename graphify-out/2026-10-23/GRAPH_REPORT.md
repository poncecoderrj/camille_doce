# Graph Report - entre-sinos  (2026-10-23)

## Corpus Check
- 57 files · ~19,555,122 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .gd 1, .css 1)

## Summary
- 450 nodes · 583 edges · 33 communities (27 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fac51eae`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DualStage.svelte
- lucide-svelte
- package.json
- ProtagonistCustomizerModal.svelte
- compilerOptions
- PhoneShell.svelte
- compilerOptions
- TitleScreen.svelte
- gameState
- Svelte + TS + Vite
- tsconfig.json
- VisualNovelActor.svelte
- character_composer.py
- CharacterProfileModal.svelte
- audioManager
- DialogueBox.svelte
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

## Communities (33 total, 6 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.07
Nodes (24): ALL_STORY_NODES, CHAPTER_LIST, ChapterMeta, FALLBACK_NODE_ID, getChapterForNode(), getStoryNode(), EnvironmentLighting, LOCATION_PROFILES (+16 more)

### Community 1 - "lucide-svelte"
Cohesion: 0.12
Nodes (14): lucide-svelte, isLight, locations, { onClose }, Props, activeColor, affinity, characterColors (+6 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (38): dependencies, dexie, howler, lucide-svelte, zod, devDependencies, svelte, svelte-check (+30 more)

### Community 3 - "ProtagonistCustomizerModal.svelte"
Cohesion: 0.12
Nodes (18): zod, BOY_REACTIONS, OUTFIT_OPTIONS, resolveProtagonistLookImage(), OutfitId, OutfitIdEnum, OutfitOption, {
    outfitId = 'uniforme_lotus',
    scale = 1,
    flipHorizontal = false,
    customClass = '',
    framing = 'bust'
  } (+10 more)

### Community 4 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 5 - "PhoneShell.svelte"
Cohesion: 0.10
Nodes (17): activeWallpaper, backupFeedback, calendarEvents, chatScrollContainer, contacts, emails, feedPosts, isPlayingAudio (+9 more)

### Community 6 - "compilerOptions"
Cohesion: 0.14
Nodes (13): @tsconfig/svelte/tsconfig.json, compilerOptions, allowArbitraryExtensions, allowJs, checkJs, module, moduleDetection, noEmit (+5 more)

### Community 8 - "TitleScreen.svelte"
Cohesion: 0.12
Nodes (6): svelte, isAudioSettingsOpen, isCreditsOpen, isProfileModalOpen, profileModalMode, app

### Community 11 - "Svelte + TS + Vite"
Cohesion: 0.40
Nodes (4): Need an official Svelte framework?, Recommended IDE Setup, Svelte + TS + Vite, Technical considerations

### Community 14 - "VisualNovelActor.svelte"
Cohesion: 0.13
Nodes (15): BOYS_EXPRESSIONS, CHARACTER_MANIFESTS, EXPRESSION_ALIASES, IRIS_EXPRESSIONS, CHARACTER_FACIAL_METRICS, CharacterId, CharacterManifest, FacialMetrics (+7 more)

### Community 17 - "character_composer.py"
Cohesion: 0.18
Nodes (5): compose(), load_manifest(), main(), open_layer(), tint_preserve_luminance()

### Community 18 - "CharacterProfileModal.svelte"
Cohesion: 0.05
Nodes (39): activeAspirationDetails, activeOutfitDetails, activeZodiacDetails, currentStep, draftAspiration, draftName, draftOutfit, draftTraits (+31 more)

### Community 19 - "audioManager"
Cohesion: 0.13
Nodes (8): audioManager, AudioSettings, charName, {
    expression = 'neutro',
    isSpeaking = false,
    isChoiceActive = false,
    customClass = ''
  }, isAngryPulse, isLight, Props, spriteSrc

### Community 20 - "DialogueBox.svelte"
Cohesion: 0.05
Nodes (39): canRollback, CHOICE_LETTERS, displayedText, hasChoices, isAlarmBlocked, isLight, isProtagonistSpeaking, isTyping (+31 more)

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
- **234 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+229 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 328 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `gameState` connect `gameState` to `DualStage.svelte`, `lucide-svelte`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`, `audioManager`, `DialogueBox.svelte`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _234 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `lucide-svelte` connect `lucide-svelte` to `DualStage.svelte`, `package.json`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`, `audioManager`, `DialogueBox.svelte`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `lucide-svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.11695906432748537 - nodes in this community are weakly interconnected._
- **Why does `audioManager` connect `audioManager` to `DualStage.svelte`, `ProtagonistCustomizerModal.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`, `DialogueBox.svelte`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05384615384615385 - nodes in this community are weakly interconnected._