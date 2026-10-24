#!/usr/bin/env python3
"""Compositor simples de personagens 2D por camadas.

Uso:
  python character_composer.py --manifest character_manifest.json --output preview.png

Cada arquivo de camada deve ter o mesmo canvas definido no manifesto.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from PIL import Image, ImageColor, ImageEnhance


def rgba_color(value: str) -> tuple[int, int, int, int]:
    rgb = ImageColor.getrgb(value)
    return (*rgb, 255)


def tint_preserve_luminance(image: Image.Image, color: str, strength: float = 1.0) -> Image.Image:
    """Tonaliza pixels mantendo a luminosidade e o alpha original."""
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A")
    gray = rgba.convert("RGB").convert("L")
    gray = ImageEnhance.Contrast(gray).enhance(1.08)
    target = Image.new("RGB", rgba.size, ImageColor.getrgb(color))
    # Multiplica a cor-alvo pela luminosidade normalizada.
    lum = gray.point(lambda p: int(p * strength))
    result = Image.new("RGB", rgba.size, (0, 0, 0))
    result = Image.composite(target, result, lum)
    return Image.merge("RGBA", (*result.split(), alpha))


def load_manifest(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def open_layer(path: Path, canvas: tuple[int, int]) -> Image.Image:
    image = Image.open(path).convert("RGBA")
    if image.size != canvas:
        raise ValueError(f"Camada {path} mede {image.size}, esperado {canvas}")
    return image


def compose(manifest_path: Path, output_path: Path, hair_color: str | None, iris_color: str | None) -> None:
    manifest = load_manifest(manifest_path)
    root = manifest_path.parent
    width = int(manifest["canvas"]["width"])
    height = int(manifest["canvas"]["height"])
    canvas = (width, height)
    layers = manifest["layers"]

    ordered = sorted(layers, key=lambda item: int(item.get("z", 0)))
    result = Image.new("RGBA", canvas, (0, 0, 0, 0))

    for item in ordered:
        path = root / item["file"]
        layer = open_layer(path, canvas)
        role = item.get("role", "")
        if hair_color and role in {"hair_back", "hair_front", "hair"}:
            layer = tint_preserve_luminance(layer, hair_color)
        elif iris_color and role in {"iris", "eye_iris"}:
            layer = tint_preserve_luminance(layer, iris_color)
        result = Image.alpha_composite(result, layer)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    result.save(output_path)
    print(f"Arquivo criado: {output_path}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--hair-color", default=None, help="Ex.: #7A3F25")
    parser.add_argument("--iris-color", default=None, help="Ex.: #3EA8FF")
    args = parser.parse_args()
    compose(args.manifest, args.output, args.hair_color, args.iris_color)


if __name__ == "__main__":
    main()
