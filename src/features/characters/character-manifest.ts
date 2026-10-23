import type { CharacterManifest } from './character.types';
import { CHARACTER_FACIAL_METRICS } from './character.types';

export const CHARACTER_MANIFESTS: Record<string, CharacterManifest> = {
  dante: {
    id: 'dante',
    name: 'Dante',
    title: 'Guitarrista Rebelde • 3º Ano',
    accentColor: '#e11d48',
    baseBody: '/assets/characters/dante/base/corpo_neutro.png',
    expressions: {
      neutro: '/assets/characters/dante/rostos/neutro.png',
      smirk: '/assets/characters/dante/rostos/smirk.png',
      feliz: '/assets/characters/dante/rostos/feliz.png',
      sorriso: '/assets/characters/dante/rostos/sorriso.png',
      irritado: '/assets/characters/dante/rostos/irritado.png',
      surpreso: '/assets/characters/dante/rostos/surpreso.png',
      timido: '/assets/characters/dante/rostos/timido.png',
      corado: '/assets/characters/dante/rostos/corado.png',
      melancolico: '/assets/characters/dante/rostos/melancolico.png',
      sonhador: '/assets/characters/dante/rostos/sonhador.png'
    },
    metrics: CHARACTER_FACIAL_METRICS.dante
  },

  lucas: {
    id: 'lucas',
    name: 'Lucas',
    title: 'Presidente do Grêmio • 3º Ano',
    accentColor: '#2563eb',
    baseBody: '/assets/characters/lucas/base/corpo_neutro.png',
    expressions: {
      neutro: '/assets/characters/lucas/rostos/neutro.png',
      sorriso: '/assets/characters/lucas/rostos/sorriso.png',
      feliz: '/assets/characters/lucas/rostos/feliz.png',
      irritado: '/assets/characters/lucas/rostos/irritado.png',
      corado: '/assets/characters/lucas/rostos/corado.png',
      timido: '/assets/characters/lucas/rostos/timido.png',
      surpreso: '/assets/characters/lucas/rostos/surpreso.png',
      melancolico: '/assets/characters/lucas/rostos/melancolico.png',
      sonhador: '/assets/characters/lucas/rostos/sonhador.png',
      smirk: '/assets/characters/lucas/rostos/smirk.png'
    },
    metrics: CHARACTER_FACIAL_METRICS.lucas
  },

  theo: {
    id: 'theo',
    name: 'Theo',
    title: 'Artista Melancólico • 2º Ano',
    accentColor: '#059669',
    baseBody: '/assets/characters/theo/base/corpo_neutro.png',
    expressions: {
      neutro: '/assets/characters/theo/rostos/neutro.png',
      timido: '/assets/characters/theo/rostos/timido.png',
      sorriso: '/assets/characters/theo/rostos/sorriso.png',
      feliz: '/assets/characters/theo/rostos/feliz.png',
      melancolico: '/assets/characters/theo/rostos/melancolico.png',
      sonhador: '/assets/characters/theo/rostos/sonhador.png',
      corado: '/assets/characters/theo/rostos/corado.png',
      irritado: '/assets/characters/theo/rostos/irritado.png',
      smirk: '/assets/characters/theo/rostos/smirk.png',
      surpreso: '/assets/characters/theo/rostos/surpreso.png'
    },
    metrics: CHARACTER_FACIAL_METRICS.theo
  },

  iris: {
    id: 'iris',
    name: 'Íris',
    title: 'Protagonista • 1º Ano',
    accentColor: '#d97706',
    baseBody: '/assets/characters/iris/base/uniforme_lotus.png',
    expressions: {
      neutro: '/assets/characters/iris/rostos/neutro.png',
      feliz: '/assets/characters/iris/rostos/feliz.png',
      sorriso: '/assets/characters/iris/rostos/sorriso.png',
      corado: '/assets/characters/iris/rostos/corado.png',
      timido: '/assets/characters/iris/rostos/timido.png',
      smirk: '/assets/characters/iris/rostos/smirk.png',
      surpreso: '/assets/characters/iris/rostos/surpreso.png'
    },
    metrics: CHARACTER_FACIAL_METRICS.iris
  }
};
