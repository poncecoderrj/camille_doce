import type { CharacterManifest } from './character-paperdoll.types';

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
      provocador: '/assets/characters/dante/rostos/smirk.png',
      feliz: '/assets/characters/dante/rostos/feliz.png',
      sorriso: '/assets/characters/dante/rostos/feliz.png',
      irritado: '/assets/characters/dante/rostos/irritado.png',
      surpreso: '/assets/characters/dante/rostos/surpreso.png',
      timido: '/assets/characters/dante/rostos/timido.png',
      envergonhado: '/assets/characters/dante/rostos/timido.png',
      blush: '/assets/characters/dante/rostos/timido.png'
    },
    hairs: {
      rock_rebelde: {
        back: '/assets/characters/dante/cabelos/tras.png',
        front: '/assets/characters/dante/cabelos/frente.png'
      }
    },
    outfits: {
      default: {
        top: '/assets/characters/dante/roupas/camiseta_banda.png',
        jacket: '/assets/characters/dante/roupas/jaqueta_couro.png',
        bottom: '/assets/characters/dante/roupas/jeans_rasgado.png',
        shoes: '/assets/characters/dante/roupas/coturno.png'
      },
      uniforme: {
        top: '/assets/characters/dante/roupas/camisa_uniforme.png',
        bottom: '/assets/characters/dante/roupas/calca_uniforme.png'
      }
    }
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
      polite: '/assets/characters/lucas/rostos/sorriso.png',
      serio: '/assets/characters/lucas/rostos/serio.png',
      strict: '/assets/characters/lucas/rostos/serio.png',
      corado: '/assets/characters/lucas/rostos/corado.png',
      timido: '/assets/characters/lucas/rostos/corado.png',
      surpreso: '/assets/characters/lucas/rostos/surpreso.png'
    },
    hairs: {
      gremio_alinhado: {
        back: '/assets/characters/lucas/cabelos/tras.png',
        front: '/assets/characters/lucas/cabelos/frente.png'
      }
    },
    outfits: {
      default: {
        top: '/assets/characters/lucas/roupas/camisa_social.png',
        jacket: '/assets/characters/lucas/roupas/blazer_gremio.png',
        glasses: '/assets/characters/lucas/roupas/oculos_dourados.png'
      }
    }
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
      meigo: '/assets/characters/theo/rostos/timido.png',
      sorriso: '/assets/characters/theo/rostos/sorriso.png',
      afetuoso: '/assets/characters/theo/rostos/sorriso.png',
      melancolico: '/assets/characters/theo/rostos/melancolico.png',
      sonhador: '/assets/characters/theo/rostos/sonhador.png'
    },
    hairs: {
      ondas_artisticas: {
        back: '/assets/characters/theo/cabelos/tras.png',
        front: '/assets/characters/theo/cabelos/frente.png'
      }
    },
    outfits: {
      default: {
        top: '/assets/characters/theo/roupas/sueter_trico.png',
        jacket: '/assets/characters/theo/roupas/sobretudo_verde.png',
        necklace: '/assets/characters/theo/roupas/cachecol_mostarda.png'
      }
    }
  }
};
