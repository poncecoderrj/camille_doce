export interface CharacterLayers {
  hairBack?: string;    // Z-Index: 05
  body: string;         // Z-Index: 10
  shoes?: string;       // Z-Index: 20
  bottom?: string;      // Z-Index: 30
  top?: string;         // Z-Index: 40
  dress?: string;       // Z-Index: 50
  jacket?: string;      // Z-Index: 60
  necklace?: string;    // Z-Index: 70
  face?: string;        // Z-Index: 90
  blush?: boolean | string; // Z-Index: 92
  glasses?: string;     // Z-Index: 100
  hairFront?: string;   // Z-Index: 110
}

export type StandardExpression = 
  | 'neutro'
  | 'feliz'
  | 'sorriso'
  | 'smirk'
  | 'provocador'
  | 'irritado'
  | 'surpreso'
  | 'triste'
  | 'timido'
  | 'corado'
  | 'pensativo'
  | 'afetuoso';

export interface CharacterFacialMetrics {
  eyeY: number;
  eyeLeftX: number;
  eyeRightX: number;
  eyeWidth: number;
  eyeHeight: number;
  mouthY: number;
  mouthX: number;
  mouthWidth: number;
  skinTone: string;
}

export const CHARACTER_FACIAL_METRICS: Record<string, CharacterFacialMetrics> = {
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
