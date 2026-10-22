<script lang="ts">
  import type { BoyCharacterProps } from './characters.schema';

  let { 
    expression = 'provocador', 
    timeOfDay = 'manha',
    outfit = 'rock_padrao',
    class: customClass = '' 
  }: BoyCharacterProps = $props();

  // Mapeamento de expressões
  let isSmirk = $derived(expression === 'smirk' || expression === 'provocador');
  let isBlush = $derived(expression === 'blush' || expression === 'envergonhado' || expression === 'timido');
  let isAngry = $derived(expression === 'irritado' || expression === 'bravo');
  let isSurprised = $derived(expression === 'surpreso');
  let isSmile = $derived(expression === 'sorriso' || expression === 'afetuoso');
</script>

<div class="relative w-full h-full flex items-center justify-center select-none {customClass}">
  <svg 
    viewBox="0 0 420 680" 
    class="w-full h-full max-h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-visible"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <!-- Gradiente de Pele Dante (Bege Bronze Saudável) -->
      <linearGradient id="danteSkin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5d6ba" />
        <stop offset="60%" stop-color="#ebd0a9" />
        <stop offset="100%" stop-color="#d4af83" />
      </linearGradient>

      <!-- Gradiente de Cabelo Dante (Preto Ônix com mechas azul-grafite) -->
      <linearGradient id="danteHair" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#383842" />
        <stop offset="40%" stop-color="#1f1f26" />
        <stop offset="100%" stop-color="#0e0e12" />
      </linearGradient>

      <!-- Gradiente de Couro Preto da Jaqueta -->
      <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2d2d35" />
        <stop offset="45%" stop-color="#18181f" />
        <stop offset="100%" stop-color="#0d0d12" />
      </linearGradient>

      <!-- Sombra de Contorno -->
      <filter id="danteShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#050508" flood-opacity="0.35" />
      </filter>
    </defs>

    <!-- ================= 1. CABELO TRÁS (Z-INDEX 10) ================= -->
    <g id="dante-hair-back">
      <path 
        d="M 125 110 C 95 150 90 220 115 270 C 130 250 140 220 145 180 Z" 
        fill="url(#danteHair)" 
      />
      <path 
        d="M 285 110 C 315 150 320 220 295 270 C 280 250 270 220 265 180 Z" 
        fill="url(#danteHair)" 
      />
      <path 
        d="M 130 90 C 110 140 120 230 150 280 C 210 295 260 290 280 250 C 295 200 290 130 280 90 Z" 
        fill="#121217" 
      />
    </g>

    <!-- ================= 2. CORPO E ANATOMIA MASCULINA (Z-INDEX 20) ================= -->
    <g id="dante-body">
      <!-- Ombros Largos e Tórax Atlético -->
      <path 
        d="M 100 240 C 130 200 160 190 205 190 C 250 190 280 200 310 240 L 325 380 C 315 450 310 550 305 670 L 105 670 C 100 550 95 450 85 380 Z" 
        fill="url(#danteSkin)" 
      />

      <!-- Pescoço Forte e Clavículas Masculinas -->
      <path d="M 180 145 L 176 210 C 195 218 215 218 234 210 L 230 145 Z" fill="url(#danteSkin)" />
      <!-- Sombra sob o queixo -->
      <path d="M 180 145 C 195 160 215 160 230 145 L 232 165 C 215 178 195 178 178 165 Z" fill="#c49b6c" opacity="0.75" />
      
      <!-- Linhas de Clavícula -->
      <path d="M 155 215 Q 185 225 200 218" stroke="#ba8e5e" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6" />
      <path d="M 255 215 Q 225 225 210 218" stroke="#ba8e5e" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6" />

      <!-- Cabeça / Mandíbula Angulada de Anime -->
      <path 
        d="M 145 110 C 142 65 168 40 205 40 C 242 40 268 65 265 110 C 265 138 250 162 205 175 C 160 162 145 138 145 110 Z" 
        fill="url(#danteSkin)" 
        filter="url(#danteShadow)"
      />

      <!-- Orelhas com Piercing -->
      <ellipse cx="143" cy="118" rx="8" ry="14" fill="url(#danteSkin)" />
      <ellipse cx="267" cy="118" rx="8" ry="14" fill="url(#danteSkin)" />
      <!-- Piercing de Argola Prateada na Orelha Esquerda -->
      <ellipse cx="138" cy="126" rx="3.5" ry="5" fill="none" stroke="#e4e4e7" stroke-width="1.8" />
      <circle cx="138" cy="126" r="1.5" fill="#ffffff" />
    </g>

    <!-- ================= 3. ROSTO E EXPRESSÕES FACIAIS VIVAS (Z-INDEX 30) ================= -->
    <g id="dante-face">
      <!-- Blush / Rubor nas Bochechas (Quando envergonhado/provocado pela protagonista) -->
      {#if isBlush}
        <ellipse cx="168" cy="125" rx="14" ry="7" fill="#e11d48" opacity="0.35" />
        <ellipse cx="242" cy="125" rx="14" ry="7" fill="#e11d48" opacity="0.35" />
        <!-- Gotinha de constrangimento cômica anime -->
        <path d="M 262 95 Q 266 102 262 108 Q 258 102 262 95 Z" fill="#38bdf8" opacity="0.8" />
      {/if}

      <!-- Sobrancelhas Marcantes (Mudam com a Expressão) -->
      {#if isSmirk}
        <!-- Sobrancelha direita erguida, esquerda arqueada provocadora -->
        <path d="M 160 102 Q 178 97 192 103" stroke="#18181b" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <path d="M 250 94 Q 232 93 218 101" stroke="#18181b" stroke-width="3.5" stroke-linecap="round" fill="none" />
      {:else if isAngry}
        <!-- Sobrancelhas franzidas para baixo -->
        <path d="M 162 106 L 194 100" stroke="#18181b" stroke-width="3.8" stroke-linecap="round" />
        <path d="M 248 106 L 216 100" stroke="#18181b" stroke-width="3.8" stroke-linecap="round" />
      {:else if isSurprised}
        <path d="M 160 96 Q 178 90 194 96" stroke="#18181b" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M 250 96 Q 232 90 216 96" stroke="#18181b" stroke-width="3" stroke-linecap="round" fill="none" />
      {:else}
        <!-- Neutro confiante -->
        <path d="M 160 101 Q 178 98 194 102" stroke="#18181b" stroke-width="3.2" stroke-linecap="round" fill="none" />
        <path d="M 250 101 Q 232 98 216 102" stroke="#18181b" stroke-width="3.2" stroke-linecap="round" fill="none" />
      {/if}

      <!-- Olho Esquerdo (Intenso, Castanho Escuro com Brilho Rubro) -->
      <g id="eye-left">
        <ellipse cx="176" cy="114" rx="12" ry={isAngry || isSmirk ? 7.5 : 9} fill="#ffffff" />
        <!-- Íris Escura com Toque de Vinho -->
        <ellipse cx="177" cy="114" rx="7.5" ry="8" fill="#2d1316" />
        <circle cx="177" cy="114" r="5" fill="#140709" />
        <!-- Brilho Anime Catchlight -->
        <circle cx="174" cy="111" r="2.5" fill="#ffffff" />
        <circle cx="179" cy="116" r="1.2" fill="#ffffff" opacity="0.8" />
        <!-- Pálpebra / Delineado Superior Marcante -->
        <path d="M 162 110 Q 176 105 190 111" stroke="#121217" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>

      <!-- Olho Direito -->
      <g id="eye-right">
        <ellipse cx="234" cy="114" rx="12" ry={isAngry ? 7.5 : isSmirk ? 8.5 : 9} fill="#ffffff" />
        <ellipse cx="233" cy="114" rx="7.5" ry="8" fill="#2d1316" />
        <circle cx="233" cy="114" r="5" fill="#140709" />
        <circle cx="230" cy="111" r="2.5" fill="#ffffff" />
        <circle cx="235" cy="116" r="1.2" fill="#ffffff" opacity="0.8" />
        <path d="M 248 110 Q 234 105 220 111" stroke="#121217" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>

      <!-- Nariz Firme e Sombreado -->
      <path d="M 203 120 L 207 132 L 201 134" stroke="#ba8e5e" stroke-width="1.8" stroke-linecap="round" fill="none" />

      <!-- Boca (Varia com a Expressão) -->
      {#if isSmirk}
        <!-- O famoso Sorriso de Canto (Smirk) de Dante -->
        <path d="M 194 148 Q 204 150 216 142" stroke="#4c1d24" stroke-width="2.6" stroke-linecap="round" fill="none" />
        <line x1="214" y1="142" x2="218" y2="140" stroke="#4c1d24" stroke-width="2.2" stroke-linecap="round" />
      {:else if isSmile}
        <!-- Sorriso sincero aberto -->
        <path d="M 194 146 Q 205 156 216 146" stroke="#4c1d24" stroke-width="2.6" stroke-linecap="round" fill="none" />
      {:else if isSurprised}
        <ellipse cx="205" cy="148" rx="4" ry="6" fill="#4c1d24" />
      {:else if isAngry}
        <path d="M 196 150 L 214 147" stroke="#4c1d24" stroke-width="2.6" stroke-linecap="round" />
      {:else}
        <!-- Neutro -->
        <path d="M 195 148 L 215 148" stroke="#4c1d24" stroke-width="2.2" stroke-linecap="round" />
      {/if}
    </g>

    <!-- ================= 4. ROUPAS SOBREPOSTAS: CAMISETA & CORRENTE (Z-INDEX 40) ================= -->
    <g id="dante-clothes-base">
      <!-- Camiseta Preta/Vinho "The Rust" -->
      <path 
        d="M 155 210 L 255 210 L 270 360 L 140 360 Z" 
        fill="#1e181c" 
        filter="url(#danteShadow)"
      />
      <!-- Decote em V solto -->
      <polygon points="175,210 205,245 235,210" fill="url(#danteSkin)" />
      
      <!-- Estampa Vermelha da Banda na Camiseta -->
      <polygon points="195,270 205,255 215,270 205,285" fill="#dc2626" opacity="0.9" />
      <path d="M 188,275 L 222,275" stroke="#f59e0b" stroke-width="2" />

      <!-- Cordão / Corrente Prateada com Palheta de Guitarra -->
      <path d="M 180 205 Q 205 250 230 205" stroke="#e4e4e7" stroke-width="2" fill="none" stroke-linecap="round" />
      <!-- Pingente de Palheta de Guitarra -->
      <polygon points="201,248 209,248 205,258" fill="#e11d48" stroke="#ffffff" stroke-width="0.8" />
    </g>

    <!-- ================= 5. ROUPAS SOBREPOSTAS: JAQUETA DE COURO BIKER (Z-INDEX 50) ================= -->
    <g id="dante-jacket">
      <!-- Jaqueta de Couro Perfecto Preta -->
      <!-- Ombro Esquerdo & Manga -->
      <path 
        d="M 95 240 L 155 205 L 175 350 L 105 380 L 70 310 Z" 
        fill="url(#leatherGrad)" 
        filter="url(#danteShadow)"
      />
      <!-- Ombro Direito & Manga -->
      <path 
        d="M 315 240 L 255 205 L 235 350 L 305 380 L 340 310 Z" 
        fill="url(#leatherGrad)" 
        filter="url(#danteShadow)"
      />

      <!-- Lapelas Abertas com Tachas de Metal -->
      <!-- Lapela Esquerda -->
      <polygon points="155,205 185,265 145,280" fill="#2d2d38" stroke="#121217" stroke-width="1.5" />
      <circle cx="165" cy="245" r="3" fill="#e4e4e7" stroke="#71717a" stroke-width="0.8" />
      <circle cx="152" cy="265" r="3" fill="#e4e4e7" stroke="#71717a" stroke-width="0.8" />

      <!-- Lapela Direita -->
      <polygon points="255,205 225,265 265,280" fill="#2d2d38" stroke="#121217" stroke-width="1.5" />
      <circle cx="245" cy="245" r="3" fill="#e4e4e7" stroke="#71717a" stroke-width="0.8" />
      <circle cx="258" cy="265" r="3" fill="#e4e4e7" stroke="#71717a" stroke-width="0.8" />

      <!-- Zíper Metálico Diagonal Característico -->
      <line x1="225" y1="210" x2="185" y2="350" stroke="#e4e4e7" stroke-width="3" stroke-dasharray="3,2" />
      <!-- Puxador do Zíper -->
      <rect x="202" y="275" width="4" height="8" rx="1" fill="#f43f5e" />

      <!-- Parte Inferior do Tronco / Cinto da Jaqueta com Fivela Prateada -->
      <rect x="130" y="350" width="150" height="18" fill="#121217" />
      <rect x="195" y="347" width="20" height="24" rx="2" fill="none" stroke="#e4e4e7" stroke-width="3" />
      <line x1="205" y1="347" x2="205" y2="371" stroke="#e4e4e7" stroke-width="2" />

      <!-- Calça Jeans Escura / Rebites de Bolso -->
      <path d="M 130 368 L 280 368 L 290 680 L 120 680 Z" fill="#181822" />
      <!-- Costuras e Detalhes da Calça -->
      <line x1="205" y1="370" x2="205" y2="680" stroke="#0a0a0f" stroke-width="3" />
      <!-- Corrente Lateral Presa ao Passador da Calça -->
      <path d="M 160 375 Q 140 430 165 470" stroke="#cbd5e1" stroke-width="2.5" fill="none" stroke-dasharray="4,2" />
    </g>

    <!-- ================= 6. CABELO FRENTE / FRANJA REPICADA ROCK (Z-INDEX 60) ================= -->
    <g id="dante-hair-front">
      <!-- Mechas Laterais e Topete Repicado Volumoso -->
      <!-- Mecha Esquerda sobre a Têmpora -->
      <path 
        d="M 148 95 C 138 120 142 160 152 175 C 158 175 158 140 156 115 Z" 
        fill="url(#danteHair)" 
      />
      <!-- Mecha Direita sobre a Têmpora -->
      <path 
        d="M 262 95 C 272 120 268 160 258 175 C 252 175 252 140 254 115 Z" 
        fill="url(#danteHair)" 
      />

      <!-- Mecha Caída com Estilo sobre a Testa (Quase cobrindo o olho direito) -->
      <path 
        d="M 145 75 C 160 30 250 30 265 75 C 250 85 240 100 225 125 C 220 105 210 95 195 90 C 180 95 160 90 145 75 Z" 
        fill="url(#danteHair)" 
        filter="url(#danteShadow)"
      />

      <!-- Mecha Rebelde Estilizada Caída no Centro -->
      <polygon points="188,80 205,122 198,85" fill="url(#danteHair)" />
      <polygon points="215,80 230,126 222,85" fill="url(#danteHair)" />

      <!-- Destaque / Brilho Grafite nos Fios de Cabelo -->
      <path d="M 175 48 Q 205 38 235 48" stroke="#52525b" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6" />
      <path d="M 185 58 Q 205 50 225 58" stroke="#71717a" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.5" />
    </g>

  </svg>
</div>
