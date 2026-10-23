import { z } from 'zod';

// OS LOOKS OFICIAIS DA PROTAGONISTA (CADA UM É UMA ILUSTRAÇÃO ÚNICA E COMPLETA)
export const OutfitIdEnum = z.enum([
  'uniforme_lotus',    // Uniforme Oficial da Academia Lótus
  'look_rock',         // Estilo Rock & Jaqueta de Couro
  'look_romantico'     // Estilo Romântico & Poético
]);
export type OutfitId = z.infer<typeof OutfitIdEnum>;

export interface OutfitOption {
  id: OutfitId;
  name: string;
  styleTag: 'Clássico' | 'Rock' | 'Romântico';
  affinityTarget: 'lucas' | 'dante' | 'theo';
  affinityBonus: number;
  description: string;
  image: string;
}
