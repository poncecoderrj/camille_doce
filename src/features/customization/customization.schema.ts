import { z } from 'zod';

// OS LOOKS OFICIAIS DA PROTAGONISTA (CADA UM É UMA ILUSTRAÇÃO ÚNICA E COMPLETA)
export const OutfitIdEnum = z.enum([
  'uniforme_lotus',       // Uniforme Oficial da Academia Lótus
  'look_rock',            // Estilo Rock & Jaqueta de Couro
  'look_romantico',       // Estilo Romântico & Poético
  'look_casual_street',   // Estilo Casual Streetwear Confortável
  'look_academico_chic'   // Estilo Dark Academia & Alfaiataria Chic
]);
export type OutfitId = z.infer<typeof OutfitIdEnum>;

export interface OutfitOption {
  id: OutfitId;
  name: string;
  styleTag: 'Clássico' | 'Rock' | 'Romântico' | 'Casual' | 'Acadêmico';
  affinityTarget: 'lucas' | 'dante' | 'theo' | 'geral';
  affinityBonus: number;
  description: string;
  image: string;
}
