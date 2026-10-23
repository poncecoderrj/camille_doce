export type CharacterId = 'dante' | 'lucas' | 'theo' | 'iris' | 'protagonista';

export type StandardExpression = 
  | 'neutro'
  | 'sorriso'
  | 'feliz'
  | 'corado'
  | 'smirk'
  | 'surpreso'
  | 'irritado'
  | 'melancolico'
  | 'sonhador'
  | 'timido';

export interface FacialMetrics {
  eyeY: number;        // Porcentagem Y do centro dos olhos na tela 768x1344
  eyeLeftX: number;    // Porcentagem X do olho esquerdo
  eyeRightX: number;   // Porcentagem X do olho direito
  eyeWidth: number;
  eyeHeight: number;
  mouthY: number;      // Porcentagem Y da boca
  mouthX: number;      // Porcentagem X da boca
  mouthWidth: number;
  skinTone: string;
}

export interface CharacterManifest {
  id: CharacterId;
  name: string;
  title: string;
  accentColor: string;
  baseBody: string;
  expressions: Record<string, string>;
  metrics: FacialMetrics;
}

export const CHARACTER_FACIAL_METRICS: Record<string, FacialMetrics> = {
  iris: {
    eyeY: 36.7,
    eyeLeftX: 45.5,
    eyeRightX: 54.1,
    eyeWidth: 4.8,
    eyeHeight: 2.6,
    mouthY: 44.6,
    mouthX: 50.2,
    mouthWidth: 3.8,
    skinTone: '#fee5d5'
  },
  protagonista: {
    eyeY: 36.7,
    eyeLeftX: 45.5,
    eyeRightX: 54.1,
    eyeWidth: 4.8,
    eyeHeight: 2.6,
    mouthY: 44.6,
    mouthX: 50.2,
    mouthWidth: 3.8,
    skinTone: '#fee5d5'
  },
  dante: {
    eyeY: 38.3,
    eyeLeftX: 37.8,
    eyeRightX: 55.0,
    eyeWidth: 5.6,
    eyeHeight: 2.8,
    mouthY: 41.5,
    mouthX: 46.2,
    mouthWidth: 4.2,
    skinTone: '#fee0d2'
  },
  lucas: {
    eyeY: 38.1,
    eyeLeftX: 38.3,
    eyeRightX: 58.2,
    eyeWidth: 5.8,
    eyeHeight: 2.8,
    mouthY: 42.0,
    mouthX: 48.1,
    mouthWidth: 4.0,
    skinTone: '#faebd7'
  },
  theo: {
    eyeY: 37.2,
    eyeLeftX: 38.7,
    eyeRightX: 62.1,
    eyeWidth: 5.8,
    eyeHeight: 2.8,
    mouthY: 43.2,
    mouthX: 50.7,
    mouthWidth: 4.0,
    skinTone: '#fdf2e9'
  }
};
