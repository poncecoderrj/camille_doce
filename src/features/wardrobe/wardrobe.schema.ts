import { z } from 'zod';

export const BodyArchetypeEnum = z.enum([
  'padrao',
  'curvy_plussize',
  'delicada_magra',
  'atletica_musculosa'
]);
export type BodyArchetype = z.infer<typeof BodyArchetypeEnum>;

export const OutfitIdEnum = z.enum([
  'uniforme_lotus',
  'look_rock',
  'look_romantico'
]);
export type OutfitId = z.infer<typeof OutfitIdEnum>;

export const EquippedOutfitSchema = z.object({
  // Look Principal Escolhido (Ilustração Mestre Cel-Shaded)
  outfit_id: OutfitIdEnum.default('uniforme_lotus'),
  
  // Biotipo Anatômico Real Desenhado (The Sims Morphology)
  body_archetype: BodyArchetypeEnum.default('padrao'),
  
  // Customização de Cabelo (Paleta The Sims em Tempo Real)
  hair_color: z.string().default('#4a2c11'),
  hair_style: z.string().default('ondulado_longo'),
  
  // Acessórios
  glasses: z.boolean().default(false),
  blush: z.boolean().default(true),
  hat: z.boolean().default(false),

  // Sliders Morfológicos Contínuos
  height: z.number().default(1.65), // 1.50m a 1.80m
  body_build: z.number().default(0), // -50 a +50
  muscle_tone: z.number().default(20), // 0 a 100
  curve_ratio: z.number().default(0),

  // Compatibilidade com nós legados e narrativa
  skin_color: z.string().default('pele_clara'),
  eye_color: z.string().default('olhos_castanhos'),
  mouth_expression: z.string().default('boca_sorriso'),
  top: z.string().optional(),
  bottom: z.string().optional(),
  jacket: z.string().optional(),
  shoes: z.string().optional(),
  socks: z.string().optional(),
  necklace: z.string().optional(),
  bag: z.string().optional(),
  dress: z.string().optional(),
  hair_front: z.string().optional(),
  hair_back: z.string().optional()
});

export type EquippedOutfit = z.infer<typeof EquippedOutfitSchema>;

export interface OutfitOption {
  id: OutfitId;
  name: string;
  styleTag: 'Clássico' | 'Rock' | 'Romântico';
  affinityTarget: 'lucas' | 'dante' | 'theo';
  affinityBonus: number;
  description: string;
  previewImage: string;
}

export interface BodyArchetypeOption {
  id: BodyArchetype;
  name: string;
  badge: string;
  description: string;
  height: number;
  body_build: number;
  muscle_tone: number;
  previewImage: string;
}

export interface HairColorOption {
  id: string;
  name: string;
  color: string;
  highlight: string;
}
