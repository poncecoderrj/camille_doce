import type { CharacterManifest } from './character.types';
import { CHARACTER_FACIAL_METRICS } from './character.types';

// Dicionário de sinônimos/aliases para suportar roteiros em inglês e português sem quebrar nada
const EXPRESSION_ALIASES: Record<string, string> = {
  neutral: 'neutro',
  smile: 'sorriso',
  happy: 'feliz',
  angry: 'irritado',
  blush: 'corado',
  shy: 'timido',
  surprised: 'surpreso',
  sad: 'melancolico',
  dreamy: 'sonhador',
  polite: 'sorriso',
  serious: 'neutro',
  sigh: 'melancolico',
  tease: 'smirk'
};

function createExpressionMap(basePath: string, standardList: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  
  // Mapeia todas as expressões padrão em português
  for (const expr of standardList) {
    result[expr] = `${basePath}/${expr}.png`;
  }
  
  // Mapeia os aliases ingleses e sinônimos correspondentes
  for (const [alias, target] of Object.entries(EXPRESSION_ALIASES)) {
    if (standardList.includes(target)) {
      result[alias] = `${basePath}/${target}.png`;
    }
  }
  
  return result;
}

const BOYS_EXPRESSIONS = [
  'neutro',
  'sorriso',
  'feliz',
  'irritado',
  'corado',
  'timido',
  'smirk',
  'surpreso',
  'melancolico',
  'sonhador'
];

const IRIS_EXPRESSIONS = [
  'neutro',
  'feliz',
  'sorriso',
  'corado',
  'timido',
  'smirk',
  'surpreso'
];

export const CHARACTER_MANIFESTS: Record<string, CharacterManifest> = {
  dante: {
    id: 'dante',
    name: 'Dante',
    title: 'Guitarrista Rebelde • 3º Ano',
    accentColor: '#e11d48',
    baseBody: '/assets/characters/dante/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/dante/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.dante
  },

  lucas: {
    id: 'lucas',
    name: 'Lucas',
    title: 'Presidente do Grêmio • 3º Ano',
    accentColor: '#2563eb',
    baseBody: '/assets/characters/lucas/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/lucas/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.lucas
  },

  theo: {
    id: 'theo',
    name: 'Theo',
    title: 'Artista Melancólico • 2º Ano',
    accentColor: '#059669',
    baseBody: '/assets/characters/theo/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/theo/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.theo
  },

  iris: {
    id: 'iris',
    name: 'Íris',
    title: 'Protagonista • 1º Ano',
    accentColor: '#d97706',
    baseBody: '/assets/characters/iris/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/iris/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.iris
  },

  nina: {
    id: 'nina',
    name: 'Nina',
    title: 'Melhor Amiga • 1º Ano',
    accentColor: '#ec4899',
    baseBody: '/assets/characters/nina/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/nina/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.iris
  },

  helena: {
    id: 'helena',
    name: 'Profª Helena Vance',
    title: 'Diretora Geral da Lótus',
    accentColor: '#8b5cf6',
    baseBody: '/assets/characters/helena/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/helena/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.iris
  },

  helena_vance: {
    id: 'helena_vance',
    name: 'Profª Helena Vance',
    title: 'Diretora Geral da Lótus',
    accentColor: '#8b5cf6',
    baseBody: '/assets/characters/helena_vance/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/helena_vance/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.iris
  },

  melissa: {
    id: 'melissa',
    name: 'Melissa Prado',
    title: 'Vice-Presidente do Grêmio • 3º Ano',
    accentColor: '#38bdf8',
    baseBody: '/assets/characters/melissa/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/melissa/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.iris
  },

  melissa_prado: {
    id: 'melissa_prado',
    name: 'Melissa Prado',
    title: 'Vice-Presidente do Grêmio • 3º Ano',
    accentColor: '#38bdf8',
    baseBody: '/assets/characters/melissa_prado/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/melissa_prado/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.iris
  },

  caio: {
    id: 'caio',
    name: 'Caio',
    title: 'Baterista da Banda • 3º Ano',
    accentColor: '#f97316',
    baseBody: '/assets/characters/caio/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/caio/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.dante
  },

  ravi: {
    id: 'ravi',
    name: 'Ravi',
    title: 'Monitor de Botânica • 2º Ano',
    accentColor: '#10b981',
    baseBody: '/assets/characters/ravi/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/ravi/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.theo
  },

  mara: {
    id: 'mara',
    name: 'Sra. Mara',
    title: 'Curadora da Biblioteca Histórica',
    accentColor: '#a855f7',
    baseBody: '/assets/characters/mara/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/mara/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.iris
  },

  rafael: {
    id: 'rafael',
    name: 'Rafael',
    title: 'Irmão Mais Velho & Universitário',
    accentColor: '#b45309',
    baseBody: '/assets/characters/rafael/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/rafael/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.lucas
  },

  beatriz: {
    id: 'beatriz',
    name: 'Beatriz',
    title: 'Prima Estilista • 18 anos',
    accentColor: '#d946ef',
    baseBody: '/assets/characters/beatriz/base/corpo_neutro.png',
    expressions: createExpressionMap('/assets/characters/beatriz/rostos', BOYS_EXPRESSIONS),
    metrics: CHARACTER_FACIAL_METRICS.iris
  }
};
