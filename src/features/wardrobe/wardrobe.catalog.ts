import type { 
  OutfitOption, 
  BodyArchetypeOption, 
  HairColorOption 
} from './wardrobe.schema';

// 1. LOOKS COMPLETOS ILUSTRADOS (ZERO SOBREPOSIÇÃO DE TECIDO)
export const OUTFIT_OPTIONS: OutfitOption[] = [
  {
    id: 'uniforme_lotus',
    name: 'Uniforme Oficial da Academia Lótus',
    styleTag: 'Clássico',
    affinityTarget: 'lucas',
    affinityBonus: 10,
    description: 'Blazer azul marinho estruturado com botões de latão dourado, camisa social branca de algodão com laço impecável e saia pregueada.',
    previewImage: '/assets/characters/iris/base/uniforme_lotus.png'
  },
  {
    id: 'look_rock',
    name: 'Estilo Rock & Atitude Noturna',
    styleTag: 'Rock',
    affinityTarget: 'dante',
    affinityBonus: 12,
    description: 'Jaqueta biker de couro preto autêntico com zíperes assimétricos, camiseta grunge estampada da banda The Rust, saia xadrez rubro e coturnos.',
    previewImage: '/assets/characters/iris/base/look_rock.png'
  },
  {
    id: 'look_romantico',
    name: 'Estilo Romântico & Poético',
    styleTag: 'Romântico',
    affinityTarget: 'theo',
    affinityBonus: 12,
    description: 'Suéter aconchegante de tricô marfim com gola volumosa, saia midi plissada fluida em tom suave e atmosfera artística.',
    previewImage: '/assets/characters/iris/base/look_romantico.png'
  }
];

// 2. BIOTIPOS ANATÔMICOS DESENHADOS À MÃO (THE SIMS 2D)
export const BODY_ARCHETYPES: BodyArchetypeOption[] = [
  {
    id: 'padrao',
    name: 'Padrão Lótus',
    badge: '1.65m • Clássica',
    description: 'Proporção equilibrada padrão de heroína romântica de visual novel.',
    height: 1.65,
    body_build: 0,
    muscle_tone: 25,
    previewImage: '/assets/characters/iris/base/uniforme_lotus.png'
  },
  {
    id: 'curvy_plussize',
    name: 'Curvilínea / Plus Size',
    badge: '1.62m • Encorpada',
    description: 'Traços desenhados com bochechas mais cheias, busto e quadril generosos e curvas suaves e acolhedoras.',
    height: 1.62,
    body_build: 38,
    muscle_tone: 20,
    previewImage: '/assets/characters/iris/base/corpo_curvy_plussize.png'
  },
  {
    id: 'delicada_magra',
    name: 'Magra / Delicada',
    badge: '1.55m • Petit',
    description: 'Silhueta bem esguia e longilínea, braços e pernas finos, clavícula aparente e porte jovial gracioso.',
    height: 1.55,
    body_build: -30,
    muscle_tone: 15,
    previewImage: '/assets/characters/iris/base/corpo_delicada_magra.png'
  },
  {
    id: 'atletica_musculosa',
    name: 'Atlética / Definida',
    badge: '1.70m • Firme',
    description: 'Postura esportiva e firme, ombros levemente mais desenhados, mangas arregaçadas e pernas tonificadas.',
    height: 1.70,
    body_build: 10,
    muscle_tone: 85,
    previewImage: '/assets/characters/iris/base/corpo_atletica_musculosa.png'
  }
];

// 3. PALETA DE CORES DE CABELO EM TEMPO REAL (THE SIMS)
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

// 4. TONS DE PELE
export const SKIN_TONES = [
  { id: 'pele_clara', name: 'Porcelana Clara', fill: '#fee5d5', shadow: '#eec4ae' },
  { id: 'pele_dourada', name: 'Bege Dourado', fill: '#ebd0a9', shadow: '#d7b486' },
  { id: 'pele_morena', name: 'Morena Canela', fill: '#c69469', shadow: '#ab784f' },
  { id: 'pele_negra', name: 'Ébano Suave', fill: '#8a593e', shadow: '#6f4028' }
];

// 5. ACESSÓRIOS
export const ACCESSORIES = [
  {
    id: 'glasses',
    name: 'Óculos Redondos de Grau (Armação Dourada)',
    category: 'oculos',
    affinityTarget: 'lucas',
    description: 'Lentes redondas finas com acabamento clássico em latão dourado polido. Confere ar inteligente e compenetrado.',
    icon: '👓'
  },
  {
    id: 'blush',
    name: 'Rubor Natural nas Bochechas',
    category: 'rosto',
    affinityTarget: 'theo',
    description: 'Tom rosado suave que dá vida e expressividade meiga ao rosto.',
    icon: '🌸'
  }
];

// Compatibilidade de export para evitar erros em referências existentes
export const WARDROBE_CATALOG: any[] = [];
export const OUTFIT_PRESETS = OUTFIT_OPTIONS;
export const BODY_PRESETS = BODY_ARCHETYPES;
export const HAIR_STYLES = [
  { id: 'ondulado_longo', name: 'Ondulado Longo Romântico', description: 'Fios longos e naturais', tag: 'Romântico' },
  { id: 'bob_curto', name: 'Bob Cut Moderno', description: 'Chanel elegante', tag: 'Clássico' },
  { id: 'rabo_cavalo', name: 'Rabo de Cavalo Alto', description: 'Dinâmico e enérgico', tag: 'Rock' }
];
export const EYE_COLORS = [
  { id: 'olhos_castanhos', name: 'Castanho Avelã', color: '#6b4126' },
  { id: 'olhos_azuis', name: 'Azul Safira', color: '#2563eb' },
  { id: 'olhos_verdes', name: 'Verde Esmeralda', color: '#059669' }
];
