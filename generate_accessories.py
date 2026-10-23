import os
from PIL import Image, ImageDraw

dest = r"C:\Users\Luis\Desktop\entre-sinos\public\assets\characters\iris\roupas\acessorios\oculos_redondos_dourados.png"
canvas = Image.new("RGBA", (768, 1344), (0, 0, 0, 0))
draw = ImageDraw.Draw(canvas)

# Coordenadas anatômicas dos olhos da Íris
left_eye = (372, 508)
right_eye = (436, 508)
radius = 24

# Lentes com reflexo suave
draw.ellipse([left_eye[0] - radius, left_eye[1] - radius, left_eye[0] + radius, left_eye[1] + radius], 
             outline="#d4af37", fill=(255, 255, 255, 35), width=3)
draw.ellipse([right_eye[0] - radius, right_eye[1] - radius, right_eye[0] + radius, right_eye[1] + radius], 
             outline="#d4af37", fill=(255, 255, 255, 35), width=3)

# Ponte do nariz dourada
draw.arc([left_eye[0] + radius - 4, left_eye[1] - 8, right_eye[0] - radius + 4, left_eye[1] + 8], 
         start=190, end=350, fill="#f59e0b", width=3)

# Hastes laterais
draw.line([left_eye[0] - radius, left_eye[1] - 4, left_eye[0] - radius - 20, left_eye[1] - 14], fill="#d4af37", width=3)
draw.line([right_eye[0] + radius, right_eye[1] - 4, right_eye[0] + radius + 20, right_eye[1] - 14], fill="#d4af37", width=3)

# Brilho de reflexo na lente esquerda e direita
draw.arc([left_eye[0] - 14, left_eye[1] - 16, left_eye[0] + 6, left_eye[1] + 4], start=210, end=270, fill=(255, 255, 255, 180), width=2)
draw.arc([right_eye[0] - 14, right_eye[1] - 16, right_eye[0] + 6, right_eye[1] + 4], start=210, end=270, fill=(255, 255, 255, 180), width=2)

canvas.save(dest, "PNG", optimize=True)
print(f"Gerado óculos redondos dourados: {dest} (bbox: {canvas.getbbox()})")
