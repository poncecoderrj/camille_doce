# Graph Report - entre-sinos  (2026-10-23)

## Corpus Check
- 45 files · ~12,040,478 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .gd 1, .css 1)

## Summary
- 403 nodes · 550 edges · 23 communities (16 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec02e480`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DualStage.svelte
- ProtagonistAvatarSphere.svelte
- package.json
- ProtagonistCustomizerModal.svelte
- compilerOptions
- PhoneShell.svelte
- compilerOptions
- CharacterSprite.svelte
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
- devDependencies

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
- `spriteSrc` --calls--> `resolveProtagonistLookImage()`  [EXTRACTED]
  src/features/customization/ProtagonistActor.svelte → src/features/customization/customization.catalog.ts
- `handleImgError()` --calls--> `resolveProtagonistLookImage()`  [EXTRACTED]
  src/features/customization/ProtagonistActor.svelte → src/features/customization/customization.catalog.ts
- `currentChapterTitle` --calls--> `getChapterForNode()`  [EXTRACTED]
  src/layout/DualStage.svelte → src/features/dialogue/story-manifest.ts

## Import Cycles
- None detected.

## Communities (23 total, 7 thin omitted)

### Community 0 - "DualStage.svelte"
Cohesion: 0.07
Nodes (24): ALL_STORY_NODES, CHAPTER_LIST, ChapterMeta, FALLBACK_NODE_ID, getChapterForNode(), getStoryNode(), EnvironmentLighting, LOCATION_PROFILES (+16 more)

### Community 1 - "ProtagonistAvatarSphere.svelte"
Cohesion: 0.08
Nodes (20): lucide-svelte, isLight, locations, { onClose }, Props, activeColor, affinity, characterColors (+12 more)

### Community 2 - "package.json"
Cohesion: 0.08
Nodes (26): dependencies, dexie, howler, lucide-svelte, zod, name, private, scripts (+18 more)

### Community 3 - "ProtagonistCustomizerModal.svelte"
Cohesion: 0.13
Nodes (19): BOY_REACTIONS, OUTFIT_OPTIONS, resolveProtagonistLookImage(), OutfitId, OutfitIdEnum, OutfitOption, cleanExpr, handleImgError() (+11 more)

### Community 4 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 5 - "PhoneShell.svelte"
Cohesion: 0.10
Nodes (17): activeWallpaper, backupFeedback, calendarEvents, chatScrollContainer, contacts, emails, feedPosts, isPlayingAudio (+9 more)

### Community 6 - "compilerOptions"
Cohesion: 0.14
Nodes (13): @tsconfig/svelte/tsconfig.json, compilerOptions, allowArbitraryExtensions, allowJs, checkJs, module, moduleDetection, noEmit (+5 more)

### Community 7 - "CharacterSprite.svelte"
Cohesion: 0.15
Nodes (12): PersonagemId, characterProfiles, enterClass, isAngryPulse, isCharacterSpeaker, isLight, isProtagonist, motionAnimClass (+4 more)

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

### Community 20 - "DialogueBox.svelte"
Cohesion: 0.06
Nodes (29): zod, AudioSettings, canRollback, CHOICE_LETTERS, displayedText, hasChoices, isAlarmBlocked, isLight (+21 more)

### Community 21 - "Pacote de personagens — Academia Lótus"
Cohesion: 0.25
Nodes (7): Ferramentas, O que está aprovado, O que está disponível como protótipo, Pacote de personagens — Academia Lótus, Personagens, Regra de qualidade, Variações

### Community 22 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, svelte, svelte-check, @sveltejs/vite-plugin-svelte, tailwindcss, @tailwindcss/vite, @tsconfig/svelte, @types/howler (+4 more)

## Knowledge Gaps
- **210 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+205 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 291 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `gameState` connect `gameState` to `DualStage.svelte`, `ProtagonistAvatarSphere.svelte`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`, `CharacterSprite.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`, `DialogueBox.svelte`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _210 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DualStage.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `lucide-svelte` connect `ProtagonistAvatarSphere.svelte` to `DualStage.svelte`, `package.json`, `ProtagonistCustomizerModal.svelte`, `PhoneShell.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`, `DialogueBox.svelte`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `ProtagonistAvatarSphere.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.08262108262108261 - nodes in this community are weakly interconnected._
- **Why does `audioManager` connect `audioManager` to `DualStage.svelte`, `ProtagonistAvatarSphere.svelte`, `ProtagonistCustomizerModal.svelte`, `TitleScreen.svelte`, `CharacterProfileModal.svelte`, `DialogueBox.svelte`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07936507936507936 - nodes in this community are weakly interconnected._