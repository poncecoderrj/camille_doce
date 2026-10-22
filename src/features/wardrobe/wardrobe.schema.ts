import { z } from 'zod';

export const WardrobeCategoryEnum = z.enum([
  'pele',
  'olhos',
  'boca',
  'cabelo_frente',
  'cabelo_tras',
  'superior',
  'inferior',
  'vestido',
  'casaco',
  'calcado',
  'meia',
  'chapeu',
  'oculos',
  'colar',
  'brinco',
  'bolsa'
]);
export type WardrobeCategory = z.infer<typeof WardrobeCategoryEnum>;

export const WardrobeItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: WardrobeCategoryEnum,
  zIndex: z.number().int(),
  tags: z.array(z.string()),
  price: z.number().int().default(0),
  rarity: z.enum(['Básico', 'Raro', 'Especial', 'Exclusivo']).default('Básico'),
  unlockedByDefault: z.boolean().default(true),
  affinityTarget: z.enum(['dante', 'lucas', 'theo', 'todos']).optional(),
  affinityBonus: z.number().int().default(5),
  description: z.string().default(''),
  color: z.string().optional()
});
export type WardrobeItem = z.infer<typeof WardrobeItemSchema>;

export const EquippedOutfitSchema = z.object({
  skin_color: z.string().default('pele_clara'),
  eye_color: z.string().default('olhos_castanhos'),
  mouth_expression: z.string().default('boca_sorriso'),
  hair_front: z.string().default('cabelo_franja_onda_frente'),
  hair_back: z.string().default('cabelo_longo_onda_tras'),
  hair_color: z.string().default('#4a2c11'),
  blush: z.boolean().default(true),
  top: z.string().optional(),
  bottom: z.string().optional(),
  dress: z.string().optional(),
  jacket: z.string().optional(),
  shoes: z.string().optional(),
  socks: z.string().optional(),
  hat: z.string().optional(),
  glasses: z.string().optional(),
  necklace: z.string().optional(),
  earrings: z.string().optional(),
  bag: z.string().optional()
});
export type EquippedOutfit = z.infer<typeof EquippedOutfitSchema>;

export interface OutfitPreset {
  id: string;
  name: string;
  styleTag: 'Clássico' | 'Rock' | 'Romântico' | 'Casual';
  affinityTarget: 'dante' | 'lucas' | 'theo' | 'todos';
  description: string;
  pieces: Partial<EquippedOutfit>;
}
