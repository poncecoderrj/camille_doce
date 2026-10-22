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

export interface CharacterManifest {
  id: string;
  name: string;
  title: string;
  accentColor: string;
  baseBody: string;
  expressions: Record<string, string>;
  hairs: Record<string, { front?: string; back?: string }>;
  outfits: Record<string, Partial<CharacterLayers>>;
  accessories?: Record<string, string>;
}
