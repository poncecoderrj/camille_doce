import type { DialogueNode } from './narrative.schema';
import cap00Data from '../../../content/arcs/arco_1_adolescencia/cap_00_prologo.json';
import cap01Data from '../../../content/arcs/arco_1_adolescencia/cap_01_aulas.json';
import cap02Data from '../../../content/arcs/arco_1_adolescencia/cap_02_clubes.json';
import cap03Data from '../../../content/arcs/arco_1_adolescencia/cap_03_blecaute.json';
import cap04Data from '../../../content/arcs/arco_1_adolescencia/cap_04_festival.json';

export interface ChapterMeta {
  id: string;
  arcId: string;
  title: string;
  description: string;
  initialNodeId: string;
}

export const CHAPTER_LIST: ChapterMeta[] = [
  {
    id: cap00Data.id,
    arcId: cap00Data.arc_id,
    title: cap00Data.title,
    description: cap00Data.description,
    initialNodeId: cap00Data.initial_node_id
  },
  {
    id: cap01Data.id,
    arcId: cap01Data.arc_id,
    title: cap01Data.title,
    description: cap01Data.description,
    initialNodeId: cap01Data.initial_node_id
  },
  {
    id: cap02Data.id,
    arcId: cap02Data.arc_id,
    title: cap02Data.title,
    description: cap02Data.description,
    initialNodeId: cap02Data.initial_node_id
  },
  {
    id: cap03Data.id,
    arcId: cap03Data.arc_id,
    title: cap03Data.title,
    description: cap03Data.description,
    initialNodeId: cap03Data.initial_node_id
  },
  {
    id: cap04Data.id,
    arcId: cap04Data.arc_id,
    title: cap04Data.title,
    description: cap04Data.description,
    initialNodeId: cap04Data.initial_node_id
  }
];

// Dicionário Unificado de Todos os Nós Narrativos do Arco 1
export const ALL_STORY_NODES: Record<string, DialogueNode> = {
  ...(cap00Data.nodes as unknown as Record<string, DialogueNode>),
  ...(cap01Data.nodes as unknown as Record<string, DialogueNode>),
  ...(cap02Data.nodes as unknown as Record<string, DialogueNode>),
  ...(cap03Data.nodes as unknown as Record<string, DialogueNode>),
  ...(cap04Data.nodes as unknown as Record<string, DialogueNode>)
};

export const FALLBACK_NODE_ID = 'node_00_despertador';

export function getStoryNode(nodeId: string): DialogueNode {
  return ALL_STORY_NODES[nodeId] || ALL_STORY_NODES['node_01_portao'] || ALL_STORY_NODES[FALLBACK_NODE_ID];
}

export function getChapterForNode(nodeId: string): string {
  if (nodeId.startsWith('c1_')) return 'cap_01_aulas';
  if (nodeId.startsWith('c2_')) return 'cap_02_clubes';
  if (nodeId.startsWith('c3_')) return 'cap_03_blecaute';
  if (nodeId.startsWith('c4_')) return 'cap_04_festival';
  return 'cap_00_prologo';
}
