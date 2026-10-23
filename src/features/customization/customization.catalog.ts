import type {
  OutfitOption,
  BodyArchetypeOption,
  HairStyleOption,
  HairColorOption,
  BackpackOption,
  OutfitId,
  BodyArchetype
} from './customization.schema';

export const OUTFIT_OPTIONS: OutfitOption[] = [
  {
    id: 'uniforme_lotus',
    name: 'Uniforme Oficial da Lótus',
    styleTag: 'Clássico',
    affinityTarget: 'lucas',
    affinityBonus: 10,
    description: 'Blazer azul marinho alinhado com bordado dourado e saia plissada tradicional da Academia Lótus. Lucas aprova a disciplina e etiqueta impecáveis.',
    previewImage: '/assets/characters/iris/base/uniforme_lotus.png'
  },
  {
    id: 'look_rock',
    name: 'Estilo Rocker & Atitude',
    styleTag: 'Rock',
    affinityTarget: 'dante',
    affinityBonus: 15,
    description: 'Jaqueta de couro preta com zíperes, detalhes prateados e atitude underground. Dante fica instantaneamente hipnotizado pelo estilo garageiro.',
    previewImage: '/assets/characters/iris/base/look_rock.png'
  },
  {
    id: 'look_romantico',
    name: 'Vestido Cottagecore Poético',
    styleTag: 'Romântico',
    affinityTarget: 'theo',
    affinityBonus: 15,
    description: 'Vestido fluido floral em tons suaves com laço e caimento delicado. Theo enxerga poesia pura e diz que você parece ter saído de um conto de fadas.',
    previewImage: '/assets/characters/iris/base/look_romantico.png'
  }
];

export const BODY_ARCHETYPES: BodyArchetypeOption[] = [
  {
    id: 'padrao',
    name: 'Padrão Clássica',
    badge: '1.65m • Proporção Áurea',
    heightLabel: '1.65m',
    description: 'Proporções clássicas da protagonista de visual novel, postura equilibrada e elegante.',
    previewImage: '/assets/characters/iris/base/uniforme_lotus.png'
  },
  {
    id: 'curvy_plussize',
    name: 'Curvilínea / Plus Size',
    badge: '1.62m • Curvas Macias',
    heightLabel: '1.62m',
    description: 'Biotipo encorpado, com quadris desenhados, curvas suaves e presença acolhedora e radiante.',
    previewImage: '/assets/characters/iris/base/corpo_curvy_plussize.png'
  },
  {
    id: 'delicada_magra',
    name: 'Magra / Delicada / Petit',
    badge: '1.55m • Traços Finos',
    heightLabel: '1.55m',
    description: 'Silhueta esguia e delicada com membros finos e postura doce de vulnerabilidade refinada.',
    previewImage: '/assets/characters/iris/base/corpo_delicada_magra.png'
  },
  {
    id: 'atletica_musculosa',
    name: 'Atlética / Tonificada',
    badge: '1.70m • Ombros Firmes',
    heightLabel: '1.70m',
    description: 'Ombros definidos, postura firme, pernas musculosas e energia ativa de quem pratica esportes.',
    previewImage: '/assets/characters/iris/base/corpo_atletica_musculosa.png'
  },
  {
    id: 'alta_esbelta',
    name: 'Alta / Esbelta',
    badge: '1.76m • Porte Elegante',
    heightLabel: '1.76m',
    description: 'Pernas longas, porte altivo de passarela e elegância natural que se destaca em qualquer ambiente.',
    previewImage: '/assets/characters/iris/base/corpo_neutro.png'
  }
];

export const HAIR_STYLES: HairStyleOption[] = [
  {
    id: 'ondulado_longo',
    name: 'Ondulado Longo Romântico',
    description: 'Cachos soltos e sedosos que caem sobre os ombros com brilho acetinado e movimento suave.',
    tag: 'Romântico',
    badge: 'Original da Protagonista'
  },
  {
    id: 'bob_chanel',
    name: 'Bob Cut Chanel Moderno',
    description: 'Corte reto e sofisticado na altura do queixo, moderno e elegante para a rotina de estudos.',
    tag: 'Moderno',
    badge: 'Sofisticado'
  },
  {
    id: 'rabo_cavalo',
    name: 'Rabo de Cavalo Alto Rebelde',
    description: 'Preso no alto da cabeça com mechas frontais soltas, dinâmico e cheio de energia.',
    tag: 'Dinâmico',
    badge: 'Esportivo'
  }
];

export const HAIR_COLORS: HairColorOption[] = [
  { id: 'castanho', name: 'Castanho Chocolate', color: '#4a2c11', highlight: '#6d4420' },
  { id: 'preto', name: 'Preto Ônix', color: '#1a191b', highlight: '#353439' },
  { id: 'loiro', name: 'Loiro Mel Dourado', color: '#c99a4c', highlight: '#edd185' },
  { id: 'ruivo', name: 'Ruivo Canela Intenso', color: '#a33a1e', highlight: '#d9653f' },
  { id: 'rosa', name: 'Rosa Sakura Pastel', color: '#e06287', highlight: '#fca5c2' },
  { id: 'azul', name: 'Azul Meia-Noite', color: '#1e3a8a', highlight: '#3b82f6' },
  { id: 'roxo', name: 'Roxo Ametista', color: '#6b21a8', highlight: '#a855f7' },
  { id: 'esmeralda', name: 'Verde Esmeralda', color: '#047857', highlight: '#10b981' },
  { id: 'prata', name: 'Prata Platinado', color: '#94a3b8', highlight: '#e2e8f0' },
  { id: 'vinho', name: 'Vinho Borgonha', color: '#701a35', highlight: '#9f1239' }
];

export const BACKPACK_OPTIONS: BackpackOption[] = [
  {
    id: 'mochila_lotus',
    name: 'Mochila de Couro da Lótus',
    description: 'Couro caramelo refinado com fivelas douradas e o brasão em relevo da Academia Lótus.',
    affinityTarget: 'lucas',
    icon: '🎒'
  },
  {
    id: 'bolsa_rock',
    name: 'Bolsa Carteiro Rock & Pins',
    description: 'Lona reforçada escura com botons de guitarras, palhetas e zíperes metálicos rebeldes.',
    affinityTarget: 'dante',
    icon: '🎸'
  },
  {
    id: 'tote_romantica',
    name: 'Bolsa Tote Botânica de Linho',
    description: 'Linho cru sustentável com bordado delicado de folhas de ginkgo e alça confortável.',
    affinityTarget: 'theo',
    icon: '🌿'
  },
  {
    id: 'nenhuma',
    name: 'Sem Mochila',
    description: 'Caminhe livremente sem bolsas ou mochilas nos ombros.',
    affinityTarget: 'todos',
    icon: '✨'
  }
];

export const BOY_REACTIONS: Record<OutfitId, {
  dante: string;
  lucas: string;
  theo: string;
}> = {
  uniforme_lotus: {
    dante: 'Todo mundo usa esse blazer engomado, mas em você... até que não ficou tão careta assim.',
    lucas: 'Excelente escolha. O uniforme oficial preserva a honra e tradição secular da nossa escola. Você está impecável.',
    theo: 'O azul marinho traz uma serenidade bonita para seus passos... Um clássico que ganha poesia com sua presença.'
  },
  look_rock: {
    dante: 'Caramba... Essa jaqueta ficou insana em você! Se quiser colar no ensaio da banda hoje no galpão, o passe tá liberado.',
    lucas: 'Jaqueta de couro no campus viola três normas do conselho... mas hoje vou fingir que não vi o regulamento.',
    theo: 'O contraste entre a firmeza do couro escuro e a suavidade do seu olhar tem uma força lírica impressionante.'
  },
  look_romantico: {
    dante: 'Flores e renda? É um estilo bem diferente do som pesado que eu toco, mas admito que você ficou linda.',
    lucas: 'Um traje refinado e gracioso. Traz uma harmonia suave e acolhedora para o ambiente da escola.',
    theo: 'Parece uma aquarela que ganhou vida própria... Eu poderia passar a tarde inteira rascunhando esse movimento no meu caderno.'
  }
};

/**
 * Mapeamento da Ilustração Mestra Base para cada combinação de Biotipo e Look
 * Garante ilustração de alta fidelidade fechada (sem fatiamento de roupas).
 */
export function resolveProtagonistMasterIllustration(
  body: BodyArchetype,
  outfit: OutfitId
): string {
  // Se o usuário selecionou biotipos específicos desenhados
  if (body === 'curvy_plussize') {
    return '/assets/characters/iris/base/corpo_curvy_plussize.png';
  }
  if (body === 'delicada_magra') {
    return '/assets/characters/iris/base/corpo_delicada_magra.png';
  }
  if (body === 'atletica_musculosa') {
    return '/assets/characters/iris/base/corpo_atletica_musculosa.png';
  }
  if (body === 'alta_esbelta') {
    // Alta esbelta usa a silhueta esbelta de alta estatura
    return outfit === 'look_romantico' 
      ? '/assets/characters/iris/base/look_romantico.png' 
      : '/assets/characters/iris/base/corpo_neutro.png';
  }

  // Padrão: varia diretamente pelo look selecionado
  switch (outfit) {
    case 'look_rock':
      return '/assets/characters/iris/base/look_rock.png';
    case 'look_romantico':
      return '/assets/characters/iris/base/look_romantico.png';
    case 'uniforme_lotus':
    default:
      return '/assets/characters/iris/base/uniforme_lotus.png';
  }
}

/**
 * Mapeia o asset de mochila / bolsa
 */
export function resolveBackpackAsset(backpack: string): string | null {
  switch (backpack) {
    case 'mochila_lotus':
      return '/assets/characters/iris/acessorios/mochila_lotus.png';
    case 'bolsa_rock':
      return '/assets/characters/iris/acessorios/bolsa_rock.png';
    case 'tote_romantica':
      return '/assets/characters/iris/acessorios/tote_romantica.png';
    default:
      return null;
  }
}
