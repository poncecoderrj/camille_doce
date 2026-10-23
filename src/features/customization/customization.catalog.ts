import type { OutfitOption, OutfitId } from './customization.schema';

export const OUTFIT_OPTIONS: OutfitOption[] = [
  {
    id: 'uniforme_lotus',
    name: 'Uniforme Oficial da Lótus',
    styleTag: 'Clássico',
    affinityTarget: 'lucas',
    affinityBonus: 10,
    description: 'Blazer azul-marinho alinhado com bordado dourado e saia plissada tradicional da Academia Lótus. Lucas aprova a elegância e a disciplina.',
    image: '/assets/characters/iris/base/uniforme_lotus.png'
  },
  {
    id: 'look_rock',
    name: 'Estilo Rock & Jaqueta Rebelde',
    styleTag: 'Rock',
    affinityTarget: 'dante',
    affinityBonus: 15,
    description: 'Jaqueta de couro preta com zíperes prateados e atitude underground. Dante fica instantaneamente fascinado pela personalidade marcante.',
    image: '/assets/characters/iris/base/look_rock.png'
  },
  {
    id: 'look_romantico',
    name: 'Vestido Cottagecore Poético',
    styleTag: 'Romântico',
    affinityTarget: 'theo',
    affinityBonus: 15,
    description: 'Vestido fluido em tons suaves com caimento poético. Theo diz que você parece uma pintura que acabou de ganhar vida.',
    image: '/assets/characters/iris/base/look_romantico.png'
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
    lucas: 'Jaqueta de couro no campus viola normas do conselho... mas hoje vou fingir que não vi o regulamento.',
    theo: 'O contraste entre a firmeza do couro escuro e a suavidade do seu olhar tem uma força lírica impressionante.'
  },
  look_romantico: {
    dante: 'Flores e vestido delicado? É bem diferente do som pesado que eu toco, mas admito que você ficou linda.',
    lucas: 'Um traje refinado e gracioso. Traz uma harmonia suave e acolhedora para o ambiente da escola.',
    theo: 'Parece uma aquarela que ganhou vida própria... Eu poderia passar a tarde inteira rascunhando esse movimento no meu caderno.'
  }
};

export function resolveProtagonistLookImage(outfitId: OutfitId | string): string {
  switch (outfitId) {
    case 'look_rock':
      return '/assets/characters/iris/base/look_rock.png';
    case 'look_romantico':
      return '/assets/characters/iris/base/look_romantico.png';
    case 'uniforme_lotus':
    default:
      return '/assets/characters/iris/base/uniforme_lotus.png';
  }
}
