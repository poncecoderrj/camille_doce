<script lang="ts">
  import { fade } from 'svelte/transition';
  import { gameState } from './features/game-state/GameState.svelte';
  import TitleScreen from './features/menu/TitleScreen.svelte';
  import DualStage from './layout/DualStage.svelte';
</script>

{#if gameState.gameMode === 'menu'}
  <div class="w-full h-full" transition:fade={{ duration: 300 }}>
    <TitleScreen />
  </div>
{:else}
  <div class="w-full h-full" transition:fade={{ duration: 300 }}>
    <DualStage />
  </div>
{/if}
