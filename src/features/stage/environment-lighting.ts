/**
 * Motor de Iluminação Ambiental e Ambiência Dinâmica
 * Calcula em tempo real o tema, atmosfera, paleta de cores, gradientes e vinheta
 * combinando:
 * 1. O horário do dia (Manhã, Tarde, Entardecer, Noite)
 * 2. As características do cenário (Local aberto/ensolarado vs. Local escuro/fechado/penumbra)
 * 3. A lanterna do smartphone (ilumina cenários escuros em tempo real)
 */

export type TimeOfDay = 'manha' | 'tarde' | 'entardecer' | 'noite';

export interface LocationLightingProfile {
  name: string;
  isNaturallyDark: boolean; // Se o local é um interior fechado, porão, quarto fechado, etc.
  ambientDescription: string;
  baseLightLevel: number;   // 0.0 (breu total) a 1.0 (plena luz do dia)
  indoor: boolean;
}

// Perfis dos Cenários Conhecidos do Jogo
export const LOCATION_PROFILES: Record<string, LocationLightingProfile> = {
  'Quarto da Protagonista': {
    name: 'Quarto da Protagonista',
    isNaturallyDark: true, // Quarto com cortinas semi-fechadas no amanhecer ou noite
    ambientDescription: 'Interior acolhedor com cortinas fechadas e frestas de luz',
    baseLightLevel: 0.42,
    indoor: true
  },
  'Portões de Entrada': {
    name: 'Portões de Entrada',
    isNaturallyDark: false, // Exterior aberto ao céu
    ambientDescription: 'Exterior monumental com luz natural direta e brisa do campus',
    baseLightLevel: 0.95,
    indoor: false
  },
  'Sala do Grêmio': {
    name: 'Sala do Grêmio',
    isNaturallyDark: false, // Salão nobre com grandes janelas de vidro
    ambientDescription: 'Salão com arquitetura clássica e vitrais iluminados',
    baseLightLevel: 0.85,
    indoor: true
  },
  'Pátio Central': {
    name: 'Pátio Central',
    isNaturallyDark: false, // Jardins abertos com árvores de lótus
    ambientDescription: 'Pátio arborizado com sombras suaves de pétalas',
    baseLightLevel: 0.90,
    indoor: false
  }
};

export interface EnvironmentLighting {
  theme: 'light' | 'dark' | 'dusk' | 'night';
  isLightUI: boolean;               // Controla se textos/painéis usam modo claro ou escuro
  isDarkEnvironment: boolean;       // Se a cena geral está na penumbra
  bgGradient: string;               // Gradiente de fundo ao redor do palco
  sceneryFilter: string;            // CSS filter aplicado à pintura do fundo
  lightingOverlayStyle: string;     // Estilo da camada de luz sobre o cenário
  lightingOverlayClass: string;     // Classes Tailwind para transição
  vignetteOpacity: number;          // Densidade da vinheta nas bordas da tela
  particleColor: string;            // Cor das partículas atmosféricas flutuantes
  headerBgClass: string;            // Classe do cabeçalho superior
  headerBorderClass: string;        // Borda do cabeçalho
  headerTextClass: string;          // Texto do cabeçalho
}

/**
 * Resolve o perfil completo de iluminação para a cena atual
 */
export function resolveEnvironmentLighting(
  location: string,
  timeOfDay: TimeOfDay = 'manha',
  isFlashlightOn: boolean = false,
  manualThemeMode: 'auto' | 'light' | 'dark' = 'auto'
): EnvironmentLighting {
  const profile = LOCATION_PROFILES[location] || {
    name: location,
    isNaturallyDark: false,
    ambientDescription: 'Local do campus',
    baseLightLevel: 0.8,
    indoor: false
  };

  // 1. Determina se o ambiente é escuro
  const isNight = timeOfDay === 'noite';
  const isDusk = timeOfDay === 'entardecer';
  const isMorning = timeOfDay === 'manha';
  const isAfternoon = timeOfDay === 'tarde';

  // Um ambiente é considerado escuro se for noite OU se for um local fechado com cortinas fechadas sem sol pleno
  const isDarkScene = (isNight || (profile.isNaturallyDark && !isAfternoon)) && !isFlashlightOn;

  // 2. Determina o modo da interface (UI)
  let isLightUI = false;
  if (manualThemeMode === 'light') {
    isLightUI = true;
  } else if (manualThemeMode === 'dark') {
    isLightUI = false;
  } else {
    // Modo Automático Inteligente:
    // Só é claro se o ambiente NÃO for escuro e for dia (manhã/tarde em locais abertos ou iluminados)
    isLightUI = !isDarkScene && (isMorning || isAfternoon) && profile.baseLightLevel >= 0.75;
  }

  // 3. Filtro CSS do Cenário de acordo com horário e luminosidade do local
  let sceneryFilter = 'brightness(1) contrast(1)';
  let lightingOverlayStyle = '';
  let lightingOverlayClass = '';
  let bgGradient = '';
  let particleColor = 'rgba(254, 240, 138, 0.35)'; // Dourado claro padrão
  let vignetteOpacity = 0.45;

  if (isFlashlightOn) {
    // Efeito Lanterna: Iluminação de feixe central com bordas escuras
    sceneryFilter = 'brightness(0.85) contrast(1.15)';
    lightingOverlayStyle = 'background: radial-gradient(circle at 65% 55%, rgba(255, 252, 235, 0.45) 0%, rgba(255, 245, 210, 0.2) 35%, rgba(0, 5, 15, 0.75) 80%); mix-blend-mode: screen;';
    lightingOverlayClass = 'animate-pulse';
    bgGradient = 'radial-gradient(ellipse at 50% 40%, #161822 0%, #0d0f15 60%, #06070a 100%)';
    vignetteOpacity = 0.75;
    particleColor = 'rgba(255, 255, 255, 0.45)';
  } else if (isNight) {
    // Noite: Azul profundo / grafite com luz lunar prateada
    sceneryFilter = 'brightness(0.55) contrast(1.18) hue-rotate(210deg) saturate(0.85)';
    lightingOverlayStyle = 'background: radial-gradient(ellipse at 50% 20%, rgba(30, 58, 138, 0.35) 0%, rgba(15, 23, 42, 0.65) 60%, rgba(2, 6, 23, 0.9) 100%); mix-blend-mode: multiply;';
    bgGradient = 'radial-gradient(ellipse at 50% 10%, #0d1322 0%, #080c16 55%, #03050a 100%)';
    vignetteOpacity = 0.68;
    particleColor = 'rgba(147, 197, 253, 0.3)'; // Partículas lunares azuladas
  } else if (isDusk) {
    // Entardecer: Golden hour, tons alaranjados, âmbar e sombras longas dramáticas
    sceneryFilter = 'brightness(0.92) contrast(1.12) sepia(0.25) saturate(1.25)';
    lightingOverlayStyle = 'background: linear-gradient(135deg, rgba(249, 115, 22, 0.22) 0%, rgba(217, 70, 239, 0.15) 50%, rgba(67, 20, 7, 0.45) 100%); mix-blend-mode: soft-light;';
    bgGradient = 'radial-gradient(ellipse at 50% 10%, #2b1712 0%, #1b0e0c 55%, #0f0706 100%)';
    vignetteOpacity = 0.52;
    particleColor = 'rgba(251, 146, 60, 0.4)'; // Pétalas âmbar douradas
  } else if (profile.isNaturallyDark && isMorning) {
    // Quarto / Local fechado de manhã: Quarto intimista, frestas de luz morna nas cortinas
    sceneryFilter = 'brightness(0.78) contrast(1.1) sepia(0.12)';
    lightingOverlayStyle = 'background: linear-gradient(110deg, rgba(254, 240, 138, 0.25) 0%, rgba(180, 83, 9, 0.15) 40%, rgba(15, 12, 10, 0.5) 100%); mix-blend-mode: hard-light;';
    bgGradient = 'radial-gradient(ellipse at 50% 10%, #221b16 0%, #17120e 55%, #0d0a08 100%)';
    vignetteOpacity = 0.62;
    particleColor = 'rgba(253, 230, 138, 0.45)'; // Poeira dourada de fresta de luz
  } else {
    // Dia Pleno / Manhã Externa Ensolarada (Portões, Sala do Grêmio, Pátio)
    sceneryFilter = 'brightness(1.02) contrast(1.02) saturate(1.05)';
    lightingOverlayStyle = 'background: linear-gradient(180deg, rgba(255, 251, 235, 0.18) 0%, transparent 60%, rgba(120, 53, 15, 0.12) 100%); mix-blend-mode: soft-light;';
    bgGradient = isLightUI 
      ? 'radial-gradient(ellipse at 50% 10%, #eae2d0 0%, #ded2bd 55%, #cfbfab 100%)'
      : 'radial-gradient(ellipse at 50% 10%, #181a24 0%, #10121a 55%, #090a0f 100%)';
    vignetteOpacity = isLightUI ? 0.32 : 0.5;
    particleColor = isLightUI ? 'rgba(217, 119, 6, 0.3)' : 'rgba(254, 240, 138, 0.35)';
  }

  // 4. Classes do cabeçalho superior adaptativo
  const headerBgClass = isLightUI 
    ? 'bg-[#ece4d4]/90 border-[#cfc2ab] text-[#2c241e] shadow-sm' 
    : 'bg-[#0b0c10]/85 border-white/6 text-zinc-200 shadow-xl';

  const headerBorderClass = isLightUI ? 'border-[#cfc2ab]' : 'border-white/8';
  const headerTextClass = isLightUI ? 'text-[#2a221b]' : 'text-zinc-100';

  const themeKey: 'light' | 'dark' | 'dusk' | 'night' = isLightUI 
    ? 'light' 
    : isNight 
      ? 'night' 
      : isDusk 
        ? 'dusk' 
        : 'dark';

  return {
    theme: themeKey,
    isLightUI,
    isDarkEnvironment: isDarkScene,
    bgGradient,
    sceneryFilter,
    lightingOverlayStyle,
    lightingOverlayClass,
    vignetteOpacity,
    particleColor,
    headerBgClass,
    headerBorderClass,
    headerTextClass
  };
}
