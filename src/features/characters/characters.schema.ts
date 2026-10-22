import { z } from 'zod';

export const CharacterExpressionEnum = z.enum([
  'neutro',
  'sorriso',
  'smirk',
  'provocador',
  'serio',
  'timido',
  'envergonhado',
  'blush',
  'irritado',
  'surpreso',
  'pensativo',
  'sonhador',
  'melancolico',
  'afetuoso'
]);
export type CharacterExpression = z.infer<typeof CharacterExpressionEnum>;

export interface BoyCharacterProps {
  expression?: string;
  timeOfDay?: 'manha' | 'tarde' | 'entardecer' | 'noite';
  outfit?: string;
  class?: string;
}
