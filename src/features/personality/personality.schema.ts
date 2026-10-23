import { z } from 'zod';

// OS 12 SIGNOS DO ZODÍACO
export const ZodiacIdEnum = z.enum([
  'aries',
  'touro',
  'gemeos',
  'cancer',
  'leao',
  'virgem',
  'libra',
  'escorpiao',
  'sagitario',
  'capricornio',
  'aquario',
  'peixes'
]);
export type ZodiacId = z.infer<typeof ZodiacIdEnum>;

export interface ZodiacSign {
  id: ZodiacId;
  name: string;
  symbol: string;
  glyph: string;
  element: 'Fogo' | 'Terra' | 'Ar' | 'Água';
  dates: string;
  essence: string;
  synastry: {
    dante: string;
    lucas: string;
    theo: string;
  };
}

// CATEGORIAS DE TRAÇOS DE PERSONALIDADE (ESTILO THE SIMS)
export type TraitCategory = 'Emocional' | 'Intelectual' | 'Social' | 'Estilo de Vida';

export interface PersonalityTrait {
  id: string;
  name: string;
  category: TraitCategory;
  description: string;
  dialogueImpact: string;
  iconName: string;
}

// GRANDES ASPIRAÇÕES DE VIDA (O SONHO DE 10 ANOS)
export interface Aspiration {
  id: string;
  title: string;
  tagline: string;
  decadeGoal: string;
  description: string;
  affinityBoy: 'dante' | 'lucas' | 'theo' | 'geral';
  iconName: string;
}

// PERFIL COMPLETO DA PERSONAGEM
export const ProtagonistProfileSchema = z.object({
  name: z.string().default('Íris'),
  zodiac: ZodiacIdEnum.default('libra'),
  traits: z.array(z.string()).min(1).max(5).default([
    'romantica_incuravel',
    'curiosa_insaciavel',
    'intuitiva_astuta',
    'sarcastica_ironica',
    'criativa_sonhadora'
  ]),
  aspiration: z.string().default('romancista')
});

export type ProtagonistProfile = z.infer<typeof ProtagonistProfileSchema>;
