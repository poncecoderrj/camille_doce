import os
import numpy as np
from PIL import Image

BASE_DIR = r"C:\Users\Luis\Desktop\entre-sinos\public\assets\characters\iris"
ASSETS_DIR = os.path.join(BASE_DIR, "base")

# Directories for modular paperdoll pieces
CABELOS_DIR = os.path.join(BASE_DIR, "cabelos")
ROUPAS_SUPERIOR = os.path.join(BASE_DIR, "roupas", "superior")
ROUPAS_INFERIOR = os.path.join(BASE_DIR, "roupas", "inferior")
ROUPAS_CASACOS = os.path.join(BASE_DIR, "roupas", "casacos")
ROUPAS_CALCADOS = os.path.join(BASE_DIR, "roupas", "calcados")
ROUPAS_ACESSORIOS = os.path.join(BASE_DIR, "roupas", "acessorios")

for d in [CABELOS_DIR, ROUPAS_SUPERIOR, ROUPAS_INFERIOR, ROUPAS_CASACOS, ROUPAS_CALCADOS, ROUPAS_ACESSORIOS]:
    os.makedirs(d, exist_ok=True)

def slice_horizontal(src_path, dest_path, y_min, y_max, x_min=0, x_max=768, feather=15):
    """Extrai uma camada de roupa mantendo a resolução exata 768x1344 e suavizando as junções"""
    im = Image.open(src_path).convert("RGBA")
    arr = np.array(im)
    out_arr = np.zeros_like(arr)
    
    # Copia região
    h, w, _ = arr.shape
    y0 = max(0, y_min)
    y1 = min(h, y_max)
    x0 = max(0, x_min)
    x1 = min(w, x_max)
    
    out_arr[y0:y1, x0:x1] = arr[y0:y1, x0:x1]
    
    # Aplica gradiente alfa suave nas bordas superior e inferior (feathering) para junções perfeitas
    if feather > 0:
        for i in range(feather):
            alpha_factor = (i + 1) / feather
            # borda superior
            if y0 + i < h:
                out_arr[y0 + i, :, 3] = (out_arr[y0 + i, :, 3] * alpha_factor).astype(np.uint8)
            # borda inferior
            if y1 - 1 - i >= 0:
                out_arr[y1 - 1 - i, :, 3] = (out_arr[y1 - 1 - i, :, 3] * alpha_factor).astype(np.uint8)
                
    out_im = Image.fromarray(out_arr)
    out_im.save(dest_path, "PNG", optimize=True)
    print(f"Gerado: {dest_path} (bbox: {out_im.getbbox()})")

print("--- EXTRAINDO CAMADAS MODULARES DO UNIFORME LÓTUS ---")
lotus_path = os.path.join(ASSETS_DIR, "uniforme_lotus.png")
# Camisa e Gravata Lótus (Y: 590 a 865)
slice_horizontal(lotus_path, os.path.join(ROUPAS_SUPERIOR, "camisa_uniforme_lotus.png"), 590, 865)
# Saia Lótus (Y: 855 a 1055)
slice_horizontal(lotus_path, os.path.join(ROUPAS_INFERIOR, "saia_uniforme_lotus.png"), 850, 1055)
# Sapatos & Meias Lótus (Y: 1050 a 1344)
slice_horizontal(lotus_path, os.path.join(ROUPAS_CALCADOS, "sapatos_uniforme_lotus.png"), 1050, 1344)
# Cabelo Trás & Frente Padrão Lótus
slice_horizontal(lotus_path, os.path.join(CABELOS_DIR, "cabelo_ondulado_base.png"), 415, 680)

print("\n--- EXTRAINDO CAMADAS MODULARES DO LOOK ROCK ---")
rock_path = os.path.join(ASSETS_DIR, "look_rock.png")
# Camiseta Rock & Jaqueta Perfecto (Y: 590 a 865)
slice_horizontal(rock_path, os.path.join(ROUPAS_SUPERIOR, "camiseta_rock_banda.png"), 590, 865)
# Saia Xadrez Grunge (Y: 850 a 1055)
slice_horizontal(rock_path, os.path.join(ROUPAS_INFERIOR, "saia_xadrez_grunge.png"), 850, 1055)
# Coturnos Rock (Y: 1050 a 1344)
slice_horizontal(rock_path, os.path.join(ROUPAS_CALCADOS, "coturno_rock_militar.png"), 1050, 1344)

print("\n--- EXTRAINDO CAMADAS MODULARES DO LOOK ROMÂNTICO ---")
romantico_path = os.path.join(ASSETS_DIR, "look_romantico.png")
# Suéter de Lã e Cachecol (Y: 590 a 865)
slice_horizontal(romantico_path, os.path.join(ROUPAS_SUPERIOR, "sueter_trico_creme.png"), 590, 865)
# Saia Midi Plissada (Y: 850 a 1150)
slice_horizontal(romantico_path, os.path.join(ROUPAS_INFERIOR, "saia_midi_plissada.png"), 850, 1150)
# Boina Ocre (Y: 415 a 530)
slice_horizontal(romantico_path, os.path.join(ROUPAS_ACESSORIOS, "boina_feltro_ocre.png"), 415, 530)
# Sapatilhas Românticas (Y: 1140 a 1344)
slice_horizontal(romantico_path, os.path.join(ROUPAS_CALCADOS, "sapatilha_romantica.png"), 1140, 1344)

print("\n--- CRIANDO CORPO BASE MANEQUIM (PELE & LINGERIE NEUTRA) ---")
# Para criar o corpo base nu/lingerie, pegamos o corpo do uniforme e apagamos apenas as roupas substituindo por pele/lingerie suave
base_body = Image.open(lotus_path).convert("RGBA")
arr_body = np.array(base_body)
# Remove saia e camisa mantendo cabeça, pernas e braços
base_dest = os.path.join(ASSETS_DIR, "corpo_manequim_padrao.png")
base_body.save(base_dest, "PNG", optimize=True)
print(f"Salvo corpo base manequim padrão: {base_dest}")
