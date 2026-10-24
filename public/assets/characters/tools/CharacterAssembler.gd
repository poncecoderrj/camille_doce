extends Node2D
class_name CharacterAssembler

## Montador de personagem 2D por camadas para Godot 4.
## Cada textura deve ter o mesmo canvas e estar alinhada ao personagem-mestre.

@export var canvas_size := Vector2i(1536, 2304)
@export var asset_root := "res://characters/male_base/"

var layer_nodes: Dictionary = {}

const Z_BODY := 0
const Z_HAIR_BACK := 10
const Z_EYE_WHITE := 30
const Z_IRIS := 40
const Z_PUPIL := 50
const Z_BROW := 60
const Z_MOUTH := 70
const Z_HAIR_FRONT := 80
const Z_CLOTHES := 90
const Z_ACCESSORIES := 100

func _ready() -> void:
    build_character({
        "hair": "01",
        "expression": "neutral",
        "hair_color": Color("#B7BBC4"),
        "iris_color": Color("#79B9E8")
    })

func clear_character() -> void:
    for node in layer_nodes.values():
        if is_instance_valid(node):
            node.queue_free()
    layer_nodes.clear()

func add_layer(key: String, relative_path: String, z: int, tint := Color.WHITE) -> Sprite2D:
    var texture := load(asset_root + relative_path) as Texture2D
    if texture == null:
        push_warning("Asset ausente: " + asset_root + relative_path)
        return null

    var sprite := Sprite2D.new()
    sprite.name = key
    sprite.texture = texture
    sprite.centered = false
    sprite.position = Vector2.ZERO
    sprite.z_index = z
    sprite.modulate = tint
    add_child(sprite)
    layer_nodes[key] = sprite
    return sprite

func build_character(options: Dictionary) -> void:
    clear_character()

    var hair_id: String = str(options.get("hair", "01"))
    var expression: String = str(options.get("expression", "neutral"))
    var hair_color: Color = options.get("hair_color", Color.WHITE)
    var iris_color: Color = options.get("iris_color", Color.WHITE)

    # Corpo/pele
    add_layer("body", "body.png", Z_BODY)

    # Cabelo traseiro deve ficar atrás do rosto.
    add_layer("hair_back", "hair_back/hair_%s.png" % hair_id, Z_HAIR_BACK, hair_color)

    # Componentes dos olhos: branco, íris, pupila/brilho.
    add_layer("eye_white", "eyes_white/%s.png" % expression, Z_EYE_WHITE)
    add_layer("iris", "eyes_iris/%s.png" % expression, Z_IRIS, iris_color)
    add_layer("pupil", "eyes_pupil/%s.png" % expression, Z_PUPIL)
    add_layer("eyebrow", "eyebrows/%s.png" % expression, Z_BROW)
    add_layer("mouth", "mouths/%s.png" % expression, Z_MOUTH)

    # A franja deve ficar acima das sobrancelhas e parcialmente sobre os olhos.
    add_layer("hair_front", "hair_front/hair_%s.png" % hair_id, Z_HAIR_FRONT, hair_color)

func set_expression(expression: String) -> void:
    _replace_layer("eye_white", "eyes_white/%s.png" % expression, Z_EYE_WHITE)
    _replace_layer("iris", "eyes_iris/%s.png" % expression, Z_IRIS, layer_nodes["iris"].modulate)
    _replace_layer("pupil", "eyes_pupil/%s.png" % expression, Z_PUPIL)
    _replace_layer("eyebrow", "eyebrows/%s.png" % expression, Z_BROW)
    _replace_layer("mouth", "mouths/%s.png" % expression, Z_MOUTH)

func set_hair(hair_id: String) -> void:
    var current_color := Color.WHITE
    if layer_nodes.has("hair_front"):
        current_color = layer_nodes["hair_front"].modulate
    _replace_layer("hair_back", "hair_back/hair_%s.png" % hair_id, Z_HAIR_BACK, current_color)
    _replace_layer("hair_front", "hair_front/hair_%s.png" % hair_id, Z_HAIR_FRONT, current_color)

func set_hair_color(color: Color) -> void:
    if layer_nodes.has("hair_back"):
        layer_nodes["hair_back"].modulate = color
    if layer_nodes.has("hair_front"):
        layer_nodes["hair_front"].modulate = color

func set_iris_color(color: Color) -> void:
    if layer_nodes.has("iris"):
        layer_nodes["iris"].modulate = color

func _replace_layer(key: String, relative_path: String, z: int, tint := Color.WHITE) -> void:
    if layer_nodes.has(key) and is_instance_valid(layer_nodes[key]):
        layer_nodes[key].queue_free()
        layer_nodes.erase(key)
    add_layer(key, relative_path, z, tint)
