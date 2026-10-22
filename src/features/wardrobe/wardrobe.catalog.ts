import type { WardrobeItem, OutfitPreset } from './wardrobe.schema';

export const SKIN_TONES = [
  { id: 'pele_clara', name: 'Porcelana Clara', fill: '#fee5d5', shadow: '#eec4ae' },
  { id: 'pele_dourada', name: 'Bege Dourado', fill: '#ebd0a9', shadow: '#d7b486' },
  { id: 'pele_morena', name: 'Morena Canela', fill: '#c69469', shadow: '#ab784f' },
  { id: 'pele_negra', name: 'Ébano Suave', fill: '#8a593e', shadow: '#6f4028' }
];

export const EYE_COLORS = [
  { id: 'olhos_castanhos', name: 'Castanho Avelã', color: '#6b4126' },
  { id: 'olhos_azuis', name: 'Azul Safira', color: '#2563eb' },
  { id: 'olhos_verdes', name: 'Verde Esmeralda', color: '#059669' },
  { id: 'olhos_violeta', name: 'Violeta Enigmático', color: '#7c3aed' },
  { id: 'olhos_ambar', name: 'Âmbar Dourado', color: '#d97706' }
];

export const HAIR_COLORS = [
  { id: '#4a2c11', name: 'Castanho Chocolate', color: '#4a2c11', highlight: '#73461d' },
  { id: '#1a191f', name: 'Preto Ônix', color: '#1a191f', highlight: '#3a3945' },
  { id: '#c99346', name: 'Loiro Mel', color: '#c99346', highlight: '#e6ba75' },
  { id: '#9c381e', name: 'Ruivo Acobreado', color: '#9c381e', highlight: '#c45335' },
  { id: '#d46a8a', name: 'Rosa Algodão Doce', color: '#d46a8a', highlight: '#f09ab5' }
];

export const WARDROBE_CATALOG: WardrobeItem[] = [
  // ================= CABELO FRENTE & TRÁS =================
  {
    id: 'cabelo_franja_onda',
    name: 'Ondulado Romântico',
    category: 'cabelo_frente',
    zIndex: 90,
    tags: ['Romântico', 'Feminino'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 5,
    description: 'Franja suave com mechas onduladas que caem pelos ombros.'
  },
  {
    id: 'cabelo_bob_chanel',
    name: 'Bob Cut Moderno',
    category: 'cabelo_frente',
    zIndex: 90,
    tags: ['Clássico', 'Elegante'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 5,
    description: 'Corte chanel simétrico e polido, transmite maturidade e foco.'
  },
  {
    id: 'cabelo_rabo_cavalo',
    name: 'Rabo de Cavalo Alto',
    category: 'cabelo_frente',
    zIndex: 90,
    tags: ['Rock', 'Dinâmico'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 5,
    description: 'Penteado prático e rebelde com franjas laterais soltas.'
  },
  {
    id: 'cabelo_coque_boemio',
    name: 'Coque Despojado',
    category: 'cabelo_frente',
    zIndex: 90,
    tags: ['Casual', 'Artístico'],
    rarity: 'Raro',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 5,
    description: 'Coque alto levemente bagunçado com mechas despretensiosas.'
  },

  // ================= PEÇAS SUPERIORES (TOP) =================
  {
    id: 'camisa_uniforme_lotus',
    name: 'Camisa Social da Academia',
    category: 'superior',
    zIndex: 70,
    tags: ['Clássico', 'Acadêmico'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 5,
    description: 'Camisa branca de algodão egípcio com laço azul marinho no colarinho.'
  },
  {
    id: 'camiseta_rock_banda',
    name: 'Camiseta Grunge "The Rust"',
    category: 'superior',
    zIndex: 70,
    tags: ['Rock', 'Rebelde'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 6,
    description: 'Camiseta preta de banda com estampa vintage desgastada e gola solta.'
  },
  {
    id: 'sueter_trico_creme',
    name: 'Suéter de Lã Oversized',
    category: 'superior',
    zIndex: 70,
    tags: ['Romântico', 'Aconchegante'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 6,
    description: 'Suéter fofo tricotado à mão em tom marfim com mangas confortáveis.'
  },
  {
    id: 'blusa_romantica_renda',
    name: 'Blusa Chiffon Flor de Lótus',
    category: 'superior',
    zIndex: 70,
    tags: ['Romântico', 'Delicado'],
    rarity: 'Raro',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 6,
    description: 'Tecido fino semitransparente com bordados florais nos punhos.'
  },
  {
    id: 'regata_urbana_cinza',
    name: 'Regata Streetwear Minimalista',
    category: 'superior',
    zIndex: 70,
    tags: ['Casual', 'Moderno'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'todos',
    affinityBonus: 3,
    description: 'Regata casual em algodão cinza mescla com caimento solto.'
  },

  // ================= PEÇAS INFERIORES (BOTTOM) =================
  {
    id: 'saia_pregueada_azul',
    name: 'Saia Pregueada Lótus',
    category: 'inferior',
    zIndex: 60,
    tags: ['Clássico', 'Uniforme'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 5,
    description: 'Saia de pregas clássica na altura dos joelhos em azul marinho nobre.'
  },
  {
    id: 'saia_xadrez_grunge',
    name: 'Saia Plissada Xadrez Rubro',
    category: 'inferior',
    zIndex: 60,
    tags: ['Rock', 'Atitude'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 6,
    description: 'Padrão xadrez vermelho e preto com fivela lateral prateada.'
  },
  {
    id: 'calca_jeans_skinny',
    name: 'Jeans Escuro com Rasgos',
    category: 'inferior',
    zIndex: 60,
    tags: ['Rock', 'Casual'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 5,
    description: 'Calça jeans justa com puídos nos joelhos e lavagem estonada.'
  },
  {
    id: 'saia_midi_plissada',
    name: 'Saia Midi Musgo Suave',
    category: 'inferior',
    zIndex: 60,
    tags: ['Romântico', 'Elegante'],
    rarity: 'Raro',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 6,
    description: 'Comprimento midi fluído com tecido plissado que balança ao caminhar.'
  },
  {
    id: 'shorts_alfaiataria',
    name: 'Shorts Alfaiataria Tweed',
    category: 'inferior',
    zIndex: 60,
    tags: ['Clássico', 'Elegante'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 4,
    description: 'Corte refinado em tecido bege com cinto de fivela dourada.'
  },

  // ================= VESTIDOS =================
  {
    id: 'vestido_floral_primavera',
    name: 'Vestido Jardins de Maio',
    category: 'vestido',
    zIndex: 75,
    tags: ['Romântico', 'Poético'],
    rarity: 'Raro',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 8,
    description: 'Vestido rodado com estampa de botões de rosa silvestres e mangas sino.'
  },
  {
    id: 'vestido_gotico_lolita',
    name: 'Vestido Corset Midnight',
    category: 'vestido',
    zIndex: 75,
    tags: ['Rock', 'Especial'],
    rarity: 'Especial',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 8,
    description: 'Veludo preto com laços de cetim e acabamento refinado em renda escura.'
  },

  // ================= CASACOS / SOBRETUDOS =================
  {
    id: 'blazer_marinho_lotus',
    name: 'Blazer Oficial da Academia',
    category: 'casaco',
    zIndex: 80,
    tags: ['Clássico', 'Prestígio'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 6,
    description: 'Blazer estruturado com botões de latão dourado e o brasão da Lótus bordado.'
  },
  {
    id: 'jaqueta_couro_perfecto',
    name: 'Jaqueta Biker de Couro',
    category: 'casaco',
    zIndex: 80,
    tags: ['Rock', 'Rebelde'],
    rarity: 'Raro',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 7,
    description: 'Couro macio preto com zíperes assimétricos e tachas de metal nos ombros.'
  },
  {
    id: 'cardiga_nobre_marfim',
    name: 'Cardigã Nobre Acolhedor',
    category: 'casaco',
    zIndex: 80,
    tags: ['Romântico', 'Aconchegante'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 5,
    description: 'Cardigã longo aberto com bolsos fundos e toque aveludado de caxemira.'
  },

  // ================= CALÇADOS =================
  {
    id: 'mocassim_marrom_lotus',
    name: 'Mocassim de Couro Polido',
    category: 'calcado',
    zIndex: 50,
    tags: ['Clássico', 'Uniforme'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 4,
    description: 'Sapatos clássicos em tom mogno engraxados impecavelmente.'
  },
  {
    id: 'coturno_rock_militar',
    name: 'Coturno Plataforma Dark',
    category: 'calcado',
    zIndex: 50,
    tags: ['Rock', 'Impacto'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 5,
    description: 'Solado tratorado pesado, fivelas laterais e cadarços carmesim.'
  },
  {
    id: 'sapatilhas_veludo_vinho',
    name: 'Sapatilhas Mary Jane Borgonha',
    category: 'calcado',
    zIndex: 50,
    tags: ['Romântico', 'Vintage'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 5,
    description: 'Sapatilhas de veludo vinho com delicada tira no peito do pé.'
  },
  {
    id: 'tenis_urbano_branco',
    name: 'Sneakers Clean Canvas',
    category: 'calcado',
    zIndex: 50,
    tags: ['Casual', 'Conforto'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'todos',
    affinityBonus: 3,
    description: 'Tênis de lona branca versátil para o dia a dia.'
  },

  // ================= MEIAS =================
  {
    id: 'meia_3_4_branca',
    name: 'Meias 3/4 com Borda de Renda',
    category: 'meia',
    zIndex: 40,
    tags: ['Clássico', 'Doce'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 3,
    description: 'Meias brancas macias que chegam logo abaixo do joelho.'
  },
  {
    id: 'meia_arrastao_preta',
    name: 'Meia Arrastão Fina',
    category: 'meia',
    zIndex: 40,
    tags: ['Rock', 'Atitude'],
    rarity: 'Raro',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 4,
    description: 'Trama geométrica fina e moderna que dá destaque às pernas.'
  },
  {
    id: 'meia_calca_opaca',
    name: 'Meia-Calça Preta Térmica',
    category: 'meia',
    zIndex: 40,
    tags: ['Romântico', 'Elegante'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 3,
    description: 'Fio 80 aveludado e confortável para manhãs frias de outono.'
  },

  // ================= ACESSÓRIOS DE CABEÇA =================
  {
    id: 'boina_feltro_ocre',
    name: 'Boina Francesa Mostarda',
    category: 'chapeu',
    zIndex: 100,
    tags: ['Romântico', 'Artístico'],
    rarity: 'Raro',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 5,
    description: 'Feltro de lã pura inclinado com elegância artística boêmia.'
  },
  {
    id: 'tiara_veludo_preto',
    name: 'Tiara de Veludo com Pérolas',
    category: 'chapeu',
    zIndex: 100,
    tags: ['Clássico', 'Nobre'],
    rarity: 'Raro',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 5,
    description: 'Tiara almofadada com aplicação de pequenas pérolas discretas.'
  },
  {
    id: 'gorro_beanie_cinza',
    name: 'Gorro Beanie Streetwear',
    category: 'chapeu',
    zIndex: 100,
    tags: ['Rock', 'Urbano'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 4,
    description: 'Gorro de tricô canelado cinza escuro caído para trás.'
  },

  // ================= ÓCULOS =================
  {
    id: 'oculos_redondos_dourados',
    name: 'Óculos de Armação Fina Dourada',
    category: 'oculos',
    zIndex: 105,
    tags: ['Clássico', 'Intelectual'],
    rarity: 'Raro',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 5,
    description: 'Lentes redondas elegantes que transmitem um ar inteligente e compenetrado.'
  },
  {
    id: 'oculos_escuros_wayfarer',
    name: 'Óculos de Sol Retrô Escuros',
    category: 'oculos',
    zIndex: 105,
    tags: ['Rock', 'Misterioso'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 4,
    description: 'Armação preta fosca com lentes pretas polarizadas.'
  },

  // ================= COLAR / CACHECOL =================
  {
    id: 'cachecol_volumoso_mostarda',
    name: 'Cachecol Xadrez Envolvente',
    category: 'colar',
    zIndex: 110,
    tags: ['Romântico', 'Poético'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 5,
    description: 'Tecido felpudo e quente que cobre graciosamente parte do queixo.'
  },
  {
    id: 'gargantilha_choker_spikes',
    name: 'Choker com Clave de Sol',
    category: 'colar',
    zIndex: 110,
    tags: ['Rock', 'Música'],
    rarity: 'Raro',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 5,
    description: 'Tira de couro preta com pingente musical prateado artesanal.'
  },
  {
    id: 'cordao_perola_delicado',
    name: 'Gargantilha de Ouro com Pingente',
    category: 'colar',
    zIndex: 110,
    tags: ['Clássico', 'Sutileza'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 4,
    description: 'Corrente veneziana finíssima em ouro 18k com ponto de luz de zircônia.'
  },

  // ================= BOLSAS & MOCHILAS =================
  {
    id: 'mochila_couro_vintage',
    name: 'Mochila Estruturada Caramelo',
    category: 'bolsa',
    zIndex: 120,
    tags: ['Clássico', 'Acadêmico'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'lucas',
    affinityBonus: 4,
    description: 'Mochila de couro legítimo com fivelas de bronze, cabe livros e cadernos.'
  },
  {
    id: 'bolsa_lateral_lona',
    name: 'Bolsa Carteiro Rock com Botons',
    category: 'bolsa',
    zIndex: 120,
    tags: ['Rock', 'Personalidade'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'dante',
    affinityBonus: 5,
    description: 'Bolsa transversal de lona preta enfeitada com botons de guitarras e vinis.'
  },
  {
    id: 'bolsa_artesanato_linho',
    name: 'Bolsa Tote Bag Botânica',
    category: 'bolsa',
    zIndex: 120,
    tags: ['Romântico', 'Ecológico'],
    rarity: 'Básico',
    unlockedByDefault: true,
    affinityTarget: 'theo',
    affinityBonus: 5,
    description: 'Sacola ecológica de linho cru com ilustração de aquarelas feitas à mão.'
  }
];

export const OUTFIT_PRESETS: OutfitPreset[] = [
  {
    id: 'preset_uniforme_oficial',
    name: 'Uniforme Oficial da Academia Lótus',
    styleTag: 'Clássico',
    affinityTarget: 'lucas',
    description: 'O visual exigido pelo conselho escolar. Transmite disciplina, elegância e responsabilidade.',
    pieces: {
      hair_front: 'cabelo_bob_chanel',
      top: 'camisa_uniforme_lotus',
      bottom: 'saia_pregueada_azul',
      jacket: 'blazer_marinho_lotus',
      shoes: 'mocassim_marrom_lotus',
      socks: 'meia_3_4_branca',
      glasses: 'oculos_redondos_dourados',
      bag: 'mochila_couro_vintage',
      dress: undefined,
      hat: undefined,
      necklace: 'cordao_perola_delicado'
    }
  },
  {
    id: 'preset_rebelde_garagem',
    name: 'Estilo Rock & Atitude Noturna',
    styleTag: 'Rock',
    affinityTarget: 'dante',
    description: 'Jaqueta de couro, xadrez vermelho e coturno pesado. O som alto da guitarra em forma de roupa.',
    pieces: {
      hair_front: 'cabelo_rabo_cavalo',
      top: 'camiseta_rock_banda',
      bottom: 'saia_xadrez_grunge',
      jacket: 'jaqueta_couro_perfecto',
      shoes: 'coturno_rock_militar',
      socks: 'meia_arrastao_preta',
      necklace: 'gargantilha_choker_spikes',
      bag: 'bolsa_lateral_lona',
      dress: undefined,
      hat: 'gorro_beanie_cinza',
      glasses: undefined
    }
  },
  {
    id: 'preset_romance_outono',
    name: 'Poesia & Cores de Outono',
    styleTag: 'Romântico',
    affinityTarget: 'theo',
    description: 'Tons terrosos, lã tricotada macia e boina francesa. A sensação aconchegante de uma tarde no ateliê.',
    pieces: {
      hair_front: 'cabelo_franja_onda',
      top: 'sueter_trico_creme',
      bottom: 'saia_midi_plissada',
      jacket: 'cardiga_nobre_marfim',
      shoes: 'sapatilhas_veludo_vinho',
      socks: 'meia_calca_opaca',
      hat: 'boina_feltro_ocre',
      necklace: 'cachecol_volumoso_mostarda',
      bag: 'bolsa_artesanato_linho',
      dress: undefined,
      glasses: undefined
    }
  },
  {
    id: 'preset_vestido_jardim',
    name: 'Passeio nos Jardins Floridos',
    styleTag: 'Romântico',
    affinityTarget: 'theo',
    description: 'Vestido botânico leve e sapatilhas. Uma brisa suave que parece saída de uma pintura impressionista.',
    pieces: {
      hair_front: 'cabelo_franja_onda',
      dress: 'vestido_floral_primavera',
      top: undefined,
      bottom: undefined,
      jacket: undefined,
      shoes: 'sapatilhas_veludo_vinho',
      socks: undefined,
      hat: 'tiara_veludo_preto',
      necklace: 'cordao_perola_delicado',
      bag: 'bolsa_artesanato_linho',
      glasses: undefined
    }
  }
];
