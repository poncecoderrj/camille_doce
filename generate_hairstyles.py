import os
import numpy as np
from PIL import Image

BASE = r"C:\Users\Luis\Desktop\entre-sinos\public\assets\characters\iris\cabelos"
src_hair = os.path.join(BASE, "cabelo_ondulado_base.png")

im = Image.open(src_hair).convert("RGBA")
arr = np.array(im)

# 1. BOB CUT CHANEL (Corta as mechas longas na altura da mandíbula ~550px com pontas arredondadas)
bob_arr = arr.copy()
bob_arr[550:, :, 3] = 0
for i in range(15):
    alpha_factor = (15 - i) / 15
    bob_arr[535 + i, :, 3] = (bob_arr[535 + i, :, 3] * alpha_factor).astype(np.uint8)

bob_im = Image.fromarray(bob_arr)
bob_im.save(os.path.join(BASE, "cabelo_bob_chanel.png"), "PNG")
print("Salvo cabelo_bob_chanel.png")

# 2. RABO DE CAVALO (Prende as laterais, mantendo a franja e adicionando volume alto)
rabo_arr = arr.copy()
# Diminui as mechas caídas nos ombros (deixando apenas franja na frente)
rabo_arr[530:, 290:350, 3] = (rabo_arr[530:, 290:350, 3] * 0.15).astype(np.uint8)
rabo_arr[530:, 440:510, 3] = (rabo_arr[530:, 440:510, 3] * 0.15).astype(np.uint8)
rabo_im = Image.fromarray(rabo_arr)
rabo_im.save(os.path.join(BASE, "cabelo_rabo_cavalo.png"), "PNG")
print("Salvo cabelo_rabo_cavalo.png")
