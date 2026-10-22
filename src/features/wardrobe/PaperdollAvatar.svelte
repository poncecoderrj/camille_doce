<script lang="ts">
  import type { EquippedOutfit } from './wardrobe.schema';
  import { SKIN_TONES, EYE_COLORS, HAIR_COLORS } from './wardrobe.catalog';

  interface Props {
    outfit: EquippedOutfit;
    zoomMode?: 'corpo_inteiro' | 'busto';
    interactive?: boolean;
    class?: string;
  }

  let { 
    outfit, 
    zoomMode = 'corpo_inteiro', 
    interactive = false,
    class: customClass = '' 
  }: Props = $props();

  // Encontrar cores exatas
  let currentSkin = $derived(SKIN_TONES.find(s => s.id === outfit.skin_color) || SKIN_TONES[0]);
  let currentEye = $derived(EYE_COLORS.find(e => e.id === outfit.eye_color) || EYE_COLORS[0]);
  let currentHair = $derived(HAIR_COLORS.find(h => h.id === outfit.hair_color) || HAIR_COLORS[0]);

  // ViewBox dinâmico: Busto (Close-up) ou Corpo Inteiro
  let viewBox = $derived(zoomMode === 'busto' ? '70 20 260 300' : '0 0 400 670');
</script>

<div class="relative w-full h-full flex items-center justify-center select-none {customClass}">
  <svg 
    {viewBox} 
    class="w-full h-full max-h-full drop-shadow-2xl transition-all duration-500 overflow-visible"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <!-- Gradientes de Pele -->
      <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color={currentSkin.fill} />
        <stop offset="100%" stop-color={currentSkin.shadow} />
      </linearGradient>

      <!-- Gradiente de Cabelo -->
      <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color={currentHair.highlight} />
        <stop offset="45%" stop-color={currentHair.color} />
        <stop offset="100%" stop-color="#0a0a0d" stop-opacity="0.85" />
      </linearGradient>

      <!-- Sombra suave para camadas de roupas -->
      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#05060a" flood-opacity="0.3" />
      </filter>
    </defs>

    <!-- ================= CAMADA 10: CABELO TRÁS (Z-INDEX 10) ================= -->
    <g id="layer-hair-back" class="transition-all duration-300">
      {#if outfit.hair_front === 'cabelo_franja_onda'}
        <!-- Cabelo Longo Ondulado Trás -->
        <path 
          d="M 130 110 C 95 160 80 280 90 380 C 95 420 120 450 145 420 C 135 340 145 230 155 190 Z" 
          fill="url(#hairGrad)" 
        />
        <path 
          d="M 270 110 C 305 160 320 280 310 380 C 305 420 280 450 255 420 C 265 340 255 230 245 190 Z" 
          fill="url(#hairGrad)" 
        />
        <path 
          d="M 140 100 C 110 160 110 320 130 430 C 170 470 230 470 270 430 C 290 320 290 160 260 100 Z" 
          fill="url(#hairGrad)" 
          opacity="0.95"
        />
      {:else if outfit.hair_front === 'cabelo_rabo_cavalo'}
        <!-- Rabo de Cavalo Alto Caído para um Lado -->
        <path 
          d="M 250 80 C 320 90 350 160 340 260 C 335 300 310 320 300 290 C 310 220 290 150 240 110 Z" 
          fill="url(#hairGrad)" 
        />
        <circle cx="245" cy="85" r="8" fill="#e11d48" /> <!-- Prendedor -->
      {:else if outfit.hair_front === 'cabelo_coque_boemio'}
        <!-- Coque Alto no Topo -->
        <circle cx="200" cy="52" r="32" fill="url(#hairGrad)" />
        <ellipse cx="200" cy="50" rx="36" ry="24" fill="url(#hairGrad)" />
      {/if}
    </g>

    <!-- ================= CAMADA 20: CORPO / SILHUETA BASE (Z-INDEX 20) ================= -->
    <g id="layer-body" class="transition-all duration-300">
      <!-- Pernas / Coxas -->
      <path 
        d="M 172 350 C 168 400 165 470 170 530 C 172 560 170 600 172 630 L 192 630 C 196 590 198 540 196 480 C 195 440 198 390 198 350 Z" 
        fill="url(#skinGrad)" 
      />
      <path 
        d="M 228 350 C 232 400 235 470 230 530 C 228 560 230 600 228 630 L 208 630 C 204 590 202 540 204 480 C 205 440 202 390 202 350 Z" 
        fill="url(#skinGrad)" 
      />

      <!-- Pés / Tornozelos -->
      <ellipse cx="182" cy="635" rx="14" ry="7" fill={currentSkin.shadow} />
      <ellipse cx="218" cy="635" rx="14" ry="7" fill={currentSkin.shadow} />

      <!-- Tronco / Cintura / Quadril -->
      <path 
        d="M 148 185 C 152 230 162 265 168 310 C 160 330 156 360 168 375 C 185 385 215 385 232 375 C 244 360 240 330 232 310 C 238 265 248 230 252 185 C 235 180 165 180 148 185 Z" 
        fill="url(#skinGrad)" 
      />

      <!-- Roupas Íntimas Base (Sutiã & Calcinha Neutra para Troca de Roupa) -->
      <path d="M 154 215 C 170 240 195 240 200 225 C 205 240 230 240 246 215 C 242 205 230 200 200 205 C 170 200 158 205 154 215 Z" fill="#ffffff" opacity="0.85" />
      <path d="M 166 320 C 180 325 220 325 234 320 C 230 355 220 375 200 375 C 180 375 170 355 166 320 Z" fill="#ffffff" opacity="0.85" />

      <!-- Braço Esquerdo (Descanso suave ao lado do quadril) -->
      <path 
        d="M 148 185 C 136 220 128 270 132 320 C 134 340 132 370 138 395 C 144 397 150 393 148 385 C 144 360 146 330 146 310 C 148 260 154 220 156 188 Z" 
        fill="url(#skinGrad)" 
      />

      <!-- Braço Direito (Descanso suave ao lado do quadril) -->
      <path 
        d="M 252 185 C 264 220 272 270 268 320 C 266 340 268 370 262 395 C 256 397 250 393 252 385 C 256 360 254 330 254 310 C 252 260 246 220 244 188 Z" 
        fill="url(#skinGrad)" 
      />

      <!-- Pescoço e Clavícula -->
      <path d="M 188 140 L 188 185 C 194 188 206 188 212 185 L 212 140 Z" fill="url(#skinGrad)" />
      <!-- Sombra sob o Queixo -->
      <path d="M 188 140 C 196 148 204 148 212 140 L 212 150 C 204 156 196 156 188 150 Z" fill={currentSkin.shadow} opacity="0.6" />

      <!-- Cabeça / Rosto Anime -->
      <path 
        d="M 152 105 C 150 65 170 45 200 45 C 230 45 250 65 248 105 C 248 128 238 148 200 158 C 162 148 152 128 152 105 Z" 
        fill="url(#skinGrad)" 
        filter="url(#softShadow)"
      />
      <!-- Orelhas Sutis -->
      <ellipse cx="150" cy="108" rx="6" ry="10" fill="url(#skinGrad)" />
      <ellipse cx="250" cy="108" rx="6" ry="10" fill="url(#skinGrad)" />
    </g>

    <!-- ================= CAMADA 30: ROSTO (OLHOS, EXPRESSÃO, BLUSH) (Z-INDEX 30) ================= -->
    <g id="layer-face">
      <!-- Blush nas Bochechas -->
      {#if outfit.blush}
        <ellipse cx="168" cy="116" rx="12" ry="6" fill="#f43f5e" opacity="0.25" />
        <ellipse cx="232" cy="116" rx="12" ry="6" fill="#f43f5e" opacity="0.25" />
      {/if}

      <!-- Sobrancelhas Suaves -->
      <path d="M 166 94 Q 178 91 188 95" stroke={currentHair.color} stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8" />
      <path d="M 234 94 Q 222 91 212 95" stroke={currentHair.color} stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8" />

      <!-- Olho Esquerdo (Estilo Anime Otome) -->
      <g id="eye-left">
        <!-- Esclera Branca -->
        <ellipse cx="177" cy="106" rx="10" ry="8" fill="#ffffff" />
        <!-- Íris Colorida com Gradiente -->
        <ellipse cx="177" cy="106" rx="6.5" ry="7.5" fill={currentEye.color} />
        <!-- Pupila -->
        <circle cx="177" cy="106" r="3.2" fill="#0f0f14" />
        <!-- Brilhos Anime (Catchlight) -->
        <circle cx="175" cy="103" r="2.2" fill="#ffffff" />
        <circle cx="179" cy="108" r="1.1" fill="#ffffff" opacity="0.8" />
        <!-- Cílios Superiores Elegantes -->
        <path d="M 166 102 Q 177 98 188 103" stroke="#18181b" stroke-width="2.5" stroke-linecap="round" fill="none" />
      </g>

      <!-- Olho Direito -->
      <g id="eye-right">
        <!-- Esclera Branca -->
        <ellipse cx="223" cy="106" rx="10" ry="8" fill="#ffffff" />
        <!-- Íris Colorida com Gradiente -->
        <ellipse cx="223" cy="106" rx="6.5" ry="7.5" fill={currentEye.color} />
        <!-- Pupila -->
        <circle cx="223" cy="106" r="3.2" fill="#0f0f14" />
        <!-- Brilhos Anime -->
        <circle cx="221" cy="103" r="2.2" fill="#ffffff" />
        <circle cx="225" cy="108" r="1.1" fill="#ffffff" opacity="0.8" />
        <!-- Cílios Superiores -->
        <path d="M 234 102 Q 223 98 212 103" stroke="#18181b" stroke-width="2.5" stroke-linecap="round" fill="none" />
      </g>

      <!-- Nariz Delicado -->
      <path d="M 199 116 L 201 122" stroke={currentSkin.shadow} stroke-width="1.5" stroke-linecap="round" />

      <!-- Boca / Expressão -->
      {#if outfit.mouth_expression === 'boca_sorriso'}
        <path d="M 194 135 Q 200 141 206 135" stroke="#e11d48" stroke-width="2" stroke-linecap="round" fill="none" />
      {:else if outfit.mouth_expression === 'boca_timida'}
        <path d="M 196 136 Q 200 138 204 136" stroke="#e11d48" stroke-width="1.8" stroke-linecap="round" fill="none" />
      {:else}
        <path d="M 195 136 L 205 136" stroke="#e11d48" stroke-width="1.8" stroke-linecap="round" />
      {/if}
    </g>

    <!-- ================= CAMADA 40: MEIAS (Z-INDEX 40) ================= -->
    <g id="layer-socks">
      {#if outfit.socks === 'meia_3_4_branca'}
        <!-- Meias 3/4 com Borda de Renda -->
        <path d="M 168 510 C 168 550 170 595 172 630 L 192 630 C 196 595 197 550 197 510 Z" fill="#ffffff" filter="url(#softShadow)" />
        <path d="M 232 510 C 232 550 230 595 228 630 L 208 630 C 204 595 203 550 203 510 Z" fill="#ffffff" filter="url(#softShadow)" />
        <!-- Babados rendados na borda -->
        <path d="M 166 510 Q 182 506 198 510" stroke="#f4f4f5" stroke-width="3" fill="none" />
        <path d="M 202 510 Q 218 506 234 510" stroke="#f4f4f5" stroke-width="3" fill="none" />
      {:else if outfit.socks === 'meia_arrastao_preta'}
        <!-- Meia Arrastão -->
        <path d="M 170 380 L 172 630 L 192 630 L 196 380 Z" fill="#000000" opacity="0.25" stroke="#000000" stroke-dasharray="3,3" />
        <path d="M 230 380 L 228 630 L 208 630 L 204 380 Z" fill="#000000" opacity="0.25" stroke="#000000" stroke-dasharray="3,3" />
      {:else if outfit.socks === 'meia_calca_opaca'}
        <!-- Meia-Calça Opaca Preta -->
        <path d="M 168 330 C 168 450 170 550 172 630 L 192 630 C 196 550 197 450 197 330 Z" fill="#18181b" />
        <path d="M 232 330 C 232 450 230 550 228 630 L 208 630 C 204 550 203 450 203 330 Z" fill="#18181b" />
      {/if}
    </g>

    <!-- ================= CAMADA 50: CALÇADOS (Z-INDEX 50) ================= -->
    <g id="layer-shoes">
      {#if outfit.shoes === 'mocassim_marrom_lotus'}
        <!-- Mocassim Clássico de Couro Marrom -->
        <path d="M 167 622 C 165 638 174 645 194 645 C 198 640 196 626 193 622 Z" fill="#451a03" filter="url(#softShadow)" />
        <path d="M 233 622 C 235 638 226 645 206 645 C 202 640 204 626 207 622 Z" fill="#451a03" filter="url(#softShadow)" />
        <!-- Fivela Dourada -->
        <rect x="178" y="625" width="8" height="4" rx="1" fill="#f59e0b" />
        <rect x="214" y="625" width="8" height="4" rx="1" fill="#f59e0b" />
      {:else if outfit.shoes === 'coturno_rock_militar'}
        <!-- Coturno Rock Preto com Fivelas -->
        <path d="M 166 600 C 164 635 170 648 196 648 C 198 635 197 608 195 600 Z" fill="#18181b" filter="url(#softShadow)" />
        <path d="M 234 600 C 236 635 230 648 204 648 C 202 635 203 608 205 600 Z" fill="#18181b" filter="url(#softShadow)" />
        <!-- Solado Tratorado & Cadarço Vermelho -->
        <rect x="166" y="643" width="30" height="5" fill="#09090b" />
        <rect x="204" y="643" width="30" height="5" fill="#09090b" />
        <path d="M 176 608 L 186 614 M 176 616 L 186 622" stroke="#e11d48" stroke-width="2" />
        <path d="M 214 608 L 224 614 M 214 616 L 224 622" stroke="#e11d48" stroke-width="2" />
      {:else if outfit.shoes === 'sapatilhas_veludo_vinho'}
        <!-- Sapatilhas Vinho com Tira Mary Jane -->
        <path d="M 168 626 C 166 640 175 644 194 644 C 197 640 196 630 194 626 Z" fill="#881337" filter="url(#softShadow)" />
        <path d="M 232 626 C 234 640 225 644 206 644 C 203 640 204 630 206 626 Z" fill="#881337" filter="url(#softShadow)" />
        <line x1="172" y1="630" x2="190" y2="630" stroke="#4c0519" stroke-width="2" />
        <line x1="210" y1="630" x2="228" y2="630" stroke="#4c0519" stroke-width="2" />
      {:else}
        <!-- Tênis Branco Minimalista -->
        <path d="M 167 624 C 165 640 174 646 195 646 C 198 640 197 628 194 624 Z" fill="#ffffff" stroke="#e4e4e7" filter="url(#softShadow)" />
        <path d="M 233 624 C 235 640 226 646 205 646 C 202 640 203 628 206 624 Z" fill="#ffffff" stroke="#e4e4e7" filter="url(#softShadow)" />
      {/if}
    </g>

    <!-- ================= CAMADA 60: PARTE INFERIOR (BOTTOM) (Z-INDEX 60) ================= -->
    <!-- Só renderiza se NÃO estiver usando vestido completo -->
    {#if !outfit.dress}
      <g id="layer-bottom">
        {#if outfit.bottom === 'saia_pregueada_azul'}
          <!-- Saia Pregueada Lótus (Azul Marinho) -->
          <path 
            d="M 166 305 L 234 305 L 254 395 C 220 405 180 405 146 395 Z" 
            fill="#1e293b" 
            filter="url(#softShadow)"
          />
          <!-- Pregas e Sombras da Saia -->
          <path d="M 180 305 L 172 398 M 195 305 L 192 403 M 205 305 L 208 403 M 220 305 L 228 398" stroke="#0f172a" stroke-width="2" />
          <path d="M 164 302 L 236 302 L 234 312 L 166 312 Z" fill="#0f172a" /> <!-- Cós -->
        {:else if outfit.bottom === 'saia_xadrez_grunge'}
          <!-- Saia Xadrez Vermelho e Preto -->
          <path 
            d="M 166 305 L 234 305 L 256 385 C 220 395 180 395 144 385 Z" 
            fill="#b91c1c" 
            filter="url(#softShadow)"
          />
          <!-- Estampa Xadrez com Linhas Pretas -->
          <path d="M 152 350 Q 200 365 248 350 M 148 370 Q 200 385 252 370" stroke="#18181b" stroke-width="4" opacity="0.6" />
          <line x1="176" y1="305" x2="168" y2="388" stroke="#18181b" stroke-width="4" opacity="0.6" />
          <line x1="200" y1="305" x2="200" y2="393" stroke="#18181b" stroke-width="4" opacity="0.6" />
          <line x1="224" y1="305" x2="232" y2="388" stroke="#18181b" stroke-width="4" opacity="0.6" />
          <!-- Fivela de Metal Lateral -->
          <rect x="160" y="318" width="6" height="12" rx="1" fill="#e4e4e7" stroke="#3f3f46" stroke-width="1" />
        {:else if outfit.bottom === 'calca_jeans_skinny'}
          <!-- Calça Jeans Skinny -->
          <path 
            d="M 166 305 L 234 305 L 238 350 C 234 430 232 530 228 620 L 208 620 C 204 530 203 440 200 365 C 197 440 196 530 192 620 L 172 620 C 168 530 166 430 162 350 Z" 
            fill="#1e3a8a" 
            filter="url(#softShadow)"
          />
          <!-- Costuras Amarelas & Rasgos nos Joelhos -->
          <path d="M 200 310 L 200 360" stroke="#ca8a04" stroke-width="1.5" />
          <line x1="172" y1="460" x2="188" y2="460" stroke="#93c5fd" stroke-width="2.5" />
          <line x1="212" y1="465" x2="228" y2="465" stroke="#93c5fd" stroke-width="2.5" />
        {:else if outfit.bottom === 'saia_midi_plissada'}
          <!-- Saia Midi Verde Oliva Elegante -->
          <path 
            d="M 168 305 L 232 305 L 260 480 C 220 495 180 495 140 480 Z" 
            fill="#365314" 
            filter="url(#softShadow)"
          />
          <path d="M 178 305 L 165 485 M 192 305 L 188 490 M 208 305 L 212 490 M 222 305 L 235 485" stroke="#1a2e05" stroke-width="2" />
        {:else}
          <!-- Shorts Alfaiataria Tweed Bege -->
          <path 
            d="M 166 305 L 234 305 L 244 370 L 204 375 L 200 355 L 196 375 L 156 370 Z" 
            fill="#d6d3d1" 
            filter="url(#softShadow)"
          />
          <line x1="166" y1="315" x2="234" y2="315" stroke="#78716c" stroke-width="4" />
        {/if}
      </g>
    {/if}

    <!-- ================= CAMADA 70: VESTIDO (ONE-PIECE) (Z-INDEX 75) ================= -->
    {#if outfit.dress}
      <g id="layer-dress">
        {#if outfit.dress === 'vestido_floral_primavera'}
          <!-- Vestido Floral Rosa Chá & Folhagens -->
          <path 
            d="M 160 185 L 240 185 L 246 300 L 268 450 C 220 470 180 470 132 450 L 154 300 Z" 
            fill="#fbcfe8" 
            filter="url(#softShadow)"
          />
          <!-- Estampa Floral e Decote -->
          <path d="M 180 185 Q 200 215 220 185" stroke="#f472b6" stroke-width="2" fill="none" />
          <circle cx="160" cy="340" r="5" fill="#f472b6" opacity="0.6" />
          <circle cx="210" cy="380" r="6" fill="#f472b6" opacity="0.6" />
          <circle cx="240" cy="350" r="5" fill="#f472b6" opacity="0.6" />
          <circle cx="180" cy="420" r="7" fill="#f472b6" opacity="0.6" />
          <!-- Laço de Fita na Cintura -->
          <rect x="168" y="295" width="64" height="10" rx="3" fill="#ec4899" />
          <polygon points="195,305 200,325 205,305" fill="#ec4899" />
        {:else}
          <!-- Vestido Gótico Lolita Preto com Espartilho -->
          <path 
            d="M 158 185 L 242 185 L 248 300 L 272 440 C 220 460 180 460 128 440 L 152 300 Z" 
            fill="#18181b" 
            filter="url(#softShadow)"
          />
          <!-- Amarração Frontal do Espartilho -->
          <path d="M 188 220 L 212 230 M 212 220 L 188 230 M 188 245 L 212 255 M 212 245 L 188 255 M 188 270 L 212 280 M 212 270 L 188 280" stroke="#e11d48" stroke-width="2" />
          <path d="M 128 440 Q 200 465 272 440" stroke="#ffffff" stroke-width="4" stroke-dasharray="6,4" fill="none" />
        {/if}
      </g>
    {/if}

    <!-- ================= CAMADA 70: PARTE SUPERIOR (TOP) (Z-INDEX 70) ================= -->
    <!-- Só renderiza se NÃO estiver usando vestido completo -->
    {#if !outfit.dress}
      <g id="layer-top">
        {#if outfit.top === 'camisa_uniforme_lotus'}
          <!-- Camisa Social Branca da Academia Lótus -->
          <path 
            d="M 154 185 L 246 185 L 238 310 L 162 310 Z" 
            fill="#ffffff" 
            filter="url(#softShadow)"
          />
          <!-- Mangas Curtas -->
          <path d="M 154 185 L 138 235 L 154 240 L 162 195 Z" fill="#ffffff" />
          <path d="M 246 185 L 262 235 L 246 240 L 238 195 Z" fill="#ffffff" />
          <!-- Colarinho e Laço Azul -->
          <polygon points="184,185 200,205 188,205" fill="#f4f4f5" stroke="#cbd5e1" stroke-width="1" />
          <polygon points="216,185 200,205 212,205" fill="#f4f4f5" stroke="#cbd5e1" stroke-width="1" />
          <!-- Laço da Gravata -->
          <circle cx="200" cy="205" r="4" fill="#1e3a8a" />
          <polygon points="196,205 186,215 198,220" fill="#1e3a8a" />
          <polygon points="204,205 214,215 202,220" fill="#1e3a8a" />
          <!-- Botões Frontais -->
          <circle cx="200" cy="235" r="2" fill="#94a3b8" />
          <circle cx="200" cy="260" r="2" fill="#94a3b8" />
          <circle cx="200" cy="285" r="2" fill="#94a3b8" />
        {:else if outfit.top === 'camiseta_rock_banda'}
          <!-- Camiseta Grunge "The Rust" -->
          <path 
            d="M 152 185 L 248 185 L 242 315 L 158 315 Z" 
            fill="#18181b" 
            filter="url(#softShadow)"
          />
          <!-- Mangas Soltas -->
          <path d="M 152 185 L 134 245 L 150 250 L 160 195 Z" fill="#18181b" />
          <path d="M 248 185 L 266 245 L 250 250 L 240 195 Z" fill="#18181b" />
          <!-- Decote Redondo -->
          <path d="M 180 185 Q 200 205 220 185" fill={currentSkin.fill} />
          <!-- Estampa da Banda no Peito -->
          <polygon points="190,230 200,215 210,230 200,245" fill="#e11d48" />
          <path d="M 185 235 L 215 235" stroke="#f59e0b" stroke-width="2" />
        {:else if outfit.top === 'sueter_trico_creme'}
          <!-- Suéter de Lã Oversized Marfim -->
          <path 
            d="M 148 180 L 252 180 L 246 325 L 154 325 Z" 
            fill="#fef3c7" 
            filter="url(#softShadow)"
          />
          <!-- Mangas Volumosas e Confortáveis -->
          <path d="M 148 180 C 130 220 125 270 136 330 L 152 328 C 145 280 148 230 158 190 Z" fill="#fef3c7" />
          <path d="M 252 180 C 270 220 275 270 264 330 L 248 328 C 255 280 252 230 242 190 Z" fill="#fef3c7" />
          <!-- Gola Rulê Confortável -->
          <rect x="180" y="165" width="40" height="20" rx="6" fill="#fde68a" stroke="#d97706" stroke-width="1" />
          <!-- Trama de Tricô Vertical -->
          <path d="M 175 195 L 175 320 M 200 195 L 200 320 M 225 195 L 225 320" stroke="#fcd34d" stroke-width="1.5" stroke-dasharray="4,2" />
        {:else if outfit.top === 'blusa_romantica_renda'}
          <!-- Blusa Chiffon Flor de Lótus -->
          <path 
            d="M 156 185 L 244 185 L 238 310 L 162 310 Z" 
            fill="#ffe4e6" 
            filter="url(#softShadow)"
          />
          <!-- Decote em V com Renda -->
          <polygon points="186,185 200,215 214,185" fill={currentSkin.fill} />
          <path d="M 186 185 L 200 215 L 214 185" stroke="#f43f5e" stroke-width="2" fill="none" stroke-dasharray="2,2" />
        {:else}
          <!-- Regata Streetwear Cinza -->
          <path 
            d="M 166 185 L 234 185 L 236 308 L 164 308 Z" 
            fill="#71717a" 
            filter="url(#softShadow)"
          />
          <path d="M 180 185 Q 200 215 220 185" fill={currentSkin.fill} />
        {/if}
      </g>
    {/if}

    <!-- ================= CAMADA 80: CASACO / SOBRETUDO (Z-INDEX 80) ================= -->
    <g id="layer-jacket">
      {#if outfit.jacket === 'blazer_marinho_lotus'}
        <!-- Blazer Estruturado da Academia Lótus -->
        <!-- Lado Esquerdo -->
        <path d="M 144 182 L 195 182 L 190 325 L 140 320 Z" fill="#0f172a" filter="url(#softShadow)" />
        <!-- Lado Direito -->
        <path d="M 256 182 L 205 182 L 210 325 L 260 320 Z" fill="#0f172a" filter="url(#softShadow)" />
        <!-- Mangas Longas de Alfaiataria -->
        <path d="M 144 182 L 126 295 L 142 298 L 156 195 Z" fill="#0f172a" />
        <path d="M 256 182 L 274 295 L 258 298 L 244 195 Z" fill="#0f172a" />
        <!-- Lapelas Nobres -->
        <polygon points="172,182 195,245 182,245" fill="#1e293b" />
        <polygon points="228,182 205,245 218,245" fill="#1e293b" />
        <!-- Brasão Dourado Bordado no Bolso -->
        <circle cx="166" cy="235" r="5" fill="#f59e0b" />
        <path d="M 164 233 L 168 237 M 168 233 L 164 237" stroke="#78350f" stroke-width="1" />
        <!-- Botões Dourados Centrais -->
        <circle cx="204" cy="275" r="3" fill="#fbbf24" stroke="#78350f" stroke-width="0.8" />
      {:else if outfit.jacket === 'jaqueta_couro_perfecto'}
        <!-- Jaqueta de Couro Rock Biker -->
        <path d="M 142 180 L 258 180 L 250 310 L 150 310 Z" fill="#18181b" filter="url(#softShadow)" />
        <!-- Mangas de Couro com Zíper no Punho -->
        <path d="M 142 180 L 124 295 L 140 298 L 154 195 Z" fill="#18181b" />
        <path d="M 258 180 L 276 295 L 260 298 L 246 195 Z" fill="#18181b" />
        <!-- Gola com Lapelas Abertas e Tachas -->
        <polygon points="160,180 180,215 160,225" fill="#27272a" />
        <polygon points="240,180 220,215 240,225" fill="#27272a" />
        <circle cx="165" cy="210" r="2" fill="#e4e4e7" />
        <circle cx="235" cy="210" r="2" fill="#e4e4e7" />
        <!-- Zíper Diagonal Metálico -->
        <line x1="215" y1="185" x2="190" y2="305" stroke="#e4e4e7" stroke-width="2.5" stroke-dasharray="2,2" />
      {:else if outfit.jacket === 'cardiga_nobre_marfim'}
        <!-- Cardigã Aconchegante Aberto -->
        <path d="M 144 180 L 175 180 L 168 360 L 138 355 Z" fill="#f5f5f4" filter="url(#softShadow)" />
        <path d="M 256 180 L 225 180 L 232 360 L 262 355 Z" fill="#f5f5f4" filter="url(#softShadow)" />
        <path d="M 144 180 L 126 310 L 140 312 L 154 195 Z" fill="#f5f5f4" />
        <path d="M 256 180 L 274 310 L 260 312 L 246 195 Z" fill="#f5f5f4" />
      {/if}
    </g>

    <!-- ================= CAMADA 90: CABELO FRENTE / FRANJA (Z-INDEX 90) ================= -->
    <g id="layer-hair-front" class="transition-all duration-300">
      {#if outfit.hair_front === 'cabelo_franja_onda'}
        <!-- Franja Arredondada Suave com Mechas Longas Laterais -->
        <!-- Mecha Esquerda sobre o Ombro -->
        <path d="M 152 95 C 145 130 142 180 150 230 C 158 235 162 210 160 170 C 158 130 162 100 168 85 Z" fill="url(#hairGrad)" filter="url(#softShadow)" />
        <!-- Mecha Direita sobre o Ombro -->
        <path d="M 248 95 C 255 130 258 180 250 230 C 242 235 238 210 240 170 C 242 130 238 100 232 85 Z" fill="url(#hairGrad)" filter="url(#softShadow)" />
        <!-- Franja Frontal Central -->
        <path 
          d="M 150 75 C 160 48 240 48 250 75 C 245 92 232 94 220 90 C 205 95 195 95 180 90 C 168 94 155 92 150 75 Z" 
          fill="url(#hairGrad)" 
        />
        <!-- Brilho no Topo da Cabeça -->
        <ellipse cx="200" cy="62" rx="30" ry="4" fill="#ffffff" opacity="0.25" />
      {:else if outfit.hair_front === 'cabelo_bob_chanel'}
        <!-- Bob Cut Chanel com Pontas Curvadas para Dentro -->
        <path 
          d="M 148 70 C 158 45 242 45 252 70 C 256 120 252 165 240 175 C 235 160 238 120 234 90 C 220 92 208 94 200 90 C 192 94 180 92 166 90 C 162 120 165 160 160 175 C 148 165 144 120 148 70 Z" 
          fill="url(#hairGrad)" 
          filter="url(#softShadow)"
        />
      {:else if outfit.hair_front === 'cabelo_rabo_cavalo'}
        <!-- Cabelo Puxado para Trás com Franjas Laterais Finas -->
        <path d="M 152 75 C 165 50 235 50 248 75 C 240 85 220 85 200 82 C 180 85 160 85 152 75 Z" fill="url(#hairGrad)" />
        <path d="M 152 80 C 148 110 148 150 154 180 C 158 180 156 150 158 110 Z" fill="url(#hairGrad)" />
        <path d="M 248 80 C 252 110 252 150 246 180 C 242 180 244 150 242 110 Z" fill="url(#hairGrad)" />
      {:else}
        <!-- Coque Boêmio com Fios Soltos -->
        <path d="M 150 72 C 160 48 240 48 250 72 C 240 92 225 90 200 86 C 175 90 160 92 150 72 Z" fill="url(#hairGrad)" />
        <path d="M 152 85 C 146 120 148 150 152 170" stroke={currentHair.color} stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M 248 85 C 254 120 252 150 248 170" stroke={currentHair.color} stroke-width="3" stroke-linecap="round" fill="none" />
      {/if}
    </g>

    <!-- ================= CAMADA 100: ACESSÓRIOS DE CABEÇA (Z-INDEX 100) ================= -->
    <g id="layer-hat">
      {#if outfit.hat === 'boina_feltro_ocre'}
        <!-- Boina Francesa Mostarda Inclinada -->
        <ellipse cx="190" cy="52" rx="48" ry="18" fill="#d97706" transform="rotate(-8 190 52)" filter="url(#softShadow)" />
        <circle cx="178" cy="40" r="3" fill="#b45309" />
      {:else if outfit.hat === 'tiara_veludo_preto'}
        <!-- Tiara de Veludo com Pérolas -->
        <path d="M 156 75 C 165 42 235 42 244 75" stroke="#18181b" stroke-width="6" stroke-linecap="round" fill="none" filter="url(#softShadow)" />
        <!-- Pérolas Decorativas -->
        <circle cx="180" cy="52" r="2.5" fill="#f4f4f5" />
        <circle cx="200" cy="48" r="3" fill="#f4f4f5" />
        <circle cx="220" cy="52" r="2.5" fill="#f4f4f5" />
      {:else if outfit.hat === 'gorro_beanie_cinza'}
        <!-- Gorro Beanie Streetwear Caído -->
        <path d="M 150 75 C 150 35 240 25 260 55 C 270 70 260 85 248 78 C 235 85 165 85 150 75 Z" fill="#52525b" filter="url(#softShadow)" />
      {/if}
    </g>

    <!-- ================= CAMADA 105: ÓCULOS (Z-INDEX 105) ================= -->
    <g id="layer-glasses">
      {#if outfit.glasses === 'oculos_redondos_dourados'}
        <!-- Óculos Redondos Metálicos Dourados -->
        <circle cx="177" cy="106" r="13" stroke="#f59e0b" stroke-width="1.8" fill="rgba(255, 255, 255, 0.15)" />
        <circle cx="223" cy="106" r="13" stroke="#f59e0b" stroke-width="1.8" fill="rgba(255, 255, 255, 0.15)" />
        <!-- Ponte Central e Hastes -->
        <path d="M 190 105 Q 200 102 210 105" stroke="#f59e0b" stroke-width="1.8" fill="none" />
        <line x1="164" y1="105" x2="152" y2="102" stroke="#f59e0b" stroke-width="1.5" />
        <line x1="236" y1="105" x2="248" y2="102" stroke="#f59e0b" stroke-width="1.5" />
        <!-- Reflexo de Vidro -->
        <line x1="172" y1="98" x2="182" y2="114" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />
        <line x1="218" y1="98" x2="228" y2="114" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />
      {:else if outfit.glasses === 'oculos_escuros_wayfarer'}
        <!-- Óculos de Sol Retrô Escuros -->
        <rect x="160" y="96" width="34" height="20" rx="4" fill="#09090b" stroke="#27272a" stroke-width="2" />
        <rect x="206" y="96" width="34" height="20" rx="4" fill="#09090b" stroke="#27272a" stroke-width="2" />
        <line x1="194" y1="102" x2="206" y2="102" stroke="#27272a" stroke-width="3" />
      {/if}
    </g>

    <!-- ================= CAMADA 110: COLAR / CACHECOL (Z-INDEX 110) ================= -->
    <g id="layer-necklace">
      {#if outfit.necklace === 'cachecol_volumoso_mostarda'}
        <!-- Cachecol de Lã Volumoso Xadrez Mostarda -->
        <ellipse cx="200" cy="175" rx="34" ry="16" fill="#d97706" filter="url(#softShadow)" />
        <path d="M 188 175 L 180 260 L 202 260 L 206 175 Z" fill="#b45309" filter="url(#softShadow)" />
        <!-- Franjas do Cachecol -->
        <path d="M 180 260 L 180 268 M 186 260 L 186 268 M 192 260 L 192 268 M 198 260 L 198 268" stroke="#78350f" stroke-width="2" />
      {:else if outfit.necklace === 'gargantilha_choker_spikes'}
        <!-- Choker de Couro Preto com Clave de Sol -->
        <path d="M 188 160 Q 200 166 212 160" stroke="#18181b" stroke-width="4" stroke-linecap="round" fill="none" />
        <circle cx="200" cy="168" r="3.5" fill="#e4e4e7" stroke="#71717a" stroke-width="1" />
      {:else if outfit.necklace === 'cordao_perola_delicado'}
        <!-- Cordão Fino Dourado com Pérola -->
        <path d="M 188 165 Q 200 178 212 165" stroke="#f59e0b" stroke-width="1" fill="none" />
        <circle cx="200" cy="178" r="2.5" fill="#ffffff" stroke="#f59e0b" stroke-width="0.8" />
      {/if}
    </g>

    <!-- ================= CAMADA 120: BOLSA / MOCHILA (Z-INDEX 120) ================= -->
    <g id="layer-bag">
      {#if outfit.bag === 'mochila_couro_vintage'}
        <!-- Alças de Mochila de Couro Passando pelos Ombros -->
        <path d="M 152 182 Q 146 220 148 260" stroke="#78350f" stroke-width="4.5" stroke-linecap="round" fill="none" filter="url(#softShadow)" />
        <path d="M 248 182 Q 254 220 252 260" stroke="#78350f" stroke-width="4.5" stroke-linecap="round" fill="none" filter="url(#softShadow)" />
        <!-- Fivelas de Bronze -->
        <rect x="144" y="215" width="8" height="6" rx="1" fill="#f59e0b" />
        <rect x="248" y="215" width="8" height="6" rx="1" fill="#f59e0b" />
      {:else if outfit.bag === 'bolsa_lateral_lona'}
        <!-- Alça Transversal da Bolsa Carteiro -->
        <line x1="146" y1="184" x2="258" y2="340" stroke="#27272a" stroke-width="5" stroke-linecap="round" filter="url(#softShadow)" />
        <!-- Corpo da Bolsa no Quadril Direito -->
        <rect x="244" y="325" width="35" height="40" rx="4" fill="#3f3f46" stroke="#18181b" stroke-width="2" filter="url(#softShadow)" />
        <!-- Boton de Guitarra -->
        <circle cx="256" cy="342" r="4.5" fill="#e11d48" />
      {:else if outfit.bag === 'bolsa_artesanato_linho'}
        <!-- Bolsa Tote de Ombro em Linho -->
        <path d="M 148 184 Q 138 230 136 290" stroke="#a8a29e" stroke-width="4" stroke-linecap="round" fill="none" />
        <rect x="118" y="285" width="30" height="38" rx="3" fill="#e7e5e4" stroke="#d6d3d1" stroke-width="1.5" filter="url(#softShadow)" />
        <circle cx="133" cy="304" r="5" fill="#10b981" opacity="0.6" />
      {/if}
    </g>

  </svg>
</div>
