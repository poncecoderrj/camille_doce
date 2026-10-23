import { z } from 'zod';

// 1. OS 5 TIPOS DE CORPO PARA A PERSONAGEM (ESCOLHA ANATÔMICA)
export const BodyArchetypeEnum = z.enum([
  'padrao',            // 1. Padrão / Clássica (Equilíbrio clássico)
  'curvy_plussize',    // 2. Curvilínea / Plus Size (Encorpada, curvas macias, busto/quadril desenhados)
  'delicada_magra',    // 3. Magra / Delicada / Petit (Esguia, braços e pernas finos, porte gracioso)
  'atletica_musculosa',// 4. Atlética / Tonificada (Firme, ombros definidos, mangas arregaçadas)
  'alta_esbelta'       // 5. Alta / Esbelta (Silhueta longilínea 1.76m estilo modelo/passarela)
]);
export type BodyArchetype = z.infer<typeof BodyArchetypeEnum>;

// 2. OS LOOKS COMPLETOS OFICIAIS
export const OutfitIdEnum = z.enum([
  'uniforme_lotus',    // Uniforme Oficial da Academia Lótus
  'look_rock',         // Estilo Rock & Atitude Noturna
  'look_romantico'     // Estilo Romântico & Poético
]);
export type OutfitId = z.infer<typeof OutfitIdEnum>;

// 3. PENTEADOS / TIPOS DE CABELO
export const HairStyleEnum = z.enum([
  'ondulado_longo',    // Ondulado Romântico que cai pelos ombros
  'bob_chanel',        // Bob Cut Chanel moderno e sofisticado
  'rabo_cavalo'        // Rabo de cavalo alto dinâmico e rebelde
]);
export type HairStyle = z.infer<typeof HairStyleEnum>;

// 4. MOCHILAS & BOLSAS ESCOLARES
export const BackpackEnum = z.enum([
  'mochila_lotus',     // Mochila clássica de couro caramelo com fivelas douradas
  'bolsa_rock',        // Bolsa carteiro transversal com botons de banda
  'tote_romantica',    // Bolsa tote ecológica de linho botânica
  'nenhuma'            // Sem mochila
]);
export type BackpackType = z.infer<typeof BackpackEnum>;

// SCHEMA PRINCIPAL DO VISUAL EQUIPADO
export const EquippedOutfitSchema = z.object({
  // 1. Look selecionado
  outfit_id: OutfitIdEnum.default('uniforme_lotus'),
  
  // 2. Biotipo da personagem (1 dos 5 corpos)
  body_archetype: BodyArchetypeEnum.default('padrao'),
  
  // 3. Cor do cabelo em tempo real (Paleta The Sims)
  hair_color: z.string().default('#4a2c11'),
  
  // 4. Tipo de cabelo / penteado
  hair_style: HairStyleEnum.default('ondulado_longo'),
  
  // 5. Mochila / bolsa
  backpack: BackpackEnum.default('mochila_lotus'),

  // Acessórios adicionais
  glasses: z.boolean().default(false),
  blush: z.boolean().default(true),

  // Sliders morfológicos
  height: z.number().default(1.65),
  body_build: z.number().default(0),
  muscle_tone: z.number().default(20),

  // Campos de compatibilidade legada
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
  hair_back: z.string().optional(),
  hat: z.boolean().optional()
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
  heightLabel: string;
  description: string;
  previewImage: string;
}

export interface HairStyleOption {
  id: HairStyle;
  name: string;
  description: string;
  tag: string;
  badge: string;
}

export interface BackpackOption {
  id: BackpackType;
  name: string;
  description: string;
  affinityTarget: 'lucas' | 'dante' | 'theo' | 'todos';
  icon: string;
}

export interface HairColorOption {
  id: string;
  name: string;
  color: string;
  highlight: string;
}
