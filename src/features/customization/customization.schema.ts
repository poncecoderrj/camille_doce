import { z } from 'zod';

// 1. OS 5 BIOTIPOS ANATÔMICOS DA HEROÍNA
export const BodyArchetypeEnum = z.enum([
  'padrao',            // 1. Padrão Lótus (1.65m • Clássica)
  'curvy_plussize',    // 2. Curvilínea / Plus Size (1.62m • Encorpada, curvas macias desenhadas)
  'delicada_magra',    // 3. Magra / Delicada / Petit (1.55m • Esguia, membros finos)
  'atletica_musculosa',// 4. Atlética / Tonificada (1.70m • Firme, ombros definidos)
  'alta_esbelta'       // 5. Alta / Esbelta (1.76m • Passarela)
]);
export type BodyArchetype = z.infer<typeof BodyArchetypeEnum>;

// 2. OS LOOKS OFICIAIS COMPLETOS
export const OutfitIdEnum = z.enum([
  'uniforme_lotus',    // Uniforme Oficial da Academia Lótus (Lucas)
  'look_rock',         // Estilo Rock & Atitude Noturna (Dante)
  'look_romantico'     // Estilo Romântico & Poético (Theo)
]);
export type OutfitId = z.infer<typeof OutfitIdEnum>;

// 3. PENTEADOS / TIPOS DE CABELO
export const HairStyleEnum = z.enum([
  'ondulado_longo',    // Ondulado Romântico
  'bob_chanel',        // Bob Cut Chanel Moderno
  'rabo_cavalo'        // Rabo de Cavalo Alto Rebelde
]);
export type HairStyle = z.infer<typeof HairStyleEnum>;

// 4. MOCHILAS & BOLSAS ESCOLARES
export const BackpackEnum = z.enum([
  'mochila_lotus',     // Mochila de Couro Caramelo da Lótus
  'bolsa_rock',        // Bolsa Carteiro Transversal com Botons
  'tote_romantica',    // Bolsa Tote Ecológica de Linho Botânica
  'nenhuma'            // Sem Mochila
]);
export type BackpackType = z.infer<typeof BackpackEnum>;

// SCHEMA DE ESTADO DA PROTAGONISTA
export const ProtagonistCustomizationSchema = z.object({
  outfit_id: OutfitIdEnum.default('uniforme_lotus'),
  body_archetype: BodyArchetypeEnum.default('padrao'),
  hair_color: z.string().default('#4a2c11'),
  hair_style: HairStyleEnum.default('ondulado_longo'),
  backpack: BackpackEnum.default('mochila_lotus'),
  glasses: z.boolean().default(false),
  blush: z.boolean().default(true),
  expression: z.string().default('neutro')
});

export type ProtagonistCustomization = z.infer<typeof ProtagonistCustomizationSchema>;

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
