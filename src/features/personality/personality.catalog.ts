import type { ZodiacSign, PersonalityTrait, Aspiration, ZodiacId } from './personality.schema';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    name: 'Áries',
    symbol: '♈',
    glyph: 'Carneiro',
    element: 'Fogo',
    dates: '21 Março – 19 Abril',
    essence: 'Impulsiva, leal e com iniciativa destemida. Não aceita ser deixada para trás.',
    synastry: {
      dante: 'Chama com pólvora! Dante adora a energia direta e o espírito que não pede permissão.',
      lucas: 'Conflito de autoridades. Lucas tenta impor regras, mas fica secretamente atraído pela ousadia.',
      theo: 'Proteção afetuosa. Você puxa Theo para fora de sua concha melancólica com entusiasmo contagiante.'
    }
  },
  {
    id: 'touro',
    name: 'Touro',
    symbol: '♉',
    glyph: 'Touro',
    element: 'Terra',
    dates: '20 Abril – 20 Maio',
    essence: 'Determinada, sensorial, com apreço profundo por estética, lealdade e estabilidade.',
    synastry: {
      dante: 'Teimosia mútua. Quando discordam, faíscas voam; mas o respeito mútuo é imbatível.',
      lucas: 'Conexão perfeita de valores. Ambos prezam por respeito, tradição e dedicação incansável.',
      theo: 'Sensibilidade artística compartilhada. Apreciam tardes lentas, chá quente e silêncios confortáveis.'
    }
  },
  {
    id: 'gemeos',
    name: 'Gêmeos',
    symbol: '♊',
    glyph: 'Gêmeos',
    element: 'Ar',
    dates: '21 Maio – 20 Junho',
    essence: 'Curiosa, comunicativa, de raciocínio rápido e mente que nunca desliga.',
    synastry: {
      dante: 'Diálogos cortantes e dinâmicos. Vocês passam horas trocando provocações e piadas sarcásticas.',
      lucas: 'Desafio intelectual constante. Lucas se encanta com a capacidade de debater qualquer assunto com elegância.',
      theo: 'Troca poética fascinante. Você traz ideias e palavras; Theo traz tintas e sentimentos.'
    }
  },
  {
    id: 'cancer',
    name: 'Câncer',
    symbol: '♋',
    glyph: 'Caranguejo',
    element: 'Água',
    dates: '21 Junho – 22 Julho',
    essence: 'Intuitiva, protetora e com um coração empático que guarda lembranças para sempre.',
    synastry: {
      dante: 'O porto seguro dele. Dante baixa a guarda de guitarrista durão apenas quando está a sós com você.',
      lucas: 'Cuidado mútuo e carinho discreto. Você amolece a rigidez burocrática dos dias de conselho.',
      theo: 'Almas irmãs na água. Sintonia emocional instantânea sem que nenhuma palavra precise ser dita.'
    }
  },
  {
    id: 'leao',
    name: 'Leão',
    symbol: '♌',
    glyph: 'Leão',
    element: 'Fogo',
    dates: '23 Julho – 22 Agosto',
    essence: 'Magnética, orgulhosa e nobre. Quando entra em uma sala, sua presença é impossível de ignorar.',
    synastry: {
      dante: 'Dupla lendária nos palcos e corredores. Dois holofotes que se atraem com energia eletrizante.',
      lucas: 'Um par de realeza. Lucas admira sua liderança natural e vê em você uma parceira de igual calibre.',
      theo: 'A musa inspiradora. Theo passa noites em claro pintando o brilho dourado do seu olhar.'
    }
  },
  {
    id: 'virgem',
    name: 'Virgem',
    symbol: '♍',
    glyph: 'Virgem',
    element: 'Terra',
    dates: '23 Agosto – 22 Setembro',
    essence: 'Perfeccionista, atenta aos menores detalhes e dona de uma inteligência afiada e prática.',
    synastry: {
      dante: 'Você o puxa para a realidade. Corrige as cordas desafinadas da vida desregrada dele.',
      lucas: 'Harmonia absoluta de método. Ambos funcionam com a precisão de um relógio da torre.',
      theo: 'Você cuida das dores que Theo não expressa, notando quando as mãos dele tremem ao pintar.'
    }
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    glyph: 'Balança',
    element: 'Ar',
    dates: '23 Setembro – 22 Outubro',
    essence: 'Elegante, diplomata, amante da harmonia e guiada por um senso inato de justiça e romance.',
    synastry: {
      dante: 'O charme que desconcentra o rebelde. Dante se pega tímido tentando impressionar sua graça.',
      lucas: 'A parceira diplomática perfeita. Juntos equilibram a honra da Lótus com humanidade.',
      theo: 'O arquétipo da beleza lírica. Para Theo, sua companhia é a definição viva de harmonia clássica.'
    }
  },
  {
    id: 'escorpiao',
    name: 'Escorpião',
    symbol: '♏',
    glyph: 'Escorpião',
    element: 'Água',
    dates: '23 Outubro – 21 Novembro',
    essence: 'Intensa, magnética, misteriosa e leal até a última consequência. Percebe segredos ocultos.',
    synastry: {
      dante: 'Fascínio elétrico perigoso. Olhares nos corredores que dizem mais que mil discursos.',
      lucas: 'Você enxerga através da armadura dele. Lucas descobre que com você não precisa fingir ser inabalável.',
      theo: 'Compreensão de sombras. Vocês dois entendem a beleza melancólica que existe na dor.'
    }
  },
  {
    id: 'sagitario',
    name: 'Sagitário',
    symbol: '♐',
    glyph: 'Arqueiro',
    element: 'Fogo',
    dates: '22 Novembro – 21 Dezembro',
    essence: 'Aventureira, sincera, otimista e apaixonada por horizontes amplos e quebra de regras.',
    synastry: {
      dante: 'Companheira de fuga perfeita. Fugir para a praia ou para um ensaio clandestino de madrugada.',
      lucas: 'Tira o presidente da zona de conforto. Você faz Lucas rir no meio de uma reunião solene.',
      theo: 'Abre janelas de esperança. Theo se sente livre de medos quando escuta suas risadas sinceras.'
    }
  },
  {
    id: 'capricornio',
    name: 'Capricórnio',
    symbol: '♑',
    glyph: 'Cabra',
    element: 'Terra',
    dates: '22 Dezembro – 19 Janeiro',
    essence: 'Resiliente, focada em legado, madura desde cedo e com ambição inabalável de longo prazo.',
    synastry: {
      dante: 'Contraste clássico entre disciplina e caos. Dante adora testar até onde vai sua seriedade.',
      lucas: 'Aliança inquebrável. Dois pilares que constroem juntos o futuro com honra e respeito mútuo.',
      theo: 'Estrutura e suporte. Você oferece o chão sólido que Theo precisa para continuar criando.'
    }
  },
  {
    id: 'aquario',
    name: 'Aquário',
    symbol: '♒',
    glyph: 'Aguadeiro',
    element: 'Ar',
    dates: '20 Janeiro – 18 Fevereiro',
    essence: 'Visionária, original, anti-convencional e com ideias que estão dez passos à frente do seu tempo.',
    synastry: {
      dante: 'Cúmplices de revolução. Ambos rejeitam o molde engessado que a sociedade impõe.',
      lucas: 'Você desafia as regras antigas dele com argumentos inovadores que Lucas não consegue refutar.',
      theo: 'Inspiração surrealista. Vocês conversam sobre o cosmos, sonhos lúcidos e o futuro da arte.'
    }
  },
  {
    id: 'peixes',
    name: 'Peixes',
    symbol: '♓',
    glyph: 'Peixes',
    element: 'Água',
    dates: '19 Fevereiro – 20 Março',
    essence: 'Empática, sonhadora, com sensibilidade quase sobrenatural para ler atmosferas e corações.',
    synastry: {
      dante: 'A suavidade que doma a raiva dele. Dante compõe melodias acústicas secretas para você.',
      lucas: 'Você traz ternura para os dias cinzentos dele, lembrando Lucas de que ele também pode ser vulnerável.',
      theo: 'Conexão cósmica e poética. Duas almas sensíveis que pareciam se conhecer antes mesmo de nascer.'
    }
  }
];

export const PERSONALITY_TRAITS: PersonalityTrait[] = [
  // --- 1. EMOCIONAL ---
  {
    id: 'romantica_incuravel',
    name: 'Romântica Incurável',
    category: 'Emocional',
    description: 'Acredita no destino, no amor verdadeiro e em conexões profundas que sobrevivem aos anos.',
    dialogueImpact: 'Desbloqueia diálogos sinceros de confissão e nota nuances poéticas nas ações dos pretendentes.',
    iconName: 'Heart'
  },
  {
    id: 'rebelde_indomavel',
    name: 'Rebelde & Autêntica',
    category: 'Emocional',
    description: 'Não teme confrontar regras hipócritas e preserva sua verdade a qualquer custo.',
    dialogueImpact: 'Respostas ousadas que ganham o respeito de Dante e desarmam a postura formal de Lucas.',
    iconName: 'Flame'
  },
  {
    id: 'sensivel_empatica',
    name: 'Sensível & Empática',
    category: 'Emocional',
    description: 'Sente a energia dos ambientes e o estado emocional das pessoas ao redor com precisão cirúrgica.',
    dialogueImpact: 'Facilidade para consolar e perceber quando Theo ou Lucas estão guardando segredos dolorosos.',
    iconName: 'Sparkles'
  },
  {
    id: 'serena_reflexiva',
    name: 'Serena & Reservada',
    category: 'Emocional',
    description: 'Mente tranquila como águas profundas. Pensa com calma e não se desespera em momentos de crise.',
    dialogueImpact: 'Mantém a compostura durante tensões escolares e traz clareza para decisões difíceis.',
    iconName: 'Moon'
  },

  // --- 2. INTELECTUAL ---
  {
    id: 'genio_metodica',
    name: 'Mente Estratégica',
    category: 'Intelectual',
    description: 'Calcula variáveis, antecipa consequências e traça planos de ação infalíveis.',
    dialogueImpact: 'Gera soluções brilhantes para debates no Grêmio e ganha a admiração intelectual de Lucas.',
    iconName: 'Brain'
  },
  {
    id: 'criativa_sonhadora',
    name: 'Alma Artística',
    category: 'Intelectual',
    description: 'Vê metáforas no cotidiano e transforma sentimentos em palavras, cores e melodias.',
    dialogueImpact: 'Entendimento profundo do processo criativo de Theo e das composições de garagem de Dante.',
    iconName: 'Palette'
  },
  {
    id: 'curiosa_insaciavel',
    name: 'Rato de Biblioteca',
    category: 'Intelectual',
    description: 'Devora livros, documentos antigos e não descansa até desvendar os mistérios da Lótus.',
    dialogueImpact: 'Descobre pistas nos arquivos históricos da escola e acessa livros raros da biblioteca.',
    iconName: 'BookOpen'
  },
  {
    id: 'intuitiva_astuta',
    name: 'Intuitiva & Observadora',
    category: 'Intelectual',
    description: 'Capta microexpressões e contradições. É quase impossível mentir para você.',
    dialogueImpact: 'Detecta segredos antes de serem revelados e formula deduções aguçadas na história.',
    iconName: 'Eye'
  },

  // --- 3. SOCIAL ---
  {
    id: 'carismatica_lider',
    name: 'Carismática Natural',
    category: 'Social',
    description: 'Irradia confiança acolhedora e consegue unir grupos divergentes com facilidade.',
    dialogueImpact: 'Aumenta o ganho de afinidade geral e abre caminhos para liderar projetos no campus.',
    iconName: 'Sun'
  },
  {
    id: 'sarcastica_ironica',
    name: 'Irônica & Provocadora',
    category: 'Social',
    description: 'Senso de humor sagaz e respostas afiadas que deixam qualquer um desconcertado.',
    dialogueImpact: 'Diálogos memoráveis cheios de química com Dante e brincadeiras que quebram o gelo.',
    iconName: 'Zap'
  },
  {
    id: 'doce_protetora',
    name: 'Protetora Leal',
    category: 'Social',
    description: 'Lealdade incondicional para com quem ama. Ninguém fere seus amigos impunemente.',
    dialogueImpact: 'Gera laços de confiança inquebrantáveis e defende os pretendentes em momentos cruciais.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'timida_misteriosa',
    name: 'Tímida & Magnética',
    category: 'Social',
    description: 'Poucas palavras, mas presença enigmática que desperta curiosidade e desejo de aproximação.',
    dialogueImpact: 'Cria momentos íntimos e silenciosos de rara profundidade emocional.',
    iconName: 'Feather'
  },

  // --- 4. ESTILO DE VIDA ---
  {
    id: 'ambiciosa_incansavel',
    name: 'Ambiciosa Focada',
    category: 'Estilo de Vida',
    description: 'Obstinada com o sucesso, almeja deixar sua marca na história da Academia Lótus.',
    dialogueImpact: 'Busca excelência em notas, cargos de liderança e atrai pessoas com visão de futuro.',
    iconName: 'Trophy'
  },
  {
    id: 'espirito_livre',
    name: 'Espírito Livre',
    category: 'Estilo de Vida',
    description: 'Ama a espontaneidade, aventuras imprevistas e viver intensamente o presente.',
    dialogueImpact: 'Propensa a aceitar convites inesperados de Dante para passeios noturnos inesquecíveis.',
    iconName: 'Compass'
  },
  {
    id: 'perfeccionista',
    name: 'Perfeccionista Dedicada',
    category: 'Estilo de Vida',
    description: 'Exige o máximo de si em tudo o que faz, desde trabalhos escolares até apresentações.',
    dialogueImpact: 'Garante resultados impecáveis e ganha o respeito incondicional dos professores e de Lucas.',
    iconName: 'Target'
  },
  {
    id: 'amante_natureza',
    name: 'Conexão Botânica',
    category: 'Estilo de Vida',
    description: 'Encontra paz em jardins, estufas floridas e no aroma suave das manhãs de orvalho.',
    dialogueImpact: 'Momentos únicos de cumplicidade na estufa da escola e conversas tranquilas com Theo.',
    iconName: 'Leaf'
  }
];

export const ASPIRATIONS: Aspiration[] = [
  {
    id: 'romancista',
    title: 'Romancista & Poeta Consagrada',
    tagline: 'Eternizar emoções e segredos em obras literárias',
    decadeGoal: 'Publicar um livro best-seller que capture os 10 anos vividos na Academia Lótus.',
    description: 'Você deseja transformar suas memórias, paixões e perdas em literatura imortal. Enxerga o mundo através de metáforas e anota diálogos em seu caderno.',
    affinityBoy: 'theo',
    iconName: 'BookOpen'
  },
  {
    id: 'estrela_rock',
    title: 'Ícone Musical & Produção Independente',
    tagline: 'Viver de acordes viscerais e liberdade nos palcos',
    decadeGoal: 'Gravar álbuns aclamados, tocar em grandes festivais e fundar uma gravadora alternativa.',
    description: 'Seu coração bate no ritmo de guitarras elétricas e palhetas desgastadas. Você quer fazer sua voz ecoar para além dos muros da escola.',
    affinityBoy: 'dante',
    iconName: 'Music'
  },
  {
    id: 'lider_diplomata',
    title: 'Líder Diplomata & Magistratura',
    tagline: 'Moldar instituições e liderar com ética e honra',
    decadeGoal: 'Conquistar a presidência estudantil e formar-se com honras em Direito e Relações Internacionais.',
    description: 'Você possui a fibra moral necessária para guiar pessoas e enfrentar injustiças. Busca a excelência como meio de proteger quem precisa.',
    affinityBoy: 'lucas',
    iconName: 'Crown'
  },
  {
    id: 'arquiteta_sonhos',
    title: 'Arquiteta & Designer de Patrimônio',
    tagline: 'Erguer espaços vivos e preservar memórias históricas',
    decadeGoal: 'Restaurar edifícios seculares do campus e projetar centros culturais sustentáveis.',
    description: 'Você vê poesia nas linhas, colunas e vitrais clássicos. Seu sonho é dar vida a lugares onde as pessoas se apaixonem e criem raízes.',
    affinityBoy: 'geral',
    iconName: 'Compass'
  },
  {
    id: 'pesquisadora_botanica',
    title: 'Cientista & Botânica de Preservação',
    tagline: 'Descobrir segredos naturais e curar o ecossistema',
    decadeGoal: 'Descobrir novas espécies na reserva da Lótus e criar jardins botânicos terapêuticos.',
    description: 'Fascinada pelas propriedades das plantas, flores raras e estufas da escola. Deseja curar e cultivar beleza em um mundo acelerado.',
    affinityBoy: 'theo',
    iconName: 'Leaf'
  },
  {
    id: 'empreendedora_tech',
    title: 'Visionária de Inovação & Negócios',
    tagline: 'Criar soluções que transformem a sociedade',
    decadeGoal: 'Fundar uma startup inovadora de impacto global antes dos 25 anos.',
    description: 'Você possui instinto visionário e mente afiada para oportunidades. Quer independência financeira e poder para ditar seus próprios termos.',
    affinityBoy: 'geral',
    iconName: 'Zap'
  }
];
