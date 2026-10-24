import { z } from 'zod';

export const TomEnum = z.enum(['sincero', 'provocador', 'cuidadoso', 'escapista']);
export type Tom = z.infer<typeof TomEnum>;

export const PersonagemEnum = z.enum([
  'dante',
  'lucas',
  'theo',
  'iris',
  'protagonista',
  'rafael',
  'beatriz',
  'nina',
  'mara',
  'caio',
  'helena',
  'melissa',
  'ravi',
  'narrador'
]);
export type PersonagemId = z.infer<typeof PersonagemEnum>;

export const ChoiceSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  tipo: z.enum(['Tom', 'Ação', 'Revelação', 'Prioridade', 'Sacrifício']),
  tom: TomEnum.optional(),
  target_character: PersonagemEnum.optional(),
  affinity_delta: z.number().int().min(-20).max(20).default(0),
  set_flags: z.record(z.string(), z.union([z.boolean(), z.number(), z.string()])).optional(),
  unlock_memory_tag: z.string().optional(),
  next_node_id: z.string()
});
export type Choice = z.infer<typeof ChoiceSchema>;

export const DialogueNodeSchema = z.object({
  id: z.string(),
  speaker: PersonagemEnum,
  speaker_name: z.string().optional(),
  expression: z.string().default('neutral'),
  text: z.string().min(1),
  location: z.string(),
  time_of_day: z.enum(['manha', 'tarde', 'entardecer', 'noite']),
  bg_music: z.string().optional(),
  sfx: z.string().optional(),
  requires_memory: z.string().optional(),
  requires_flags: z.record(z.string(), z.union([z.boolean(), z.number(), z.string()])).optional(),
  choices: z.array(ChoiceSchema).min(1).max(4)
});
export type DialogueNode = z.infer<typeof DialogueNodeSchema>;

export const ChapterSchema = z.object({
  id: z.string(),
  arc_id: z.string(),
  title: z.string(),
  description: z.string(),
  initial_node_id: z.string(),
  nodes: z.record(z.string(), DialogueNodeSchema)
});
export type Chapter = z.infer<typeof ChapterSchema>;

export const DressCodeCriteriaSchema = z.object({
  target_character: PersonagemEnum,
  cg_id: z.string(),
  required_tags: z.array(z.string()).min(1),
  min_items_with_tag: z.number().int().min(1),
  prohibited_tags: z.array(z.string()).optional()
});
export type DressCodeCriteria = z.infer<typeof DressCodeCriteriaSchema>;
