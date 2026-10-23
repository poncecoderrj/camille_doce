import type { 
  OutfitOption, 
  BodyArchetypeOption, 
  HairStyleOption,
  BackpackOption,
  HairColorOption 
} from './wardrobe.schema';

// 1. LOOKS & TRAJES COMPLETOS
export const OUTFIT_OPTIONS: OutfitOption[] = [
  {
    id: 'uniforme_lotus',
    name: 'Uniforme Oficial da Academia Lótus',
    styleTag: 'Clássico',
    affinityTarget: 'lucas',
    affinityBonus: 10,
    description: 'Blazer estruturado azul marinho com botões de latão dourado, camisa social branca de algodão nobre com laço azul e saia pregueada.',
    previewImage: '/assets/characters/iris/base/uniforme_lotus.png'
  },
  {
    id: 'look_rock',
    name: 'Estilo Rock & Atitude Noturna',
    styleTag: 'Rock',
    affinityTarget: 'dante',
    affinityBonus: 12,
    description: 'Jaqueta biker de couro preto autêntico com zíperes, camiseta vintage da banda The Rust, saia xadrez rubro plissada e coturnos de combate.',
    previewImage: '/assets/characters/iris/base/look_rock.png'
  },
  {
    id: 'look_romantico',
    name: 'Estilo Romântico & Poético',
    styleTag: 'Romântico',
    affinityTarget: 'theo',
    affinityBonus: 12,
    description: 'Suéter aconchegante de tricô marfim com gola volumosa e toque macio de lã, saia midi plissada fluida e boina mostarda charmosa.',
    previewImage: '/assets/characters/iris/base/look_romantico.png'
  }
];

// 2. OS 5 TIPOS DE CORPO PARA A PERSONAGEM (ESCOLHA ANATÔMICA)
export const BODY_ARCHETYPES: BodyArchetypeOption[] = [
  {
    id: 'padrao',
    name: 'Padrão / Clássica',
    badge: '1.65m • Clássica',
    heightLabel: '1.65m',
    description: 'Proporção equilibrada padrão de heroína romântica clássica de visual novel.',
    previewImage: '/assets/characters/iris/base/uniforme_lotus.png'
  },
  {
    id: 'curvy_plussize',
    name: 'Curvilínea / Plus Size',
    badge: '1.62m • Encorpada',
    heightLabel: '1.62m',
    description: 'Traços desenhados com bochechas mais cheias, busto e quadril generosos e curvas anatômicas macias e naturais.',
    previewImage: '/assets/characters/iris/base/corpo_curvy_plussize.png'
  },
  {
    id: 'delicada_magra',
    name: 'Magra / Delicada (Petit)',
    badge: '1.55m • Petit',
    heightLabel: '1.55m',
    description: 'Silhueta bem esguia e longilínea, braços e pernas finos, clavícula aparente e porte jovial gracioso.',
    previewImage: '/assets/characters/iris/base/corpo_delicada_magra.png'
  },
  {
    id: 'atletica_musculosa',
    name: 'Atlética / Tonificada',
    badge: '1.70m • Firme',
    heightLabel: '1.70m',
    description: 'Postura esportiva e firme, ombros levemente mais desenhados, mangas arregaçadas e pernas tonificadas de atleta.',
    previewImage: '/assets/characters/iris/base/corpo_atletica_musculosa.png'
  },
  {
    id: 'alta_esbelta',
    name: 'Alta / Esbelta (Modelo)',
    badge: '1.76m • Passarela',
    heightLabel: '1.76m',
    description: 'Estatura alta e imponente com porte longilíneo estilo passarela, elegante, confiante e graciosa.',
    previewImage: '/assets/characters/iris/base/uniforme_lotus.png'
  }
];

// 3. TIPOS DE CABELO / PENTEADOS
export const HAIR_STYLES: HairStyleOption[] = [
  {
    id: 'ondulado_longo',
    name: 'Ondulado Romântico',
    description: 'Fios longos e naturais em ondas suaves que caem graciosamente pelos ombros.',
    tag: 'Romântico',
    badge: 'Natural & Longo'
  },
  {
    id: 'bob_chanel',
    name: 'Bob Cut Chanel Moderno',
    description: 'Corte curto geométrico e polido na altura da mandíbula, moderno e sofisticado.',
    tag: 'Clássico',
    badge: 'Curto & Polido'
  },
  {
    id: 'rabo_cavalo',
    name: 'Rabo de Cavalo Alto',
    description: 'Penteado dinâmico e rebelde preso no alto com mechas soltas nas têmporas.',
    tag: 'Rock',
    badge: 'Dinâmico & Alto'
  }
];

// 4. MOCHILAS & BOLSAS ESCOLARES
export const BACKPACK_OPTIONS: BackpackOption[] = [
  {
    id: 'mochila_lotus',
    name: 'Mochila de Couro da Lótus',
    description: 'Couro caramelo estruturado com alças nobres e fivelas de latão dourado polido.',
    affinityTarget: 'lucas',
    icon: '🎒'
  },
  {
    id: 'bolsa_rock',
    name: 'Bolsa Carteiro Rock & Pins',
    description: 'Alça transversal de lona preta enfeitada com botons de guitarra, vinil e rock.',
    affinityTarget: 'dante',
    icon: '🎸'
  },
  {
    id: 'tote_romantica',
    name: 'Bolsa Tote Bag Botânica',
    description: 'Linho cru ecológico com alça suave e delicada ilustração floral em aquarela.',
    affinityTarget: 'theo',
    icon: '🌿'
  },
  {
    id: 'nenhuma',
    name: 'Sem Mochila (Livre)',
    description: 'Nenhum acessório nas costas ou ombros, visual minimalista e limpo.',
    affinityTarget: 'todos',
    icon: '✨'
  }
];

// 5. PALETA DE CORES DE CABELO EM TEMPO REAL (THE SIMS)
export const HAIR_COLORS: HairColorOption[] = [
  { id: '#4a2c11', name: 'Castanho Chocolate', color: '#4a2c11', highlight: '#73461d' },
  { id: '#18181b', name: 'Preto Ônix', color: '#18181b', highlight: '#3f3f46' },
  { id: '#d97706', name: 'Loiro Mel Dourado', color: '#d97706', highlight: '#fcd34d' },
  { id: '#b91c1c', name: 'Ruivo Acobreado', color: '#b91c1c', highlight: '#f87171' },
  { id: '#ec4899', name: 'Rosa Algodão Doce', color: '#ec4899', highlight: '#fbcfe8' },
  { id: '#3b82f6', name: 'Azul Meia-Noite', color: '#3b82f6', highlight: '#93c5fd' },
  { id: '#8b5cf6', name: 'Roxo Lavanda Ametista', color: '#8b5cf6', highlight: '#c4b5fd' },
  { id: '#10b981', name: 'Verde Esmeralda', color: '#10b981', highlight: '#6ee7b7' },
  { id: '#e2e8f0', name: 'Platinado Glacial', color: '#e2e8f0', highlight: '#ffffff' },
  { id: '#881337', name: 'Vinho Borgonha Cereja', color: '#881337', highlight: '#e11d48' }
];

// TONS DE PELE
export const SKIN_TONES = [
  { id: 'pele_clara', name: 'Porcelana Clara', fill: '#fee5d5', shadow: '#eec4ae' },
  { id: 'pele_dourada', name: 'Bege Dourado', fill: '#ebd0a9', shadow: '#d7b486' },
  { id: 'pele_morena', name: 'Morena Canela', fill: '#c69469', shadow: '#ab784f' },
  { id: 'pele_negra', name: 'Ébano Suave', fill: '#8a593e', shadow: '#6f4028' }
];

// COMPATIBILIDADE DE EXPORT
export const WARDROBE_CATALOG: any[] = [];
export const OUTFIT_PRESETS = OUTFIT_OPTIONS;
export const BODY_PRESETS = BODY_ARCHETYPES;
export const EYE_COLORS = [
  { id: 'olhos_castanhos', name: 'Castanho Avelã', color: '#6b4126' },
  { id: 'olhos_azuis', name: 'Azul Safira', color: '#2563eb' },
  { id: 'olhos_verdes', name: 'Verde Esmeralda', color: '#059669' }
];
